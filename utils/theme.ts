import { createTheme, Theme } from "@mui/material/styles";

// Fluid typography helper
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

export const lightTheme: Theme = createTheme({
    palette: {
        mode: "light",
        background: { default: "#FFFFFF", paper: "#F9FAFB" },
        primary: { main: "#1E88E5", dark: "#1565C0", light: "#42A5F5" },
        secondary: { main: "#00ACC1", light: "#26C6DA", dark: "#00838F" },
        error: { main: "#E53935", light: "#EF5350", dark: "#C62828" },
        warning: { main: "#D97706", light: "#F59E0B", dark: "#B45309" },
        success: { main: "#059669", light: "#10B981", dark: "#047857" },
        info: { main: "#3470C2", light: "#4BA1FF", dark: "#1096F7" },
        text: { primary: "#111827", secondary: "#4B5563", disabled: "#9CA3AF", hint: "#9CA3AF" },
        grey: { 100: "#F9FAFB", 200: "#ECECEC", 300: "#E5EAFF", 400: "#BEC2C7", 500: "#667085", 600: "#393939" },
    },
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: '"Inter", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        allVariants: { color: undefined /* palette text.primary set via theme */ },
        h1: { fontSize: fluid(16, 24), lineHeight: "24px", fontWeight: 600 },
        body1: { fontSize: fluid(12, 16), lineHeight: "16px", fontWeight: 400 },
        subtitle2: { fontSize: fluid(12, 14), lineHeight: "14px", fontWeight: 500 },
    },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 960, lg: 1366, xl: 1920 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {},
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: { marginLeft: 0, marginRight: 0, "& .MuiFormControlLabel-label": { fontSize: "12px", fontFamily: "Inter", fontWeight: 600 } },
            },
        },
        MuiInputLabel: {
            styleOverrides: { root: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: "12px", lineHeight: "14px", "&.Mui-disabled": {} } },
        },
        MuiOutlinedInput: {
            defaultProps: { notched: false },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {},
                    "&:hover .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-disabled": {},
                },
                input: { padding: "0 12px", height: 45, fontSize: 12, fontFamily: '"Inter", sans-serif', "&::placeholder": {} },
            },
        },
        MuiMenu: { styleOverrides: { paper: { borderRadius: 8, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" } } },
        MuiMenuItem: { styleOverrides: { root: { fontSize: 12, fontFamily: '"Inter", sans-serif', "&:hover": {}, "&.Mui-selected": {} } } },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16px",
                    padding: "6px 16px",
                    "&.Mui-disabled": {},
                },
                containedPrimary: {},
                outlinedPrimary: {},
                textPrimary: {},
                containedError: {},
                outlinedError: {},
                textError: {},
                containedSuccess: {},
                outlinedSuccess: {},
                textSuccess: {},
            },
        },
    },
});

export const darkTheme: Theme = createTheme({
    palette: {
        mode: "dark",
        background: { default: "#111827", paper: "#1F2937" },
        primary: { main: "#60A5FA", dark: "#3B82F6", light: "#93C5FD" },
        secondary: { main: "#818CF8", light: "#A5B4FC", dark: "#6366F1" },
        error: { main: "#F87171", light: "#FCA5A5", dark: "#EF4444" },
        warning: { main: "#FBBF24", light: "#FCD34D", dark: "#F59E0B" },
        success: { main: "#34D399", light: "#6EE7B7", dark: "#10B981" },
        info: { main: "#60A5FA", light: "#93C5FD", dark: "#3B82F6" },
        text: { primary: "#F3F4F6", secondary: "#D1D5DB", disabled: "#6B7280", hint: "#6B7280" },
        grey: {
            100: "#1F2937",
            200: "#374151",
            300: "#4B5563",
            400: "#6B7280",
            500: "#9CA3AF",
            600: "#D1D5DB",
            700: "#E5E7EB",
            800: "#F3F4F6",
            900: "#F9FAFB",
        },
    },
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: '"Inter", sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        allVariants: { color: undefined /* palette text.primary set via theme */ },
        h1: { fontSize: fluid(16, 24), lineHeight: "24px", fontWeight: 600 },
        body1: { fontSize: fluid(12, 16), lineHeight: "16px", fontWeight: 400 },
        subtitle2: { fontSize: fluid(12, 14), lineHeight: "14px", fontWeight: 500 },
    },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 960, lg: 1366, xl: 1920 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {},
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: { marginLeft: 0, marginRight: 0, "& .MuiFormControlLabel-label": { fontSize: "12px", fontFamily: "Inter", fontWeight: 600 } },
            },
        },
        MuiInputLabel: {
            styleOverrides: { root: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: "12px", lineHeight: "14px", "&.Mui-disabled": {} } },
        },
        MuiOutlinedInput: {
            defaultProps: { notched: false },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {},
                    "&:hover .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {},
                    "&.Mui-disabled": {},
                },
                input: { padding: "0 12px", height: 45, fontSize: 12, fontFamily: '"Inter", sans-serif', "&::placeholder": {} },
            },
        },
        MuiMenu: { styleOverrides: { paper: { borderRadius: 8, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" } } },
        MuiMenuItem: { styleOverrides: { root: { fontSize: 12, fontFamily: '"Inter", sans-serif', "&:hover": {}, "&.Mui-selected": {} } } },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 8,
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16px",
                    padding: "6px 16px",
                    "&.Mui-disabled": {},
                },
                containedPrimary: {},
                outlinedPrimary: {},
                textPrimary: {},
                containedError: {},
                outlinedError: {},
                textError: {},
                containedSuccess: {},
                outlinedSuccess: {},
                textSuccess: {},
            },
        },
    },
});
