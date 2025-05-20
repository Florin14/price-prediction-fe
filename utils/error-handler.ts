import { FC, useRef } from "react";
import Axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; // Import RootState type from your store
import { loadingActions } from "../store/slices/loading/loading-slice";
import { snackbarActions } from "../store/slices/snackbar/snackbar-slice";

const ErrorHandler: FC = () => {
    const [_, setCookie] = useCookies(["id", "name", "role"]);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.loading);
    // here it remains any type for the language because we need to access error codes that maybe doesn't exists and typescript will give us errors
    const languageData = useSelector((state: RootState) => state.website.languageData) as any;
    const router = useRouter();
    const isRefreshing = useRef(false);
    const refreshFailed = useRef(false);

    const escapePaths = [
        "/forgot-password",
        "/login",
        "/user/reset-password",
        "/register",
        "/privacy-policy",
        "/cookie-policy",
        "/guest/communications",
        "/guest/complaints",
    ];

    const handleRedirect = () => {
        if (!refreshFailed.current) {
            refreshFailed.current = true;
            setCookie("name", "", { path: "/" });
            setCookie("role", "", { path: "/" });
            setCookie("id", "", { path: "/" });
            router.push("/login").then(() => {
                refreshFailed.current = false;
            });
        }
    };
    Axios.interceptors.request.use(
        function (config: InternalAxiosRequestConfig) {
            const loadingHeader = config?.headers?.["X-Loading"];
            if (loadingHeader || loadingHeader === undefined) {
                if (!loading) {
                    dispatch(loadingActions.setLoading({ loading: true }));
                }
            }

            return config;
        },
        function (error: AxiosError) {
            dispatch(loadingActions.setLoading({ loading: false }));
            return Promise.reject(error);
        }
    );

    Axios.interceptors.response.use(
        function (response: AxiosResponse) {
            const loadingHeader = response?.config?.headers?.["X-Loading"];
            const continueLoadingHeader = response?.config?.headers?.["X-Continue-Loading"];

            if (!continueLoadingHeader && (loadingHeader || loadingHeader === undefined)) {
                setTimeout(() => {
                    dispatch(loadingActions.setLoading({ loading: false }));
                }, 300);
            }

            if (response) {
                const { method } = response?.config;
                switch (method) {
                    case "put":
                        if (response?.config?.url === "/account/confirm") {
                            dispatch(
                                snackbarActions.handleOpen({
                                    message: "Email confirmat cu succes",
                                    type: "success",
                                })
                            );
                        } else if (response?.config?.url === "/account/reset-password") {
                            dispatch(
                                snackbarActions.handleOpen({
                                    message: "Parola a fost resetata cu succes",
                                    type: "success",
                                })
                            );
                        } else {
                            dispatch(
                                snackbarActions.handleOpen({
                                    message: languageData?.SuccessAndErrorMessages.Success.Put,
                                    type: "success",
                                })
                            );
                        }
                        break;
                    case "post": {
                        if (
                            response?.config?.url !== "/auth/logout" &&
                            response?.config?.url !== "/account/reset-password" &&
                            response?.config?.url !== "/auth/login" &&
                            response?.config?.url !== "/account/change-password" &&
                            response?.config?.url !== "/auth/refresh-token"
                        )
                            dispatch(
                                snackbarActions.handleOpen({
                                    message: languageData?.SuccessAndErrorMessages.Success.Put,
                                    type: "success",
                                })
                            );
                        if (response?.config?.url === "/account/change-password")
                            dispatch(
                                snackbarActions.handleOpen({
                                    message: "Schimbat cu succes",
                                    type: "success",
                                })
                            );
                        break;
                    }
                    case "delete":
                        dispatch(
                            snackbarActions.handleOpen({
                                message: "Sters cu succes",
                                type: "success",
                            })
                        );
                        break;
                    default:
                        break;
                }
            }
            return response;
        },
        async function (error: AxiosError) {
            setTimeout(() => {
                dispatch(loadingActions.setLoading({ loading: false }));
            }, 300);

            const { response, config } = error;
            const isEscapePath = escapePaths.includes(router.pathname);
            if (response) {
                const { data } = response as any;
                if (response?.status === 401 || data?.code === "E0015") {
                    if (data?.code === "E0013") {
                        if (refreshFailed.current || isEscapePath) {
                            return Promise.reject(error);
                        }
                        if (!isRefreshing.current) {
                            isRefreshing.current = true;
                            try {
                                const r = await Axios.post("/auth/refresh-token");
                                if (r.status === 200) {
                                    isRefreshing.current = false;
                                }
                                handleRedirect();
                            } catch (e) {
                                handleRedirect();
                            } finally {
                                isRefreshing.current = false;
                            }
                        }
                    } else if (!isEscapePath) {
                        handleRedirect();
                    }
                } else {
                    const method = config?.method as any;
                    let match: string | null = null;
                    if (
                        languageData?.SuccessAndErrorMessages.Error[data?.code] &&
                        languageData?.SuccessAndErrorMessages.Error[data?.code]?.[method] &&
                        typeof languageData?.SuccessAndErrorMessages.Error[data?.code]?.[method] === "object"
                    ) {
                        const errorMethod = languageData?.SuccessAndErrorMessages.Error[data?.code]?.[method];

                        for (const key of Object.keys(errorMethod)) {
                            const reg = new RegExp(key);

                            if (reg.test(config?.url || "")) {
                                match = key;
                                break;
                            }
                        }
                        if (match === null) {
                            match = "default";
                        }
                    }
                    if (response?.config?.url !== "/account/reset-password") {
                        if (match !== null) {
                            dispatch(
                                snackbarActions.handleOpen({
                                    message: languageData?.SuccessAndErrorMessages.Error[data?.code]?.[method]?.[match],
                                    type: "error",
                                })
                            );
                        } else {
                            if (data?.code === "E0144" || data?.code === "E0145")
                                dispatch(
                                    snackbarActions.handleOpen({
                                        message:
                                            languageData?.SuccessAndErrorMessages.Error[data?.code]?.[method] ||
                                            languageData?.SuccessAndErrorMessages.Error[data?.code] ||
                                            languageData?.SomethingWentWrong,
                                        type: "info",
                                    })
                                );
                            else
                                dispatch(
                                    snackbarActions.handleOpen({
                                        message:
                                            languageData?.SuccessAndErrorMessages.Error[data?.code]?.[method] ||
                                            languageData?.SuccessAndErrorMessages.Error[data?.code] ||
                                            languageData?.SomethingWentWrong,
                                        type: "error",
                                    })
                                );
                        }
                    }
                }
            } else {
                router.push("/platform-in-work");
            }
            return Promise.reject(error);
        }
    );

    return null;
};

export default ErrorHandler;
