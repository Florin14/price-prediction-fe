import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Moon, Sun, Languages, LogOut, User, Lock, ChevronDown, ArrowLeft } from "lucide-react";

import { RootState } from "@/store";
import ro from "@/assets/language/ro";
import en from "@/assets/language/en";
import { websiteActions } from "@/store/slices/website/website-slice";
import { loadingActions } from "@/store/slices/loading/loading-slice";

import { RouteModel } from "@/models/generic/routes";
import { LanguageDataTypes } from "@/assets/language/ro";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Brand } from "@/components/layout/Brand";
import { cn } from "@/lib/utils";

interface NavbarProps {
    routes: RouteModel[];
    onToggleTheme: () => void;
    isDarkMode: boolean;
}

function getInitials(name?: string) {
    if (!name) return "U";
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase() || "")
        .join("");
}

/* ============================================================
   Scroll awareness — adds soft shadow when page is scrolled
   ============================================================ */
function useScrolled(threshold = 4) {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);
    return scrolled;
}

/* ============================================================
   Desktop nav link — pill hover + underline accent on active
   ============================================================ */
function NavLink({ route, isMobile, onNavigate }: { route: RouteModel; isMobile?: boolean; onNavigate?: () => void }) {
    const router = useRouter();
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const active = router.pathname.startsWith(route.path);
    const label =
        (languageData && (languageData[route.name as keyof LanguageDataTypes] as string)) || route.name;
    const IconComp = typeof route.icon === "string" ? null : (route.icon as React.ComponentType<any>);

    if (isMobile) {
        return (
            <Link
                href={route.path}
                onClick={onNavigate}
                className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
            >
                {IconComp && (
                    <IconComp
                        className={cn(
                            "h-4 w-4 transition-colors",
                            active ? "text-primary" : "text-muted-foreground"
                        )}
                    />
                )}
                <span>{label}</span>
            </Link>
        );
    }

    return (
        <Link
            href={route.path}
            className={cn(
                "group relative inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-colors",
                active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            )}
        >
            {IconComp && (
                <IconComp
                    className={cn(
                        "h-3.5 w-3.5 transition-colors",
                        active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                />
            )}
            <span>{label}</span>
            {active && (
                <span
                    aria-hidden
                    className="absolute -bottom-[13px] left-3 right-3 h-[2px] rounded-full bg-primary"
                />
            )}
        </Link>
    );
}

/* ============================================================
   User menu / auth CTAs
   ============================================================ */
function UserMenu() {
    const [cookies, setCookie] = useCookies(["name", "role", "id", "language"]);
    const router = useRouter();
    const languageData = useSelector((s: RootState) => s.website.languageData);

    const isAuthenticated = Boolean(cookies.name);

    const handleLogout = async () => {
        try {
            await Axios({ url: "/auth/logout", method: "POST" });
        } catch (_) {
            /* ignore */
        }
        setCookie("name", "", { path: "/" });
        setCookie("role", "", { path: "/" });
        setCookie("id", "", { path: "/" });
        router.push("/login");
    };

    if (!isAuthenticated) {
        const isGuestArea =
            router.pathname.includes("guest") || router.pathname.includes("home") || router.pathname === "/";
        if (!isGuestArea) return null;
        return (
            <div className="hidden items-center gap-2 sm:flex">
                <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                    {languageData?.SignIn || "Sign in"}
                </Button>
                <Button size="sm" onClick={() => router.push("/register")}>
                    {languageData?.CreateAccount || "Create account"}
                </Button>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent">
                    <Avatar className="h-7 w-7 ring-2 ring-background">
                        <AvatarFallback className="bg-primary/12 text-[11px] font-semibold text-primary">
                            {getInitials(cookies.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-[140px] truncate md:inline">{cookies.name}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel className="flex flex-col gap-0.5 py-2.5">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {languageData?.AccountKicker || "Account"}
                    </span>
                    <span className="text-sm font-semibold normal-case tracking-normal text-foreground">
                        {cookies.name}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/customer/profile")}>
                    <User className="h-4 w-4" />
                    {languageData?.Profile || "Profile"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/customer/change-password")}>
                    <Lock className="h-4 w-4" />
                    {languageData?.ChangePassword || "Change password"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    {languageData?.Logout || "Logout"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/* ============================================================
   Theme + Language — grouped into a segmented cluster
   ============================================================ */
function ActionCluster({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) {
    const [cookies, setCookie] = useCookies(["language"]);
    const dispatch = useDispatch();
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const current = cookies.language === "ro" ? "RO" : "EN";

    const toggleLang = () => {
        dispatch(loadingActions.setLoading({ loading: true }));
        setTimeout(() => {
            const next = cookies.language === "ro" ? "en" : "ro";
            setCookie("language", next, { path: "/" });
            dispatch(websiteActions.setLanguageData({ languageData: next === "ro" ? ro : en }));
            dispatch(loadingActions.setLoading({ loading: false }));
        }, 200);
    };

    return (
        <TooltipProvider delayDuration={200}>
            <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card/70 p-0.5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={onToggleTheme}
                            aria-label="Toggle theme"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isDarkMode ? languageData?.LightMode || "Light mode" : languageData?.DarkMode || "Dark mode"}
                    </TooltipContent>
                </Tooltip>
                <span className="h-4 w-px bg-border" aria-hidden="true" />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={toggleLang}
                            aria-label="Toggle language"
                            className="inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <Languages className="h-3.5 w-3.5" />
                            <span>{current}</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {cookies.language === "ro"
                            ? languageData?.TranslateInEnglish || "Switch to English"
                            : languageData?.TranslateInRomanian || "Switch to Romanian"}
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}

/* ============================================================
   Navbar
   ============================================================ */
const Navbar: React.FC<NavbarProps> = ({ routes, onToggleTheme, isDarkMode }) => {
    const router = useRouter();
    const menuItems = routes.filter((r) => r.isOnMenu);
    const goBack = useSelector((s: any) => s.website.goBack);
    const languageData = useSelector((s: RootState) => s.website.languageData);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const scrolled = useScrolled();

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b transition-all duration-200",
                scrolled
                    ? "border-border bg-background/90 shadow-[0_1px_0_0_rgb(20_17_14_/_0.02),0_6px_20px_-12px_rgb(20_17_14_/_0.12)] backdrop-blur-md"
                    : "border-transparent bg-background/60 backdrop-blur-sm"
            )}
        >
            <Container size="2xl" className="flex h-[68px] items-center gap-4">
                {/* Mobile menu trigger */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <div className="flex h-[68px] items-center border-b border-border px-6">
                            <Brand size="md" />
                        </div>
                        <nav className="flex flex-col gap-1 p-3">
                            {menuItems.map((r) => (
                                <NavLink key={r.path} route={r} isMobile onNavigate={() => setMobileOpen(false)} />
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Brand + optional back button */}
                <div className="flex items-center gap-2">
                    <Brand size="md" />
                    {goBack && (
                        <button
                            onClick={() => router.push(goBack)}
                            aria-label="Go back"
                            className="ml-2 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground md:inline-flex"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Desktop nav — absolutely centered visually via ml-auto/mr-auto pair */}
                <nav className="mx-auto hidden items-center gap-0.5 lg:flex">
                    {menuItems.map((r) => (
                        <NavLink key={r.path} route={r} />
                    ))}
                </nav>

                {/* Right actions */}
                <div className="ml-auto flex items-center gap-3 lg:ml-0">
                    <ActionCluster onToggleTheme={onToggleTheme} isDarkMode={isDarkMode} />
                    <UserMenu />
                </div>
            </Container>
        </header>
    );
};

export default Navbar;
