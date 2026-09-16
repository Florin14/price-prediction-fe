import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
    MapPin,
    Home as HomeIcon,
    Wallet,
    ArrowRight,
    ArrowLeft,
    RefreshCw,
    Check,
    Info,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    X,
} from "lucide-react";

import type { RootState, AppDispatch } from "@/store";
import { resetProperty, updateProperty, type Property } from "@/store/slices/property/property-slice";
import { predictPropertyPrice } from "@/store/slices/prediction/thunks";
import { clearCurrentPrediction } from "@/store/slices/prediction/prediction-slice";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PredictionLoadingOverlay from "@/components/layout/PredictionLoadingOverlay";
import { MapLibre } from "@/components/generic-components/LibreMap";
import { cn, formatPrice } from "@/lib/utils";

interface SimilarListing {
    external_id: string;
    price_per_sqm: number;
    num_rooms: number;
    city: string;
    score: number;
    location_raw: string;
    useful_area: number;
    total_price: number;
    latitude: number;
    longitude: number;
}

interface ValuationIndex {
    score: number;
    label: string;
    market_avg_price_per_sqm: number | null;
    predicted_price_per_sqm: number | null;
}

interface PredictionResponse {
    predicted_price: number;
    predicted_price_per_sqm?: number;
    confidence_min?: number;
    confidence_max?: number;
    location_raw: string;
    accuracy_pct: number | null;
    similar_listings: SimilarListing[];
    valuation_index?: ValuationIndex;
    warnings?: string[];
}

const STEPS = [
    { key: "location", icon: MapPin },
    { key: "property", icon: HomeIcon },
    { key: "result", icon: Wallet },
] as const;

