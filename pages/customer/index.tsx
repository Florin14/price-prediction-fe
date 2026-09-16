import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { BarChart3, History, TrendingUp, ArrowRight } from "lucide-react";

import { websiteActions } from "@/store/slices/website/website-slice";
import { RootState } from "@/store";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CustomerHome: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const dispatch = useDispatch();
    const [cookies] = useCookies(["name"]);

    useEffect(() => {
        dispatch(websiteActions.setGoBack({ goBack: null }));
        dispatch(websiteActions.setTitle({ title: "ControlPanel" }));
    }, [dispatch]);

    const firstName = (cookies.name || "").split(" ")[0];

    const actions = [
        {
            href: "/customer/prediction",
            icon: BarChart3,
            title: languageData?.MakePrediction || "Make a prediction",
            description: languageData?.DashboardPredictionHint || "Estimate a property price in under a minute.",
            cta: languageData?.Start || "Start",
        },
        {
            href: "/customer/history",
            icon: History,
            title: languageData?.PredictionHistory?.title || "Your history",
            description: languageData?.DashboardHistoryHint || "Review your saved estimates over time.",
            cta: languageData?.View || "View",
        },
        {
            href: "/customer/analytics",
            icon: TrendingUp,
            title: languageData?.Analytics || "Analytics",
            description: languageData?.DashboardAnalyticsHint || "Explore market trends and city-level insights.",
            cta: languageData?.Explore || "Explore",
        },
    ];

    return (
        <Container size="xl" className="py-10 md:py-14">
            <div className="mb-10 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                    {languageData?.DashboardKicker || "Your dashboard"}
                </span>
                <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                    {firstName
                        ? `${languageData?.WelcomeTitle || "Welcome"}, ${firstName}`
                        : languageData?.WelcomeTitle || "Welcome"}
                </h1>
                <p className="max-w-xl text-muted-foreground">
                    {languageData?.DashboardSubtitle ||
                        "Pick a path below — or run a new estimate right away."}
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {actions.map((a) => {
                    const Icon = a.icon;
                    return (
                        <Card
                            key={a.href}
                            className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                        >
                            <CardContent className="flex h-full flex-col gap-4 p-7">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-xl font-medium tracking-tight">{a.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {a.description}
                                    </p>
                                </div>
                                <Button asChild variant="ghost" className="self-start">
                                    <Link href={a.href}>
                                        {a.cta}
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Container>
    );
};

export default CustomerHome;
