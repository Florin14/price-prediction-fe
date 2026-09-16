import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft, Languages, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { RootState } from "@/store";
import { websiteActions } from "@/store/slices/website/website-slice";
import { loadingActions } from "@/store/slices/loading/loading-slice";
import ro from "@/assets/language/ro";
import en from "@/assets/language/en";

import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/ui/container";
import { Stat } from "@/components/ui/stat";
import { cn } from "@/lib/utils";

interface AuthShellProps {
    title: string;
    subtitle?: React.ReactNode;
    kicker?: React.ReactNode;
    children: React.ReactNode;
    pageTitle?: string;
    backHref?: string;
    backLabel?: string;
    footnote?: React.ReactNode;
    aside?: React.ReactNode;
}

function TopBar() {
    const dispatch = useDispatch();
    const theme = useSelector((s: RootState) => s.website.theme);
    const [cookies, setCookie] = useCookies(["language"]);

    const toggleTheme = () => dispatch(websiteActions.changeTheme());
    const toggleLang = () => {
        dispatch(loadingActions.setLoading({ loading: true }));
        setTimeout(() => {
            const next = cookies.language === "ro" ? "en" : "ro";
            setCookie("language", next, { path: "/" });
            dispatch(websiteActions.setLanguageData({ languageData: next === "ro" ? ro : en }));
            dispatch(loadingActions.setLoading({ loading: false }));
        }, 150);
    };

    return (
        <div className="flex items-center justify-between">
            <Brand size="md" />
            <div className="flex items-center gap-1">
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                    onClick={toggleLang}
                    aria-label="Toggle language"
                    className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    <Languages className="h-4 w-4" />
                    <span>{cookies.language === "ro" ? "RO" : "EN"}</span>
                </button>
            </div>
        </div>
    );
}

function DefaultAside() {
    const languageData = useSelector((s: RootState) => s.website.languageData);
    return (
        <div className="flex h-full flex-col justify-between gap-10 p-8">
            <div className="space-y-2 text-primary-foreground/90">
                <span className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60">
                    {languageData?.HeroKicker || "Real estate intelligence"}
                </span>
            </div>

            <blockquote className="max-w-lg font-display text-2xl leading-snug text-primary-foreground md:text-3xl">
                {languageData?.AuthAsideQuote ||
                    "Clarity in pricing is the quiet advantage. Every estimate grounded in the data of a whole market."}
                <footer className="mt-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-primary-foreground/40" />
                    <span className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
                        {languageData?.AuthAsideAttrib || "The Domus Method"}
                    </span>
                </footer>
            </blockquote>

            <dl className="grid grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-6 text-primary-foreground">
                <Stat
                    display
                    label={<span className="text-primary-foreground/70">{languageData?.StatListings || "Listings"}</span>}
                    value={<span className="text-primary-foreground">117K+</span>}
                />
                <Stat
                    display
                    label={<span className="text-primary-foreground/70">{languageData?.StatCities || "Cities"}</span>}
                    value={<span className="text-primary-foreground">414</span>}
                />
                <Stat
                    display
                    label={<span className="text-primary-foreground/70">{languageData?.StatModels || "Models"}</span>}
                    value={<span className="text-primary-foreground">3</span>}
                />
            </dl>
        </div>
    );
}

export default function AuthShell({
    title,
    subtitle,
    kicker,
    children,
    pageTitle,
    backHref,
    backLabel,
    footnote,
    aside,
}: AuthShellProps) {
    return (
        <>
            {pageTitle && (
                <Head>
                    <title>{pageTitle}</title>
                </Head>
            )}
            <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-[1.1fr_1fr]">
                {/* Aside — hidden on small */}
                <aside
                    className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block"
                    style={{
                        backgroundImage:
                            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--forest)) 100%)",
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                        style={{
                            backgroundImage: "url(/images/background.png)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="relative z-10 h-full">{aside ?? <DefaultAside />}</div>
                </aside>

                {/* Form side */}
                <main className="flex min-h-screen flex-col">
                    <div className="px-6 pt-6 sm:px-10 sm:pt-8">
                        <Container size="md" className="px-0">
                            <TopBar />
                        </Container>
                    </div>

                    <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
                        <div className="w-full max-w-md">
                            {backHref && (
                                <Link
                                    href={backHref}
                                    className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    {backLabel || "Back"}
                                </Link>
                            )}

                            <div className="flex flex-col gap-2">
                                {kicker && (
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                                        {kicker}
                                    </span>
                                )}
                                <h1 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-[40px]">
                                    {title}
                                </h1>
                                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
                            </div>

                            <div className="mt-8">{children}</div>

                            {footnote && <div className="mt-8 text-xs text-muted-foreground">{footnote}</div>}
                        </div>
                    </div>

                    <div className="px-6 pb-6 text-center text-[11px] text-muted-foreground sm:px-10">
                        © {new Date().getFullYear()} Domus · Predict Real Estate Prices
                    </div>
                </main>
            </div>
        </>
    );
}

export function cn_AuthShell() {
    return cn;
}
