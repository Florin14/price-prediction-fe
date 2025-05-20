import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebsiteStore from "../../../models/generic/website";
import { LanguageDataTypes } from "../../../assets/language/ro";

const initialState: WebsiteStore = {
    language: "",
    languageData: null,
    role: null,
    title: null,
    goBack: null,
    deviceType: null,
    theme: "light",
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
        changeTheme(state, action) {
            if (state.theme === "dark") {
                state.theme = "light";
            } else {
                state.theme = "dark";
            }
        },
    },
});

export const websiteActions = websiteSlice.actions;
export default websiteSlice.reducer;
