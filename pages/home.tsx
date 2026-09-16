import type React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
    BarChart3,
    Zap,
    Smartphone,
    Search,
    ArrowRight,
    MapPin,
    Database,
    Brain,
    Quote,
} from "lucide-react";

import type { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { HeroIllustration } from "@/components/layout/HeroIllustration";
import { cn } from "@/lib/utils";

const FEATURE_ICONS = [BarChart3, Zap, Smartphone, Search];

const HomePage: React.FC = () => {
    const router = useRouter();
    const languageData = useSelector((s: RootState) => s.website.languageData);

    const featureList = [
        { key: "AccuratePredictions", data: languageData?.Features?.AccuratePredictions },
        { key: "RealTimeAnalysis", data: languageData?.Features?.RealTimeAnalysis },
        { key: "UserFriendly", data: languageData?.Features?.UserFriendly },
        { key: "DetailedInsights", data: languageData?.Features?.DetailedInsights },
    ];

    const steps = [
        languageData?.HowItWorksSteps?.Step1,
        languageData?.HowItWorksSteps?.Step2,
        languageData?.HowItWorksSteps?.Step3,
    ];

    const testimonials = [
        languageData?.Testimonials?.Testimonial1,
        languageData?.Testimonials?.Testimonial2,
        languageData?.Testimonials?.Testimonial3,
    ];

    return (
        <div className="flex flex-col">
            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden border-b border-border bg-background">
                <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
                    style={{
                        background:
                            "radial-gradient(1200px 600px at 20% -10%, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(900px 500px at 110% 30%, hsl(var(--terracotta) / 0.12), transparent 60%)",
                    }}
                />
                <Container size="2xl" className="grid gap-12 py-16 md:grid-cols-12 md:py-24 lg:py-28">
                    <div className="flex flex-col justify-center gap-6 md:col-span-6">
                        <Badge variant="outline" className="w-fit gap-2 border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                            {languageData?.HeroKicker || "Real estate intelligence — Romania"}
                        </Badge>

                        <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[64px]">
                            {languageData?.HomePageTitle}
                        </h1>

                        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                            {languageData?.HomePageDescription}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                            <Button size="xl" onClick={() => router.push("/guest/prediction")}>
                                {languageData?.TryItNow}
                                <ArrowRight />
                            </Button>
                            <Button size="xl" variant="outline" onClick={() => router.push("/guest/how-it-works")}>
                                {languageData?.LearnMore}
                            </Button>
                        </div>

                        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
                            <Stat display label={languageData?.StatListings || "Listings"} value="117K+" hint={languageData?.StatListingsHint || "Real sale & rent data"} />
                            <Stat display label={languageData?.StatCities || "Cities"} value="414" hint={languageData?.StatCitiesHint || "Across Romania"} />
                            <Stat display label={languageData?.StatModels || "Models"} value="3" hint={languageData?.StatModelsHint || "Stacking ensemble"} />
                        </dl>
                    </div>

                    <div className="relative md:col-span-6">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lift md:aspect-[3/4]">
                            {/*
                                Stylized SVG illustration (no asset). To swap to a real photo:
                                  <img alt="…" src="/images/your-hero.jpg" className="h-full w-full object-cover" />
                            */}
                            <HeroIllustration />
                            <div
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(180deg, transparent 55%, hsl(var(--card) / 0.35) 100%)",
                                }}
                            />
                        </div>

                        {/* Floating estimate card */}
                        <Card className="absolute -bottom-6 left-4 w-64 shadow-lift backdrop-blur md:-left-6 md:bottom-10">
                            <CardContent className="flex flex-col gap-2 p-5">
                                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                    {languageData?.HeroCardLocation || "Cluj-Napoca · Gheorgheni"}
                                </div>
                                <div className="font-display text-3xl font-medium tabular-nums tracking-tight">
                                    142,500 €
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>65 m² · 2 {languageData?.HeroCardRooms || "rooms"}</span>
                                    <span className="text-[hsl(var(--success))]">± 4.8%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* ===================== TRUST STRIP ===================== */}
            <section className="border-b border-border bg-card/40">
                <Container size="2xl" className="flex flex-col items-center justify-between gap-6 py-6 text-sm text-muted-foreground md:flex-row">
                    <p className="text-xs uppercase tracking-[0.18em]">
                        {languageData?.TrustedSources || "Built on public data from across Romania"}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-[0.14em]">
                        <span>imobiliare.ro</span>
                        <span>storia.ro</span>
                        <span>olx.ro</span>
                        <span>OpenStreetMap</span>
                        <span>INS</span>
                    </div>
                </Container>
            </section>

            {/* ===================== FEATURES ===================== */}
            <section className="border-b border-border">
                <Container size="2xl" className="py-20 md:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                            {languageData?.FeaturesKicker || "Why it works"}
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            {languageData?.WhyChooseTitle}
                        </h2>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {featureList.map((f, i) => {
                            const Icon = FEATURE_ICONS[i];
                            return (
                                <Card
                                    key={f.key}
                                    className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                                >
                                    <CardContent className="flex flex-col gap-4 p-6">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-base font-semibold">{f.data?.title}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {f.data?.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* ===================== HOW IT WORKS ===================== */}
            <section className="border-b border-border bg-card/40">
                <Container size="2xl" className="py-20 md:py-24">
                    <div className="grid gap-10 md:grid-cols-12 md:items-end">
                        <div className="md:col-span-5">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                                {languageData?.HowItWorksKicker || "Process"}
                            </span>
                            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
                                {languageData?.HowItWorksTitle}
                            </h2>
                            <p className="mt-4 max-w-md text-muted-foreground">
                                {languageData?.HowItWorksSubtitle ||
                                    "Three steps from address to a transparent, data-backed estimate."}
                            </p>
                        </div>
                        <div className="md:col-span-7">
                            <ol className="relative space-y-8">
                                {steps.map((s, i) => (
                                    <li key={i} className="relative flex gap-5">
                                        <div className="flex flex-col items-center">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card font-display text-base font-medium text-primary tabular-nums">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            {i < steps.length - 1 && (
                                                <span className="mt-2 h-full w-px bg-border" aria-hidden="true" />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-2">
                                            <h3 className="text-base font-semibold">{s?.title}</h3>
                                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                                {s?.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===================== METHOD / DATA ===================== */}
            <section className="border-b border-border">
                <Container size="2xl" className="py-20 md:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                            {languageData?.MethodKicker || "Methodology"}
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            {languageData?.MethodTitle || "Grounded in data, not guesswork"}
                        </h2>
                    </div>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardContent className="flex flex-col gap-3 p-7">
                                <Database className="h-5 w-5 text-primary" />
                                <h3 className="font-display text-xl">{languageData?.MethodData || "117K+ real listings"}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {languageData?.MethodDataText ||
                                        "Ingested from 10+ trusted sources, deduplicated and validated. Refreshed continuously."}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col gap-3 p-7">
                                <Brain className="h-5 w-5 text-primary" />
                                <h3 className="font-display text-xl">{languageData?.MethodModels || "Stacking ensemble"}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {languageData?.MethodModelsText ||
                                        "XGBoost, LightGBM and RandomForest combined in a meta-model, tracked with MAE, RMSE and R²."}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col gap-3 p-7">
                                <MapPin className="h-5 w-5 text-primary" />
                                <h3 className="font-display text-xl">{languageData?.MethodGeo || "Geospatial features"}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {languageData?.MethodGeoText ||
                                        "Distance to POIs via OSMnx, neighbourhood comparables, and land classification."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* ===================== TESTIMONIALS ===================== */}
            <section className="border-b border-border bg-card/40">
                <Container size="2xl" className="py-20 md:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                            {languageData?.TestimonialsKicker || "Voices"}
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            {languageData?.TestimonialsTitle}
                        </h2>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <Card key={i} className="relative overflow-hidden">
                                <CardContent className="flex flex-col gap-6 p-7">
                                    <Quote className="h-6 w-6 text-terracotta/70" />
                                    <p className="font-display text-lg leading-snug text-foreground">
                                        {t?.quote}
                                    </p>
                                    <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
                                        <span className="text-sm font-semibold">{t?.author}</span>
                                        <span className="text-xs text-muted-foreground">{t?.role}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ===================== FINAL CTA ===================== */}
            <section className="relative overflow-hidden border-b border-border">
                <div
                    className="absolute inset-0 -z-10 opacity-70"
                    style={{
                        background:
                            "radial-gradient(800px 400px at 50% 120%, hsl(var(--terracotta) / 0.18), transparent 60%), radial-gradient(600px 400px at 80% -20%, hsl(var(--primary) / 0.12), transparent 60%)",
                    }}
                />
                <Container size="md" className="py-24 text-center md:py-28">
                    <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                        {languageData?.ReadyToStart}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                        {languageData?.TryTodayMessage}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button size="xl" onClick={() => router.push("/guest/prediction")}>
                            {languageData?.MakePrediction}
                            <ArrowRight />
                        </Button>
                        <Button size="xl" variant="ghost" onClick={() => router.push("/register")}>
                            {languageData?.CreateAccount || "Create account"}
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default HomePage;
