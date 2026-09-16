import "../styles/globals.css";

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { CookiesProvider, useCookies } from "react-cookie";
import { Provider, useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
    display: "swap",
    style: ["normal", "italic"],
    axes: ["opsz"],
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
    display: "swap",
    weight: ["400", "500", "600"],
});

const fontVariables = `${inter.variable} ${fraunces.variable} ${jetbrains.variable}`;

import store, { RootState } from "../store";
import { websiteActions } from "../store/slices/website/website-slice";

import Layout from "../containers/Layout";
import DashboardLayout from "../containers/DashboardLayout";
import SnackbarProvider from "../components/generic-components/SnackbarProvider/SnackbarProvider";
import { deviceType } from "../utils/app-functions";
import ErrorHandler from "../utils/error-handler";
import en from "../assets/language/en";
import ro from "../assets/language/ro";
import createEmotionCache from "../utils/createEmotionCache";

import { darkTheme, lightTheme } from "../utils/theme";
import "leaflet/dist/leaflet.css";

const clientSideEmotionCache = createEmotionCache();

Axios.defaults.baseURL = "http://localhost:8002";
Axios.defaults.withCredentials = true;

interface UrlObject {
    locale: string;
}

const AppInner: React.FC<{ Component: React.ComponentType; pageProps: any; urlObject: UrlObject }> = ({ Component, pageProps, urlObject }) => {
    const route = useRouter();
    const { pathname, locale } = route;
    const [cookies] = useCookies(["id", "name", "role", "validationNaturalPersons", "validationLegalEntities"]);
    const [loaded, setLoaded] = useState(true);
    const { languageData, theme } = useSelector((state: RootState) => state.website);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoaded(false);
        dispatch(websiteActions.setDeviceType({ deviceType: deviceType() }));

        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }

        // Simplified navigation without account endpoint check
        if (pathname === "/home" && cookies.role && cookies.role !== "") {
            // route.push("/dashboard/control-panel").then((_) => {
            setLoaded(true);
            // });
        } else if (pathname === "/") {
            route.push("/home").then((_) => {
                setLoaded(true);
            });
        } else {
            setLoaded(true);
        }
    }, []);
    useEffect(() => {
        if (urlObject) {
            route.push(route.pathname, route.pathname, { locale: urlObject.locale }).then(() => {
                setLoaded(true);
            });
        } else {
            if (route.locale) {
                dispatch(websiteActions.setLanguage({ language: route.locale }));
            }

            dispatch(
                websiteActions.setLanguageData({
                    languageData: route.locale === "ro" ? ro : en,
                })
            );
        }
    }, [urlObject, route.locale, route]);

    const handleToggleTheme = () => {
        dispatch(websiteActions.changeTheme());
    };

    useEffect(() => {
        if (typeof document !== "undefined") {
            const root = document.documentElement;
            if (theme === "dark") {
                root.classList.add("dark");
                root.style.colorScheme = "dark";
            } else {
                root.classList.remove("dark");
                root.style.colorScheme = "light";
            }
        }
    }, [theme]);

    return languageData ? (
        <CookiesProvider>
            <ErrorHandler />
            <GoogleOAuthProvider clientId={"83021076383-148aa0gv78b8o1h4egqi0kq0s81tclm0.apps.googleusercontent.com"}>
                <CacheProvider value={clientSideEmotionCache}>
                    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                        <CssBaseline />
                        <div className={`${fontVariables} font-sans h-full`}>
                            {(route.pathname.includes("customer") || route.pathname.includes("guest") || route.pathname.includes("home")) && loaded ? (
                                <DashboardLayout>
                                    <SnackbarProvider>
                                        <Component {...pageProps} onToggleTheme={handleToggleTheme} isDarkMode={theme === "dark"} />
                                    </SnackbarProvider>
                                </DashboardLayout>
                            ) : loaded ? (
                                <Layout>
                                    <Head>
                                        <title>Predict Real Estate Prices</title>
                                        <meta name="description" content="Predict Real Estate Prices" />
                                    </Head>
                                    <SnackbarProvider>
                                        <Component {...pageProps} onToggleTheme={handleToggleTheme} isDarkMode={theme === "dark"} />
                                    </SnackbarProvider>
                                </Layout>
                            ) : null}
                        </div>
                    </ThemeProvider>
                </CacheProvider>
            </GoogleOAuthProvider>
        </CookiesProvider>
    ) : null;
};

const App: React.FC<{ Component: React.ComponentType; pageProps: any; urlObject: UrlObject }> = ({ Component, pageProps, urlObject }) => {
    return (
        <Provider store={store}>
            <AppInner Component={Component} pageProps={pageProps} urlObject={urlObject} />
        </Provider>
    );
};

export default App;
