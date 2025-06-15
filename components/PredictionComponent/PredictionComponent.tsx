import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { resetProperty, updateProperty, type Property } from "../../store/slices/property/property-slice";
import { predictPropertyPrice } from "../../store/slices/prediction/thunks";

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

interface PredictionResponse {
    predicted_price: number;
    location_raw: string;
    accuracy_pct: number | null;
    similar_listings: SimilarListing[];
}
import {
    PredictionContainer,
    PredictionForm,
    FormSection,
    FormRow,
    PredictionResults,
    ResultCard,
    PriceRange,
    SimilarProperties,
    PropertyCard,
    StepIndicator,
} from "./PredictionPage.styles";
import { FiHome, FiMapPin, FiDollarSign, FiArrowRight, FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import StyledInput from "../../components/generic-components/StyledInput";
import StyledButton from "../../components/generic-components/StyledButton";
import StyledDropdown from "../../components/generic-components/StyledDropdown";
import PredictionLoadingOverlay from "../../components/generic-components/PredictionLoadingOverlay";
import { MapLibre } from "../../components/generic-components/LibreMap";
import { clearCurrentPrediction } from "../../store/slices/prediction/prediction-slice";
import { useCookies } from "react-cookie";

const PredictionComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty } = useSelector((state: RootState) => state.property);
    const { currentPrediction, loading, error } = useSelector((state: RootState) => state.prediction) as {
        currentPrediction: PredictionResponse | null;
        loading: boolean;
        error: string | null;
    };
    const [cookies, setCookie] = useCookies(["id"]);

    const languageData = useSelector((state: RootState) => state.website.languageData);
    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [step1Attempted, setStep1Attempted] = useState(false);
    const [step2Attempted, setStep2Attempted] = useState(false);

    const propertyTypes = [
        { id: 1, name: languageData?.PropertyTypes?.Apartment || "Bloc" },
        { id: 2, name: languageData?.PropertyTypes?.House || "Casa/Vila" },
    ];

    const validateStep1 = (property: Property): boolean => {
        const errors: string[] = [];
        if (!property.address?.trim()) errors.push("Street address is required");
        if (!property.city?.trim()) errors.push("City is required");
        if (!property.classification) errors.push("Property type is required");
        if (!property.comfort) errors.push("Comfort level is required");

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const validateStep2 = (property: Property): boolean => {
        const errors: string[] = [];
        if (!property.useful_area_total) errors.push("Total usable area is required");
        if (!property.num_rooms) errors.push("Number of rooms is required");
        setValidationErrors(errors);
        return errors.length === 0;
    };
    const handleNextStep = () => {
        setStep1Attempted(true);
        if (validateStep1(currentProperty)) {
            setStep(2);
            setValidationErrors([]);
            setStep1Attempted(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep2Attempted(true);
        if (validateStep2(currentProperty)) {
            setShowLoadingOverlay(true);

            // Adding a minimum loading time of 3 seconds for better UX
            await Promise.all([
                dispatch(predictPropertyPrice({ ...currentProperty, classification: currentProperty?.classification?.name, user_id: cookies["id"] })),
                new Promise((resolve) => setTimeout(resolve, 3000)),
            ]);

            setShowLoadingOverlay(false);
            setValidationErrors([]);
            setStep2Attempted(false);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };
    const handleReset = () => {
        dispatch(clearCurrentPrediction());
        dispatch(resetProperty());
        setStep(1);
        setStep1Attempted(false);
        setStep2Attempted(false);
        setValidationErrors([]);
    };

    // Handler for step 1 input changes
    const handleStep1InputChange = (type: string, value: any) => {
        dispatch(updateProperty({ type, value }));
        if (step1Attempted) {
            validateStep1({ ...currentProperty, [type]: value });
        }
    };

    // Handler for step 2 input changes
    const handleStep2InputChange = (type: string, value: any) => {
        dispatch(updateProperty({ type, value }));
        if (step2Attempted) {
            validateStep2({ ...currentProperty, [type]: value });
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const renderStepIndicator = () => (
        <StepIndicator>
            <div
                className={`step ${step >= 1 || currentPrediction ? "active" : ""}`}
                onClick={() => {
                    if (step === 2 && validateStep1(currentProperty)) {
                        setStep(1);
                        setValidationErrors([]);
                    } else if (currentPrediction) {
                        setStep(1);
                        dispatch(clearCurrentPrediction());
                    }
                }}
            >
                <div className="step-icon">
                    <FiMapPin />
                </div>
                <div className="step-label">{languageData?.Steps?.Location}</div>
            </div>
            <div className="connector"></div>
            <div
                className={`step ${step >= 2 || currentPrediction ? "active" : ""}`}
                onClick={() => {
                    if (currentPrediction) {
                        setStep(2);
                        dispatch(clearCurrentPrediction());
                    } else if (step === 1 && validateStep1(currentProperty)) {
                        setStep(2);
                        setValidationErrors([]);
                    }
                }}
            >
                <div className="step-icon">
                    <FiHome />
                </div>
                <div className="step-label">{languageData?.Steps?.Property}</div>
            </div>
            <div className="connector"></div>
            <div
                className={`step ${currentPrediction ? "active" : ""}`}
                onClick={() => {
                    if (!currentPrediction && step === 2 && validateStep2(currentProperty)) {
                        handleSubmit(new Event("click") as unknown as React.FormEvent);
                    }
                }}
            >
                <div className="step-icon">
                    <FiDollarSign />
                </div>
                <div className="step-label">{languageData?.Steps?.Result}</div>
            </div>
        </StepIndicator>
    );

    const renderStep1 = () => (
        <FormSection>
            <h3>{languageData?.StepGuide?.Location.title}</h3>
            <div
                style={{
                    background: "#fffdf0",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    color: "#20B2AA",
                    marginBottom: "20px",
                    border: "1px solid #d1d5db",
                    fontSize: "13px",
                    boxShadow: "0 1px 3px rgba(110, 110, 110, 0.05)",
                }}
            >
                {languageData?.StepGuide?.Location.hint}
            </div>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.StreetAddress}
                    inputName="address"
                    value={currentProperty.address || ""}
                    onChange={(value) => handleStep1InputChange("address", value)}
                    placeholder="Street address..."
                    width="100%"
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.City}
                    inputName="city"
                    value={currentProperty.city || ""}
                    onChange={(value) => handleStep1InputChange("city", value)}
                    placeholder="City name..."
                />
                <StyledInput
                    label={languageData?.PropertyFields?.StreetFrontage}
                    inputName="streetFrontage"
                    type="number"
                    value={currentProperty.street_frontage?.toString() || ""}
                    onChange={(value) => handleStep1InputChange("streetFrontage", Number(value))}
                    placeholder="Street frontage..."
                />
            </FormRow>
            <FormRow>
                <StyledDropdown
                    label={languageData?.PropertyFields?.PropertyType}
                    required
                    activeLabel
                    value={currentProperty.classification || null}
                    onChange={(_, value) => handleStep1InputChange("classification", value || null)}
                    placeholder="Selecteaza tipul proprietatii..."
                    options={propertyTypes}
                />
                <StyledInput
                    label={languageData?.PropertyFields?.LandClassification}
                    inputName="landClassification"
                    value={currentProperty.landClassification || ""}
                    onChange={(value) => handleStep1InputChange("landClassification", value)}
                    placeholder="Land classification..."
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label="Floor Number"
                    inputName="floor"
                    type="number"
                    value={currentProperty.floor?.toString() || ""}
                    onChange={(value) => handleStep1InputChange("floor", Number(value))}
                    placeholder="Floor number..."
                />
                <StyledInput
                    label="Comfort Level"
                    inputName="comfort"
                    value={currentProperty.comfort || ""}
                    onChange={(value) => handleStep1InputChange("comfort", value)}
                    placeholder="Comfort level..."
                    type="number"
                />
            </FormRow>
            <div className="validation-errors">
                {validationErrors.map((error, index) => (
                    <div key={index} className="error-message">
                        {error}
                    </div>
                ))}
            </div>
            <div className="form-actions">
                <StyledButton onClick={handleNextStep} endIcon={<FiArrowRight />} variant="contained" color="primary" disabled={validationErrors.length > 0}>
                    {languageData?.NextPropertyDetails}
                </StyledButton>
            </div>
        </FormSection>
    );

    const renderStep2 = () => (
        <FormSection>
            <h3>{languageData?.StepGuide?.PropertyDetails.title}</h3>
            <div
                style={{
                    background: "linear-gradient(to right, #fffdf0, #ffffff)",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    color: "#20B2AA",
                    marginBottom: "20px",
                    fontSize: "13px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
            >
                {languageData?.StepGuide?.PropertyDetails.hint}
            </div>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.TotalUsableArea}
                    inputName="useful_area_total"
                    type="number"
                    value={currentProperty.useful_area_total?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("useful_area_total", Number(value))}
                    placeholder="Total usable area..."
                />
                <StyledInput
                    label={languageData?.PropertyFields?.MainLivingArea}
                    inputName="useful_area"
                    type="number"
                    value={currentProperty?.useful_area?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("useful_area", Number(value))}
                    placeholder="Main living area..."
                />

                <StyledInput
                    label={languageData?.PropertyFields?.NumberOfRooms}
                    inputName="num_rooms"
                    type="number"
                    value={currentProperty.num_rooms?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("num_rooms", Number(value))}
                    placeholder="Number of rooms..."
                />
            </FormRow>
            <FormRow>
                <StyledInput
                    label={languageData?.PropertyFields?.BuiltArea}
                    inputName="builtArea"
                    type="number"
                    value={currentProperty.builtArea?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("builtArea", Number(value))}
                    placeholder="Built area..."
                />
                <StyledInput
                    label={languageData?.PropertyFields?.LandArea}
                    inputName="landArea"
                    type="number"
                    value={currentProperty.landArea?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("landArea", Number(value))}
                    placeholder="Land area..."
                />
                <StyledInput
                    label={languageData?.PropertyFields?.NumberOfGarages}
                    inputName="num_garages"
                    type="number"
                    value={currentProperty.num_garages?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("num_garages", Number(value))}
                    placeholder="Number of garages..."
                />
                <StyledInput
                    label="Street Frontage (m)"
                    inputName="street_frontage"
                    type="number"
                    value={currentProperty.street_frontage?.toString() || ""}
                    onChange={(value) => handleStep2InputChange("street_frontage", Number(value))}
                    placeholder="Street Frontage..."
                />
            </FormRow>
            <div className="validation-errors">
                {validationErrors.map((error, index) => (
                    <div key={index} className="error-message">
                        {error}
                    </div>
                ))}
            </div>
            <div className="form-actions">
                <StyledButton variant="outlined" onClick={handlePrevStep} startIcon={<FiArrowLeft />}>
                    {languageData?.Back}
                </StyledButton>
                <StyledButton variant="contained" onClick={handleSubmit} endIcon={<FiDollarSign />} disabled={validationErrors.length > 0}>
                    {languageData?.GetPricePrediction}
                </StyledButton>
            </div>
        </FormSection>
    ); // Removed dummy listings as we'll use real data from the API

    const renderResults = () => {
        if (!currentPrediction) return null;

        return (
            <PredictionResults>
                <h2>{languageData?.PredictionResults?.title}</h2>

                <ResultCard>
                    <div className="prediction-header">
                        <h3>{languageData?.PredictionResults?.estimatedValue}</h3>
                        {/* <div className="confidence">Confidence: {(currentPrediction.confidence * 100).toFixed(0)}%</div> */}
                    </div>

                    <div className="predicted-price">{currentPrediction?.predicted_price ? formatCurrency(currentPrediction?.predicted_price) : 0}</div>

                    {/* <PriceRange>
                        <div className="range-label">Price Range:</div>
                        <div className="range-bar">
                            <div className="range-min">{currentPrediction?.priceRange?.min ? formatCurrency(currentPrediction?.priceRange?.min) : ""}</div>
                            <div className="range-max">{currentPrediction?.priceRange?.max ? formatCurrency(currentPrediction?.priceRange?.max) : ""}</div>
                        </div>
                    </PriceRange> */}

                    <SimilarProperties>
                        <h4>{languageData?.PredictionResults?.similarProperties}</h4>
                        <div className="similar-properties-grid">
                            {currentPrediction.similar_listings?.map((property) => (
                                <PropertyCard key={property?.external_id}>
                                    <div className="property-image">
                                        <img
                                            src="/images/property_placeholder.png"
                                            alt={property?.location_raw}
                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="property-details">
                                        <div className="property-address">{property?.location_raw}</div>
                                        <div className="property-specs">
                                            <span>
                                                {property?.num_rooms} {languageData?.PredictionResults?.propertySpecs.rooms}
                                            </span>
                                            •
                                            <span>
                                                {property?.useful_area} {languageData?.PredictionResults?.propertySpecs.area}
                                            </span>
                                        </div>
                                        <div className="property-price">{formatCurrency(property.total_price)}</div>
                                        <div className="property-features">
                                            <span>Price/m²: {property.price_per_sqm.toFixed(2)} €</span>
                                        </div>
                                    </div>
                                </PropertyCard>
                            ))}
                        </div>
                    </SimilarProperties>
                    {currentPrediction?.similar_listings && (
                        <MapLibre
                            listings={currentPrediction.similar_listings.map((listing) => ({
                                id: parseInt(listing.external_id.replace("P", ""), 10),
                                address: listing.location_raw,
                                price: listing.total_price,
                                lat: listing.latitude,
                                lng: listing.longitude,
                                distance: 0,
                                // Required by Property type
                                classification: "apartment",
                                useful_area_total: listing.useful_area,
                                num_rooms: listing.num_rooms,
                                comfort: "standard",
                            }))}
                        />
                    )}
                    <div className="result-actions">
                        <StyledButton variant="outlined" onClick={handleSubmit} startIcon={<FiRefreshCw />}>
                            {languageData?.TryAgain}
                        </StyledButton>
                        <StyledButton variant="outlined" onClick={handleReset} startIcon={<FiRefreshCw />}>
                            {languageData?.NewPrediction}
                        </StyledButton>
                    </div>
                </ResultCard>
            </PredictionResults>
        );
    };

    return (
        <PredictionContainer>
            <PredictionLoadingOverlay active={showLoadingOverlay} />
            <h1>{languageData?.RealEstatePricePrediction}</h1> {renderStepIndicator()}
            {error && <div className="error-message">Error: {error}</div>}
            {!currentPrediction ? (
                <PredictionForm>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                </PredictionForm>
            ) : (
                renderResults()
            )}
        </PredictionContainer>
    );
};

export default PredictionComponent;
