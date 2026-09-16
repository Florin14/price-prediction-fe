import { createTheme, Theme } from "@mui/material/styles";

const fluid = (fsMin: number, fsMax: number, vwMin: number = 460, vwMax: number = 2120): string => {
    const x = (1 / (vwMax - vwMin)) * (fsMax - fsMin);
    const formula = `${fsMin - vwMin * x}px + ${x * 100}vw`;
    return `max(${fsMin}px, min(calc(${formula}), ${fsMax}px))`;
};

declare module "@mui/material/styles" {
    interface TypeText {
        hint?: string;
    }
}

const sharedComponents = (mode: "light" | "dark") => ({
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                transition: "background-color 0.3s ease, color 0.3s ease",
            },
        },
    },
    MuiFormControlLabel: {
        styleOverrides: {
            root: { marginLeft: 0, marginRight: 0, "& .MuiFormControlLabel-label": { fontSize: "13px", fontFamily: "Inter", fontWeight: 500 } },
        },
    },
    MuiInputLabel: {
        styleOverrides: { root: { fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: "13px", lineHeight: "16px" } },
    },
    MuiOutlinedInput: {
        defaultProps: { notched: false as const },
        styleOverrides: {
            root: {
                borderRadius: 10,
                background: mode === "dark" ? "rgba(255,255,255,0.04)" : "#fff",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: mode === "dark" ? "rgba(255,255,255,0.12)" : "#E2E8F0",
                    transition: "border-color 0.2s ease",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: mode === "dark" ? "rgba(255,255,255,0.25)" : "#94A3B8",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 2,
                },
                "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#EF4444",
                },
            },
            input: {
                padding: "0 14px",
                height: 48,
                fontSize: 14,
                fontFamily: '"Inter", sans-serif',
                "&::placeholder": {
                    color: mode === "dark" ? "rgba(255,255,255,0.35)" : "#94A3B8",
                    opacity: 1,
                },
            },
        },
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                borderRadius: 12,
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                border: mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid #F1F5F9",
            },
        },
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                fontSize: 14,
                fontFamily: '"Inter", sans-serif',
                borderRadius: 8,
                margin: "2px 6px",
                padding: "10px 12px",
                transition: "background-color 0.15s ease",
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: "none" as const,
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                padding: "10px 20px",
                letterSpacing: "0.01em",
                transition: "all 0.2s ease",
                "&:hover": {
                    transform: "translateY(-1px)",
                },
                "&:active": {
                    transform: "translateY(0)",
                },
            },
            containedPrimary: {
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                "&:hover": {
                    boxShadow: "0 4px 16px rgba(59, 130, 246, 0.4)",
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                backgroundImage: "none",
            },
        },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: 500,
                fontSize: "12px",
            },
        },
    },
});

export const lightTheme: Theme = createTheme({
    palette: {
        mode: "light",
        background: { default: "#F8FAFC", paper: "#FFFFFF" },
        primary: { main: "#3B82F6", dark: "#2563EB", light: "#60A5FA" },
        secondary: { main: "#8B5CF6", light: "#A78BFA", dark: "#7C3AED" },
        error: { main: "#EF4444", light: "#FCA5A5", dark: "#DC2626" },
        warning: { main: "#F59E0B", light: "#FCD34D", dark: "#D97706" },
        success: { main: "#10B981", light: "#6EE7B7", dark: "#059669" },
        info: { main: "#06B6D4", light: "#67E8F9", dark: "#0891B2" },
        text: { primary: "#0F172A", secondary: "#64748B", disabled: "#94A3B8", hint: "#94A3B8" },
        grey: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
        },
        divider: "#E2E8F0",
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: { fontSize: fluid(20, 32), lineHeight: 1.3, fontWeight: 800, letterSpacing: "-0.02em" },
        h2: { fontSize: fluid(18, 26), lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.01em" },
        h3: { fontSize: fluid(16, 22), lineHeight: 1.4, fontWeight: 600 },
        body1: { fontSize: fluid(13, 15), lineHeight: 1.6, fontWeight: 400 },
        body2: { fontSize: fluid(12, 14), lineHeight: 1.5, fontWeight: 400 },
        subtitle1: { fontSize: fluid(14, 16), lineHeight: 1.5, fontWeight: 500 },
        subtitle2: { fontSize: fluid(12, 14), lineHeight: 1.4, fontWeight: 500 },
    },
    breakpoints: {
        values: { xs: 0, sm: 640, md: 960, lg: 1280, xl: 1536 },
    },
    components: sharedComponents("light") as any,
});

export const darkTheme: Theme = createTheme({
    palette: {
        mode: "dark",
        background: { default: "#0B1120", paper: "#151D2E" },
        primary: { main: "#60A5FA", dark: "#3B82F6", light: "#93C5FD" },
        secondary: { main: "#A78BFA", light: "#C4B5FD", dark: "#8B5CF6" },
        error: { main: "#F87171", light: "#FCA5A5", dark: "#EF4444" },
        warning: { main: "#FBBF24", light: "#FDE68A", dark: "#F59E0B" },
        success: { main: "#34D399", light: "#6EE7B7", dark: "#10B981" },
        info: { main: "#22D3EE", light: "#67E8F9", dark: "#06B6D4" },
        text: { primary: "#F1F5F9", secondary: "#94A3B8", disabled: "#475569", hint: "#475569" },
        grey: {
            50: "#0B1120",
            100: "#151D2E",
            200: "#1E293B",
            300: "#334155",
            400: "#475569",
            500: "#64748B",
            600: "#94A3B8",
            700: "#CBD5E1",
            800: "#E2E8F0",
            900: "#F1F5F9",
        },
        divider: "rgba(255,255,255,0.08)",
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: { fontSize: fluid(20, 32), lineHeight: 1.3, fontWeight: 800, letterSpacing: "-0.02em" },
        h2: { fontSize: fluid(18, 26), lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.01em" },
        h3: { fontSize: fluid(16, 22), lineHeight: 1.4, fontWeight: 600 },
        body1: { fontSize: fluid(13, 15), lineHeight: 1.6, fontWeight: 400 },
        body2: { fontSize: fluid(12, 14), lineHeight: 1.5, fontWeight: 400 },
        subtitle1: { fontSize: fluid(14, 16), lineHeight: 1.5, fontWeight: 500 },
        subtitle2: { fontSize: fluid(12, 14), lineHeight: 1.4, fontWeight: 500 },
    },
    breakpoints: {
        values: { xs: 0, sm: 640, md: 960, lg: 1280, xl: 1536 },
    },
    components: sharedComponents("dark") as any,
});
