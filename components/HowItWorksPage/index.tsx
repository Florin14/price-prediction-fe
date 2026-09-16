import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MapPin, Home, Wallet, ArrowRight, Sparkles, Database, Brain } from "lucide-react";

import { RootState } from "@/store";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksPageComponent: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const router = useRouter();

    const steps = [
        {
            icon: MapPin,
            title: languageData?.HowItWorksSteps?.Step1?.title || "Location",
            description:
                languageData?.HowItWorksSteps?.Step1?.description ||
                "Enter the property's street address, city and classification. Precise location data lets the model pull the most relevant comparables from the area.",
        },
        {
            icon: Home,
            title: languageData?.HowItWorksSteps?.Step2?.title || "Property details",
            description:
                languageData?.HowItWorksSteps?.Step2?.description ||
                "Provide dimensions, room counts and optional features. The richer your inputs, the more accurate the estimated value.",
        },
        {
            icon: Wallet,
            title: languageData?.HowItWorksSteps?.Step3?.title || "Result",
            description:
                languageData?.HowItWorksSteps?.Step3?.description ||
                "Receive an estimated market value, confidence range, valuation index and a gallery of similar properties near you.",
        },
    ];

    const methodology = [
        {
            icon: Database,
            title: languageData?.MethodData || "117K+ real listings",
            text:
                languageData?.MethodDataText ||
                "Ingested from the largest Romanian real estate portals, deduplicated and validated.",
        },
        {
            icon: Brain,
            title: languageData?.MethodModels || "Stacking ensemble",
            text:
                languageData?.MethodModelsText ||
                "XGBoost, LightGBM and RandomForest combined in a meta-model with confidence intervals.",
        },
        {
            icon: Sparkles,
            title: languageData?.MethodGeo || "Geospatial features",
            text:
                languageData?.MethodGeoText ||
                "POI distances, neighbourhood comparables and land classification — all from open data.",
        },
    ];

    return (
        <div className="flex flex-col">
            <section className="border-b border-border">
                <Container size="xl" className="py-14 md:py-20">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                            {languageData?.HowItWorksKicker || "Process"}
                        </span>
                        <h1 className="font-display text-4xl font-medium tracking-tight md:text-6xl">
                            {languageData?.HowItWorksTitle || "How it works"}
                        </h1>
                        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                            {languageData?.HowItWorksSubtitle ||
                                "Three steps from address to a transparent, data-backed estimate."}
                        </p>
                    </div>
                </Container>
            </section>

            <section className="border-b border-border bg-card/40">
                <Container size="xl" className="py-14 md:py-20">
                    <ol className="grid gap-6 md:grid-cols-3">
                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <li key={i}>
                                    <Card className="h-full">
                                        <CardContent className="flex flex-col gap-5 p-7">
                                            <div className="flex items-center justify-between">
                                                <span className="font-display text-sm font-medium tabular-nums text-primary">
                                                    {String(i + 1).padStart(2, "0")} / 03
                                                </span>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-display text-2xl font-medium tracking-tight">
                                                    {s.title}
                                                </h3>
                                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                                    {s.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            );
                        })}
                    </ol>
                </Container>
            </section>

            <section className="border-b border-border">
                <Container size="xl" className="py-14 md:py-20">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                            {languageData?.MethodKicker || "Methodology"}
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            {languageData?.MethodTitle || "Grounded in data, not guesswork"}
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {methodology.map((m, i) => {
                            const Icon = m.icon;
                            return (
                                <Card key={i}>
                                    <CardContent className="flex flex-col gap-3 p-7">
                                        <Icon className="h-5 w-5 text-primary" />
                                        <h3 className="font-display text-xl">{m.title}</h3>
                                        <p className="text-sm text-muted-foreground">{m.text}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </Container>
            </section>

            <section>
                <Container size="md" className="py-16 text-center md:py-20">
                    <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                        {languageData?.ReadyToStart || "Ready to start?"}
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        {languageData?.TryTodayMessage ||
                            "Run your first prediction in under a minute. No account required."}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <Button size="xl" onClick={() => router.push("/guest/prediction")}>
                            {languageData?.MakePrediction || "Make a prediction"}
                            <ArrowRight />
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default HowItWorksPageComponent;
