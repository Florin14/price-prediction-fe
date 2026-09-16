import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Home as HomeIcon, ArrowRight, ArrowLeft } from "lucide-react";

import DashboardLayout from "@/containers/DashboardLayout";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const Custom404: React.FC = () => {
    const languageData = useSelector((s: RootState) => s.website.languageData);

    return (
        <DashboardLayout>
            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        background:
                            "radial-gradient(800px 400px at 50% 0%, hsl(var(--primary) / 0.12), transparent 60%), radial-gradient(600px 400px at 50% 100%, hsl(var(--terracotta) / 0.12), transparent 60%)",
                    }}
                />
                <Container size="md" className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
                    <div className="font-display text-[140px] font-medium leading-none tracking-tight text-primary md:text-[200px]">
                        404
                    </div>
                    <h1 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        {languageData?.NotFoundTitle || "This page drifted off the map"}
                    </h1>
                    <p className="mt-3 max-w-md text-muted-foreground">
                        {languageData?.PageNotFound ||
                            "We couldn't find the page you were looking for. It may have moved, or the link was mistyped."}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button asChild size="lg" variant="outline">
                            <Link href="javascript:history.back()">
                                <ArrowLeft />
                                {languageData?.Back || "Back"}
                            </Link>
                        </Button>
                        <Button asChild size="lg">
                            <Link href="/home">
                                <HomeIcon />
                                {languageData?.GoHome || "Go home"}
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </DashboardLayout>
    );
};

export default Custom404;
