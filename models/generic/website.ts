import { LanguageDataTypes } from "../../assets/language/ro";

export default interface WebsiteStore {
    language: string;
    // languageData: LanguageDataTypes | null;
    languageData: any | null;
    role: string | null;
    title: string | null;
    goBack: string | null;
    deviceType: string | null;
    theme: "light" | "dark";
}