function StepNav({
    step,
    currentPrediction,
    onStepClick,
}: {
    step: number;
    currentPrediction: PredictionResponse | null;
    onStepClick: (n: number) => void;
}) {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const stepLabels: Record<(typeof STEPS)[number]["key"], string> = {
        location: languageData?.Steps?.Location || "Location",
        property: languageData?.Steps?.Property || "Details",
        result: languageData?.Steps?.Result || "Result",
    };
    const activeIndex = currentPrediction ? 2 : step - 1;

    return (
        <ol className="mb-10 flex items-center gap-0">
            {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isDone = i < activeIndex;
                const isActive = i === activeIndex;
                const canClick = i <= activeIndex;

                return (
                    <React.Fragment key={s.key}>
                        <li className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                disabled={!canClick}
                                onClick={() => canClick && onStepClick(i + 1)}
                                className={cn(
                                    "group flex items-center gap-3 rounded-md transition-colors",
                                    canClick ? "cursor-pointer" : "cursor-default"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                                        isActive && "border-primary bg-primary text-primary-foreground",
                                        isDone && "border-primary/40 bg-primary/10 text-primary",
                                        !isActive && !isDone && "border-border bg-card text-muted-foreground"
                                    )}
                                >
                                    {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                                </span>
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                        {languageData?.StepLabel || "Step"} {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-sm font-semibold transition-colors",
                                            (isActive || isDone) ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {stepLabels[s.key]}
                                    </span>
                                </div>
                            </button>
                        </li>
                        {i < STEPS.length - 1 && (
                            <span
                                aria-hidden
                                className={cn(
                                    "mx-4 hidden h-px flex-1 transition-colors md:block",
                                    i < activeIndex ? "bg-primary/50" : "bg-border"
                                )}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </ol>
    );
}

const PredictionComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty } = useSelector((s: RootState) => s.property);
    const { currentPrediction, error } = useSelector((s: RootState) => s.prediction) as {
        currentPrediction: PredictionResponse | null;
        loading: boolean;
        error: string | null;
    };
    const [cookies] = useCookies(["id"]);
    const languageData = useSelector((s: RootState) => s.website.languageData);

    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [step1Attempted, setStep1Attempted] = useState(false);
    const [step2Attempted, setStep2Attempted] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
            const t = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(t);
        }
        setShowError(false);
    }, [error]);

    const propertyTypes = useMemo(
        () => [
            { id: 1, name: languageData?.PropertyTypes?.Apartment || "Bloc" },
            { id: 2, name: languageData?.PropertyTypes?.House || "Casa/Vila" },
        ],
        [languageData]
    );

    const validateStep1 = (p: Property): boolean => {
        const errs: string[] = [];
        if (!p.address?.trim()) errs.push(languageData?.ValidationErrors?.StreetAddressRequired || "Street address is required");
        if (!p.city?.trim()) errs.push(languageData?.ValidationErrors?.CityRequired || "City is required");
        if (!p.classification) errs.push(languageData?.ValidationErrors?.PropertyTypeRequired || "Property type is required");
        setValidationErrors(errs);
        return errs.length === 0;
    };

    const validateStep2 = (p: Property): boolean => {
        const errs: string[] = [];
        if (!p.useful_area_total) errs.push(languageData?.ValidationErrors?.TotalUsableAreaRequired || "Total usable area is required");
        if (!p.num_rooms) errs.push(languageData?.ValidationErrors?.NumberOfRoomsRequired || "Number of rooms is required");
        setValidationErrors(errs);
        return errs.length === 0;
    };

    const setField = (type: string, value: any, step: 1 | 2) => {
        dispatch(updateProperty({ type, value }));
        if (step === 1 && step1Attempted) validateStep1({ ...currentProperty, [type]: value });
        if (step === 2 && step2Attempted) validateStep2({ ...currentProperty, [type]: value });
    };

    const handleNextStep = () => {
        setStep1Attempted(true);
        if (validateStep1(currentProperty)) {
            setStep(2);
            setValidationErrors([]);
            setStep1Attempted(false);
        }
    };

    const handlePrevStep = () => setStep((s) => Math.max(1, s - 1));

    const handleSubmit = async () => {
        setStep2Attempted(true);
        if (!validateStep2(currentProperty)) return;
        setShowLoadingOverlay(true);
        await Promise.all([
            dispatch(
                predictPropertyPrice({
                    ...currentProperty,
                    classification: currentProperty?.classification?.name,
                    user_id: cookies["id"] ? parseInt(cookies["id"], 10) || undefined : undefined,
                }) as any
            ),
            new Promise((resolve) => setTimeout(resolve, 2500)),
        ]);
        setShowLoadingOverlay(false);
        setValidationErrors([]);
        setStep2Attempted(false);
    };

    const handleReset = () => {
        dispatch(clearCurrentPrediction());
        dispatch(resetProperty());
        setStep(1);
        setStep1Attempted(false);
        setStep2Attempted(false);
        setValidationErrors([]);
    };

    const handleStepClick = (n: number) => {
        if (currentPrediction) {
            setStep(n);
            dispatch(clearCurrentPrediction());
        } else if (n < step) {
            setStep(n);
            setValidationErrors([]);
        } else if (n === 2 && step === 1 && validateStep1(currentProperty)) {
            setStep(2);
            setValidationErrors([]);
        }
    };

    return (
        <Container size="xl" className="py-10 md:py-14">
            <PredictionLoadingOverlay active={showLoadingOverlay} />

            <div className="mb-8 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {languageData?.PredictionKicker || "Valuation"}
                </span>
                <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                    {languageData?.RealEstatePricePrediction || "Real estate price prediction"}
                </h1>
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                    {languageData?.PredictionSubtitle ||
                        "Get an AI-powered estimate for any property in Romania."}
                </p>
            </div>

            <StepNav step={step} currentPrediction={currentPrediction} onStepClick={handleStepClick} />

            {showError && error && (
                <button
                    type="button"
                    onClick={() => setShowError(false)}
                    className="mb-6 flex w-full items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                    <span className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {error}
                    </span>
                    <X className="h-4 w-4 opacity-60" />
                </button>
            )}

            {!currentPrediction ? (
                step === 1 ? (
                    <Step1
                        property={currentProperty}
                        propertyTypes={propertyTypes}
                        onField={(t, v) => setField(t, v, 1)}
                        validationErrors={validationErrors}
                        onNext={handleNextStep}
                    />
                ) : (
                    <Step2
                        property={currentProperty}
                        onField={(t, v) => setField(t, v, 2)}
                        validationErrors={validationErrors}
                        onPrev={handlePrevStep}
                        onSubmit={handleSubmit}
                    />
                )
            ) : (
                <PredictionResultsView prediction={currentPrediction} onReset={handleReset} />
            )}
        </Container>
    );
};

/* ============================================================
   Step 1 — Location & classification
   ============================================================ */

function Step1({
    property,
    propertyTypes,
    onField,
    validationErrors,
    onNext,
}: {
    property: Property;
    propertyTypes: { id: number; name: string }[];
    onField: (type: string, value: any) => void;
    validationErrors: string[];
    onNext: () => void;
}) {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <Card>
            <CardHeader className="border-b border-border">
                <CardTitle className="font-display text-2xl font-medium">
                    {languageData?.StepGuide?.Location?.title || "Property Location"}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <Info className="h-3.5 w-3.5" />
                    {languageData?.StepGuide?.Location?.hint ||
                        "Enter the property location details. The more accurate the address, the better the prediction."}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid gap-8">
                    <Section
                        label={languageData?.AddressInfo || "Address information"}
                        hint={languageData?.AddressHint || "Used to anchor the prediction on actual street-level comparables."}
                    >
                        <div className="grid gap-5">
                            <Field
                                label={languageData?.PropertyFields?.StreetAddress || "Street address"}
                                required
                            >
                                <Input
                                    value={property.address || ""}
                                    onChange={(e) => onField("address", e.target.value)}
                                    placeholder="Str. Memorandumului 28"
                                />
                            </Field>
                            <div className="grid gap-5 md:grid-cols-2">
                                <Field label={languageData?.PropertyFields?.City || "City"} required>
                                    <Input
                                        value={property.city || ""}
                                        onChange={(e) => onField("city", e.target.value)}
                                        placeholder="Cluj-Napoca"
                                    />
                                </Field>
                                <Field
                                    label={languageData?.PropertyFields?.StreetFrontage || "Street frontage (m)"}
                                    hint={languageData?.OptionalField || "Optional"}
                                >
                                    <Input
                                        type="number"
                                        value={property.street_frontage || ""}
                                        onChange={(e) => onField("street_frontage", Number(e.target.value))}
                                        placeholder="12"
                                    />
                                </Field>
                            </div>
                        </div>
                    </Section>

                    <Separator />

                    <Section
                        label={languageData?.PropertyInfo || "Classification"}
                        hint={languageData?.ClassificationHint || "Type determines which comparables are considered."}
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label={languageData?.PropertyFields?.PropertyType || "Property type"} required>
                                <Select
                                    value={property.classification?.name || ""}
                                    onValueChange={(v) => {
                                        const opt = propertyTypes.find((p) => p.name === v) || null;
                                        onField("classification", opt);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={languageData?.SelectPropertyType || "Select property type..."}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {propertyTypes.map((p) => (
                                            <SelectItem key={p.id} value={p.name}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field
                                label={languageData?.PropertyFields?.LandClassification || "Land classification"}
                                hint={languageData?.OptionalField || "Optional"}
                            >
                                <Input
                                    value={property.landClassification || ""}
                                    onChange={(e) => onField("landClassification", e.target.value)}
                                    placeholder="Intravilan"
                                />
                            </Field>
                        </div>
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <Field label={languageData?.PropertyFields?.FloorNumber || "Floor"}>
                                <Input
                                    type="number"
                                    value={property.floor || ""}
                                    onChange={(e) => onField("floor", Number(e.target.value))}
                                    placeholder="3"
                                />
                            </Field>
                            <Field label={languageData?.PropertyFields?.ComfortLevel || "Comfort level"}>
                                <Input
                                    type="number"
                                    value={property.comfort || ""}
                                    onChange={(e) => onField("comfort", e.target.value)}
                                    placeholder="1, 2, 3"
                                />
                            </Field>
                        </div>
                    </Section>

                    {validationErrors.length > 0 && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                            <ul className="space-y-1 text-sm text-destructive">
                                {validationErrors.map((e, i) => (
                                    <li key={i}>• {e}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t border-border pt-5">
                        <span className="text-xs text-muted-foreground">
                            <span className="text-terracotta">*</span>{" "}
                            {languageData?.RequiredField || "indicates required field"}
                        </span>
                        <Button size="lg" onClick={onNext}>
                            {languageData?.NextPropertyDetails || "Continue to details"}
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

/* ============================================================
   Step 2 — Dimensions & details
   ============================================================ */

function Step2({
    property,
    onField,
    validationErrors,
    onPrev,
    onSubmit,
}: {
    property: Property;
    onField: (type: string, value: any) => void;
    validationErrors: string[];
    onPrev: () => void;
    onSubmit: () => void;
}) {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <Card>
            <CardHeader className="border-b border-border">
                <CardTitle className="font-display text-2xl font-medium">
                    {languageData?.StepGuide?.PropertyDetails?.title || "Property details"}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <Info className="h-3.5 w-3.5" />
                    {languageData?.StepGuide?.PropertyDetails?.hint ||
                        "Provide the property dimensions and features. More details lead to more accurate predictions."}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid gap-8">
                    <Section
                        label={languageData?.AreaDimensions || "Area & dimensions"}
                        hint={languageData?.AreaHint || "Most important factor for the price estimate."}
                    >
                        <div className="grid gap-5 md:grid-cols-3">
                            <Field
                                label={`${languageData?.PropertyFields?.TotalUsableArea || "Total usable area"} (m²)`}
                                required
                            >
                                <Input
                                    type="number"
                                    value={property.useful_area_total || ""}
                                    onChange={(e) => onField("useful_area_total", Number(e.target.value))}
                                    placeholder="65"
                                />
                            </Field>
                            <Field label={`${languageData?.PropertyFields?.MainLivingArea || "Main living area"} (m²)`}>
                                <Input
                                    type="number"
                                    value={property.useful_area || ""}
                                    onChange={(e) => onField("useful_area", Number(e.target.value))}
                                    placeholder="52"
                                />
                            </Field>
                            <Field label={languageData?.PropertyFields?.NumberOfRooms || "Rooms"} required>
                                <Input
                                    type="number"
                                    value={property.num_rooms || ""}
                                    onChange={(e) => onField("num_rooms", Number(e.target.value))}
                                    placeholder="2"
                                />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    <Section
                        label={languageData?.AdditionalDetails || "Additional details"}
                        hint={languageData?.AdditionalHint || "Optional — improves accuracy when available."}
                    >
                        <div className="grid gap-5 md:grid-cols-3">
                            <Field label={`${languageData?.PropertyFields?.BuiltArea || "Built area"} (m²)`}>
                                <Input
                                    type="number"
                                    value={property.builtArea || ""}
                                    onChange={(e) => onField("builtArea", Number(e.target.value))}
                                    placeholder="80"
                                />
                            </Field>
                            <Field label={`${languageData?.PropertyFields?.LandArea || "Land area"} (m²)`}>
                                <Input
                                    type="number"
                                    value={property.landArea || ""}
                                    onChange={(e) => onField("landArea", Number(e.target.value))}
                                    placeholder="300"
                                />
                            </Field>
                            <Field label={languageData?.PropertyFields?.NumberOfGarages || "Garages"}>
                                <Input
                                    type="number"
                                    value={property.num_garages || ""}
                                    onChange={(e) => onField("num_garages", Number(e.target.value))}
                                    placeholder="1"
                                />
                            </Field>
                        </div>
                    </Section>

                    {validationErrors.length > 0 && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                            <ul className="space-y-1 text-sm text-destructive">
                                {validationErrors.map((e, i) => (
                                    <li key={i}>• {e}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t border-border pt-5">
                        <Button variant="outline" size="lg" onClick={onPrev}>
                            <ArrowLeft />
                            {languageData?.Back || "Back"}
                        </Button>
                        <Button size="lg" onClick={onSubmit}>
                            {languageData?.GetPricePrediction || "Get price prediction"}
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

/* ============================================================
   Section component
   ============================================================ */

function Section({
    label,
    hint,
    children,
}: {
    label: React.ReactNode;
    hint?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section className="grid gap-5 md:grid-cols-[260px_1fr]">
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                </span>
                {hint && <span className="text-xs leading-relaxed text-muted-foreground/80">{hint}</span>}
            </div>
            <div>{children}</div>
        </section>
    );
}

/* ============================================================
   Results view — polished further in Faza 5
   ============================================================ */

function PredictionResultsView({
    prediction,
    onReset,
}: {
    prediction: PredictionResponse;
    onReset: () => void;
}) {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const valuation = prediction.valuation_index;

    const valuationBadge = (() => {
        if (!valuation) return null;
        const label = valuation.label;
        if (label === "undervalued")
            return (
                <Badge variant="success" className="gap-1.5">
                    <TrendingDown className="h-3.5 w-3.5" />
                    {languageData?.Undervalued || "Below market"}{" "}
                    {valuation.score !== undefined && (
                        <span className="tabular-nums">({valuation.score.toFixed(1)}%)</span>
                    )}
                </Badge>
            );
        if (label === "overvalued")
            return (
                <Badge variant="warning" className="gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {languageData?.Overvalued || "Above market"}{" "}
                    {valuation.score !== undefined && (
                        <span className="tabular-nums">(+{valuation.score.toFixed(1)}%)</span>
                    )}
                </Badge>
            );
        return (
            <Badge variant="muted" className="gap-1.5">
                <Check className="h-3.5 w-3.5" />
                {languageData?.Fair || "Fair market price"}
            </Badge>
        );
    })();

    const mapListings = (prediction.similar_listings || [])
        .filter((l) => l.latitude && l.longitude)
        .map((l) => ({
            id: parseInt(l.external_id.replace("P", ""), 10) || 0,
            address: l.location_raw,
            price: l.total_price,
            lat: l.latitude,
            lng: l.longitude,
            classification: "apartment",
            useful_area_total: l.useful_area,
            num_rooms: l.num_rooms,
            comfort: "standard",
        }));

    return (
        <div className="grid gap-6">
            {/* Hero price card */}
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid gap-10 p-8 md:grid-cols-[1.3fr_1fr]">
                        <div className="flex flex-col gap-4">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                                {languageData?.PredictionResults?.estimatedValue || "Estimated market value"}
                            </span>
                            <div className="flex flex-wrap items-baseline gap-3">
                                <span className="font-display text-6xl font-medium tabular-nums leading-[0.95] tracking-tight text-foreground md:text-7xl">
                                    {prediction.predicted_price ? formatPrice(prediction.predicted_price) : "—"}
                                </span>
                                {prediction.predicted_price_per_sqm && (
                                    <span className="text-sm text-muted-foreground tabular-nums">
                                        {formatPrice(prediction.predicted_price_per_sqm)} / m²
                                    </span>
                                )}
                            </div>
                            {valuationBadge && <div>{valuationBadge}</div>}
                            {prediction.location_raw && (
                                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {prediction.location_raw}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col justify-center gap-4 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                            {prediction.confidence_min && prediction.confidence_max && (
                                <div>
                                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                        {languageData?.ConfidenceRange || "Confidence range"}
                                    </span>
                                    <p className="mt-1 font-display text-2xl tabular-nums tracking-tight">
                                        {formatPrice(prediction.confidence_min)} — {formatPrice(prediction.confidence_max)}
                                    </p>
                                </div>
                            )}
                            {valuation?.market_avg_price_per_sqm && (
                                <div>
                                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                        {languageData?.MarketAverage || "Market average (€/m²)"}
                                    </span>
                                    <p className="mt-1 font-display text-2xl tabular-nums tracking-tight">
                                        {formatPrice(valuation.market_avg_price_per_sqm)}
                                    </p>
                                </div>
                            )}
                            {prediction.accuracy_pct !== null && prediction.accuracy_pct !== undefined && (
                                <div>
                                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                        {languageData?.ModelAccuracy || "Model accuracy"}
                                    </span>
                                    <p className="mt-1 font-display text-2xl tabular-nums tracking-tight">
                                        {prediction.accuracy_pct.toFixed(1)}%
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {prediction.warnings && prediction.warnings.length > 0 && (
                        <div className="border-t border-border bg-[hsl(var(--warning))]/8 px-8 py-4">
                            <ul className="flex flex-col gap-1.5 text-sm">
                                {prediction.warnings.map((w, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 text-[color:hsl(var(--warning))]"
                                    >
                                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                        <span>{w}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Map + Similar listings */}
            {prediction.similar_listings && prediction.similar_listings.length > 0 && (
                <div className="grid gap-6 lg:grid-cols-2">
                    {mapListings.length > 0 && (
                        <Card className="overflow-hidden">
                            <CardHeader className="border-b border-border">
                                <CardTitle className="font-display text-xl font-medium">
                                    {languageData?.MapView || "Where they are"}
                                </CardTitle>
                                <CardDescription>
                                    {languageData?.MapViewHint ||
                                        "Locations of the top matching comparables near the target property."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="h-[420px] w-full">
                                    <MapLibre listings={mapListings} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="overflow-hidden">
                        <CardHeader className="border-b border-border">
                            <CardTitle className="font-display text-xl font-medium">
                                {languageData?.PredictionResults?.similarProperties || "Similar properties"}
                            </CardTitle>
                            <CardDescription>
                                {languageData?.SimilarHint ||
                                    "Top 5 listings ranked by a multi-factor similarity score."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="max-h-[420px] overflow-y-auto p-0">
                            <ul className="divide-y divide-border">
                                {prediction.similar_listings.map((l) => (
                                    <li
                                        key={l.external_id}
                                        className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/40"
                                    >
                                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                                            <img
                                                src="/images/property_placeholder.png"
                                                alt={l.location_raw}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-medium">{l.location_raw}</div>
                                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <span>
                                                    {l.num_rooms}{" "}
                                                    {languageData?.PredictionResults?.propertySpecs?.rooms || "rooms"}
                                                </span>
                                                <span>·</span>
                                                <span className="tabular-nums">{l.useful_area} m²</span>
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <div className="font-display text-base tabular-nums">
                                                {formatPrice(l.total_price)}
                                            </div>
                                            <div className="text-[11px] tabular-nums text-muted-foreground">
                                                {formatPrice(l.price_per_sqm)} / m²
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                    {languageData?.ResultsFootnote ||
                        "Estimate based on a stacking ensemble of XGBoost, LightGBM and RandomForest."}
                </p>
                <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={onReset}>
                        <RefreshCw />
                        {languageData?.NewPrediction || "New prediction"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PredictionComponent;
