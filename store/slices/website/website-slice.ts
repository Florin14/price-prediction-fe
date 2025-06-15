import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebsiteStore from "../../../models/generic/website";
import { LanguageDataTypes } from "../../../assets/language/ro";

type Theme = "light" | "dark";

// Get initial theme from localStorage or default to light
const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme") as Theme;
        return savedTheme === "dark" ? "dark" : "light";
    }
    return "light";
};

const initialState: WebsiteStore = {
    language: "",
    languageData: null,
    role: null,
    title: null,
    goBack: null,
    deviceType: null,
    theme: getInitialTheme(),
    isDarkMode: getInitialTheme() === "dark",
    currentLanguage: "en",
};

const websiteSlice = createSlice({
    name: "website",
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<{ language: string }>) {
            state.language = action.payload.language;
        },
        setLanguageData(state, action: PayloadAction<{ languageData: any }>) {
            state.languageData = action.payload.languageData;
        },
        setRole(state, action: PayloadAction<{ role: string | null }>) {
            state.role = action.payload.role;
        },
        setTitle(state, action: PayloadAction<{ title: string | null }>) {
            state.title = action.payload.title;
        },
        setGoBack(state, action: PayloadAction<{ goBack: string | null }>) {
            state.goBack = action.payload.goBack;
        },
        setDeviceType(state, action: PayloadAction<{ deviceType: string | null }>) {
            state.deviceType = action.payload.deviceType;
        },
        changeTheme(state) {
            const newTheme: Theme = state.theme === "dark" ? "light" : "dark";
            state.theme = newTheme;
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newTheme);
            }
        },
        setIsDarkMode(state, action: PayloadAction<{ isDarkMode: boolean }>) {
            state.isDarkMode = action.payload.isDarkMode;
            state.theme = action.payload.isDarkMode ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", state.theme);
            }
        },
        setCurrentLanguage(state, action: PayloadAction<{ currentLanguage: string }>) {
            state.currentLanguage = action.payload.currentLanguage;
            state.language = action.payload.currentLanguage;
        },
    },
});

export const websiteActions = websiteSlice.actions;
export default websiteSlice.reducer;
