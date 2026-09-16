import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Clock, MapPin, Home, Ruler, ArrowRight, LogIn, UserPlus } from "lucide-react";

import { getPriceHistories } from "@/store/slices/price-history/thunks";
import type { AppDispatch, RootState } from "@/store";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const HistoryComponent: React.FC = () => {
    const histories = useSelector((state: RootState) => state.priceHistory.histories);
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const [cookies] = useCookies(["id"]);
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const isAuthenticated = !!cookies.id;

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getPriceHistories({ id: cookies["id"] }) as any);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <Container size="md" className="py-16 md:py-24">
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-7 w-7" />
                    </div>
                    <h1 className="mt-6 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        {languageData?.PredictionHistory?.title || "Prediction history"}
                    </h1>
                    <p className="mt-3 max-w-md text-muted-foreground">
                        {languageData?.HistoryGuestHint ||
                            "Sign in to view your saved estimates, compare them over time and track market shifts."}
                    </p>
                    <div className="mt-8 flex gap-3">
                        <Button size="lg" onClick={() => router.push("/login")}>
                            <LogIn />
                            {languageData?.Login || "Sign in"}
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => router.push("/register")}>
                            <UserPlus />
                            {languageData?.CreateAccount || "Create account"}
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container size="xl" className="py-10 md:py-14">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                        {languageData?.HistoryKicker || "Your archive"}
                    </span>
                    <h1 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
                        {languageData?.PredictionHistory?.title || "Prediction history"}
                    </h1>
                    <p className="mt-2 max-w-xl text-muted-foreground">
                        {languageData?.PredictionHistory?.description ||
                            "Every estimate you've generated, preserved for comparison."}
                    </p>
                </div>
                <Button size="lg" onClick={() => router.push("/customer/prediction")}>
                    {languageData?.NewPrediction || "New prediction"}
                    <ArrowRight />
                </Button>
            </div>

            {!histories || histories.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center gap-4 py-20 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="font-display text-xl">
                            {languageData?.PredictionHistory?.emptyState?.title || "No predictions yet"}
                        </h3>
                        <p className="max-w-sm text-sm text-muted-foreground">
                            {languageData?.PredictionHistory?.emptyState?.message ||
                                "Run your first prediction to start building your archive of estimates."}
                        </p>
                        <Button className="mt-2" onClick={() => router.push("/customer/prediction")}>
                            {languageData?.MakePrediction || "Make a prediction"}
                            <ArrowRight />
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {histories.map((h: any, i: number) => (
                        <Card key={i} className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-card">
                            <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                                <img
                                    src="/images/property_placeholder.png"
                                    alt={h?.location_raw}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </div>
                            <CardContent className="flex flex-col gap-3 p-5">
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                    <span className="line-clamp-2">{h?.location_raw}</span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1">
                                        <Home className="h-3.5 w-3.5" />
                                        {h?.num_rooms}{" "}
                                        {languageData?.PredictionResults?.propertySpecs?.rooms || "rooms"}
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Ruler className="h-3.5 w-3.5" />
                                        <span className="tabular-nums">{h?.useful_area} m²</span>
                                    </span>
                                </div>

                                <div className="mt-1 border-t border-border pt-3">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                            {languageData?.TotalPrice || "Total price"}
                                        </span>
                                        <span className="font-display text-xl font-medium tabular-nums">
                                            {formatPrice(h.total_price)}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-baseline justify-between gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                            {languageData?.PricePerMeter || "€/m²"}
                                        </span>
                                        <Badge variant="muted" className="tabular-nums">
                                            {h.price_per_sqm.toFixed(0)} €
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default HistoryComponent;
