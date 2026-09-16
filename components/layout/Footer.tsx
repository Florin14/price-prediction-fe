import * as React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Container } from "@/components/ui/container";
import { Brand } from "@/components/layout/Brand";
import { cn } from "@/lib/utils";

interface FooterProps {
    className?: string;
}

export default function Footer({ className }: FooterProps) {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const year = new Date().getFullYear();

    const productLinks = [
        { label: languageData?.Prediction || "Prediction", href: "/guest/prediction" },
        { label: languageData?.Analytics || "Analytics", href: "/guest/analytics" },
        { label: languageData?.HowItWorks || "How it works", href: "/guest/how-it-works" },
        { label: languageData?.History || "History", href: "/guest/history" },
    ];

    const companyLinks = [
        { label: languageData?.About || "About", href: "#" },
        { label: languageData?.Contact || "Contact", href: "#" },
        { label: languageData?.Terms || "Terms", href: "#" },
        { label: languageData?.Privacy || "Privacy", href: "#" },
    ];

    return (
        <footer className={cn("border-t border-border bg-background", className)}>
            <Container size="2xl" className="py-12">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Brand size="md" />
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                            {languageData?.FooterTagline ||
                                "AI-powered real estate price estimates across Romania. Built from 117K+ real listings."}
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {languageData?.Product || "Product"}
                        </h4>
                        <ul className="space-y-2">
                            {productLinks.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="text-sm text-foreground/80 transition-colors hover:text-primary"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {languageData?.Company || "Company"}
                        </h4>
                        <ul className="space-y-2">
                            {companyLinks.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="text-sm text-foreground/80 transition-colors hover:text-primary"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {languageData?.Contact || "Contact"}
                        </h4>
                        <a
                            href="mailto:contact@cicadatech.eu"
                            className="text-sm text-foreground/80 transition-colors hover:text-primary"
                        >
                            contact@cicadatech.eu
                        </a>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-start gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>© {year} Domus. {languageData?.AllRightsReserved || "All rights reserved."}</p>
                    <p>
                        {languageData?.MadeIn || "Made in Romania"} · {languageData?.DataPoints || "117,000+ data points"}
                    </p>
                </div>
            </Container>
        </footer>
    );
}
