import "../styles/globals.css";

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { CookiesProvider, useCookies } from "react-cookie";
import { Provider, useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import store, { RootState } from "../store";
import { websiteActions } from "../store/slices/website/website-slice";

import Layout from "../containers/Layout";
import DashboardLayout from "../containers/DashboardLayout";
import SnackbarProvider from "../components/generic-components/SnackbarProvider/SnackbarProvider";
import { checkRouteAccessibleOrRedirect, deviceType, getRoleRoutes } from "../utils/app-functions";
import ErrorHandler from "../utils/error-handler";
import en from "../assets/language/en";
import ro from "../assets/language/ro";
import createEmotionCache from "../utils/createEmotionCache";

import{ darkTheme, lightTheme } from "../utils/theme";

const clientSideEmotionCache = createEmotionCache();

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
Axios.defaults.withCredentials = true;

interface UrlObject {
    locale: string;
}

const AppInner: React.FC<{ Component: React.ComponentType; pageProps: any; urlObject: UrlObject }> = ({ Component, pageProps, urlObject }) => {
    const route = useRouter();
    const { pathname, locale } = route;
    const [cookies, setCookie] = useCookies(["id", "name", "role", "validationNaturalPersons", "validationLegalEntities"]);
    const [loaded, setLoaded] = useState(true);
      const { theme, languageData } = useSelector((state: RootState) => state.website);


    const dispatch = useDispatch();

    useEffect(() => {
        setLoaded(false);
        dispatch(websiteActions.setDeviceType({ deviceType: deviceType() }));

        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
        if (
            pathname !== "/login" &&
            pathname !== "/home" &&
            pathname !== "/forgot-password" &&
            pathname !== "/user/reset-password" &&
            pathname !== "/guest/communications" &&
            pathname !== "/guest/complaints" &&
            pathname !== "waiting-validation"
        ) {
            const options = {
                url: "/account",
                method: "GET",
            };
            Axios(options)
                .then((response) => {
                    const rspData = response.data;
                    setCookie("name", rspData["name"], { path: "/", expires: new Date(Date.now() + 31536000) });
                    setCookie("role", rspData["role"], { path: "/", expires: new Date(Date.now() + 31536000) });
                    setCookie("id", rspData["id"], { path: "/", expires: new Date(Date.now() + 31536000) });

                    checkRouteAccessibleOrRedirect(getRoleRoutes(cookies["role"]), route, pathname, [
                        "/home",
                        "/login",
                        "/forgot-password",
                        "/user/reset-password",
                        "/dashboard/control-panel",
                        "/dashboard/user/change-password",
                        "/platform-in-work",
                        "/guest/communications",
                        "/guest/complaints",
                        "/register",
                        "/waiting-validation",
                    ]).then(() => {
                        if (route.pathname === "/") {
                            route.push("/dashboard/control-panel").then(() => {
                                setLoaded(true);
                            });
                        } else {
                            setLoaded(true);
                        }
                    });
                })
                .catch((err) => {
                    if (
                        route.pathname !== "/forgot-password" &&
                        route.pathname !== "/login" &&
                        route.pathname !== "/user/reset-password" &&
                        route.pathname !== "/guest/communications" &&
                        route.pathname !== "/guest/complaints" &&
                        route.pathname !== "/register" &&
                        route.pathname !== "/waiting-validation"
                    ) {
                        route.push("/home").then(() => {
                            setLoaded(true);
                        });
                    } else {
                        setLoaded(true);
                    }
                });
        } else {
            if (pathname === "/home") {
                route.push(cookies.role && cookies.role !== "" ? "/dashboard/control-panel" : "/home").then((_) => {
                    setLoaded(true);
                });
            } else {
                checkRouteAccessibleOrRedirect(getRoleRoutes(cookies["role"]), route, route.pathname, [
                    "/home",
                    "/login",
                    "/forgot-password",
                    "/user/reset-password",
                    "/dashboard/control-panel",
                    "/dashboard/user/change-password",
                    "/guest/communications",
                    "/guest/complaints",
                    "/platform-in-work",
                    "/register",
                    "/waiting-validation",
                ]).then((r) => {
                    setLoaded(true);
                });
            }
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

    return languageData ? (
        <CookiesProvider>
            <ErrorHandler />
            <CacheProvider value={clientSideEmotionCache}>
                <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                    <CssBaseline />
                    {(route.pathname.includes("dashboard") || route.pathname.includes("guest")) && loaded ? (
                        <DashboardLayout>
                            <SnackbarProvider>
                                <Component {...pageProps} />
                            </SnackbarProvider>
                        </DashboardLayout>
                    ) : loaded ? (
                        <Layout>
                            <Head>
                                <title>Primaria Vad</title>
                                <meta name="description" content="Primaria Vad" />
                            </Head>
                            <SnackbarProvider>
                                <Component {...pageProps} />
                            </SnackbarProvider>
                        </Layout>
                    ) : null}
                </ThemeProvider>
            </CacheProvider>
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
