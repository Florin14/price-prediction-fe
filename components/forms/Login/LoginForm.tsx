import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

import { Typography, Divider } from "@mui/material";

import { RootState } from "../../../store";

import StyledInput from "../../generic-components/StyledInput";
import StyledButton from "../../generic-components/StyledButton";
import FormLayout from "../../../containers/FormLayout";
import cssVariables from "../../../assets/css/variables";
import useClasses from "../../../utils/useClasses";

interface StyleClasses {
    container: any;
    leftSection: any;
    rightSection: any;
    form: any;
    formCard: any;
    forgotPassword: any;
    error: any;
    button: any;
    title: any;
    subtitle: any;
    titlesSection: any;
    loginMessage: any;
    [key: string]: any;
}

const useStyles = (theme: any): StyleClasses => ({
    container: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#F9FAFB",
        display: "flex",
        justifyContent: "center",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "80%",
        position: "relative", // <-- pentru poziționare absolută a imaginii
        justifyContent: "center",
    },
    rightSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px",
        paddingLeft: 60,
        width: "100%",
    },
    formCard: {
        textAlign: "left",
        width: "100%",
        padding: "0 60px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: cssVariables.smallMargin,
        maxWidth: 500,
    },
    leftSection: {
        flex: 1,
        width: "100%",
    },
    rightImage: {
        width: "100%",
        height: "100%",
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    titlesSection: {
        textAlign: "left",
        width: "100%",
        padding: "0 60px",
    },
    title: {
        textAlign: "center",
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "45px",
        color: "#21272A",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "100%",
        color: "#5FBAFA",
        marginBottom: "38px",
    },
    loginMessage: {
        fontSize: "25px",
        fontWeight: 700,
        lineHeight: "20px",
        color: "#21272A",
        marginBottom: 16,
    },
    forgotPassword: {
        textAlign: "right",
        color: "#001D6C",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "120%",
    },
    error: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
    },
    button: {
        height: 40,
    },
    createAccountButton: {
        height: 40,
        backgroundColor: "white",
    },
    [theme.breakpoints.down(1200)]: {
        wrapper: {
            width: "90%",
        },
        rightSection: {
            padding: "0 30px",
        },
        leftSection: {
            // paddingRight: 30,
        },
        titlesSection: {
            padding: "0 30px",
        },
        formCard: {
            padding: "0 30px",
        },
    },

    [theme.breakpoints.down(900)]: {
        rightSection: {
            padding: "0 25px",
            paddingTop: cssVariables.defaultMargin,
        },
        titlesSection: {
            padding: "0 25px",
            paddingTop: cssVariables.defaultMargin,
        },
        formCard: {
            padding: "0 25px",
        },
        subtitle: {
            marginBottom: cssVariables.defaultMargin,
        },
    },
    [theme.breakpoints.down(600)]: {
        titlesSection: {
            position: "absolute",
            top: `calc(${cssVariables.defaultMargin} + 0.5em)`, // sub titlu + mic offset
            zIndex: 2,
            width: "calc(100% - 40px)",
            textAlign: "center",
            marginBottom: 0, // spațiu între titluri și imagine
            paddingLeft: 0,
            paddingRight: 0,
        },

        leftSection: {
            position: "absolute",
            top: `calc(${cssVariables.defaultMargin} + 7em)`, // sub titlu + mic offset
            left: "50%",
            transform: "translateX(-50%)",
            width: 220, // ajustează după nevoie
            height: 220, // păstrează proporția
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            margin: 0,
            zIndex: 1,
        },
        title: {
            fontSize: 20,
        },
        subtitle: {
            fontSize: 20,
        },
        formCard: {
            position: "relative",
            marginTop: 240 + parseInt(cssVariables.defaultMargin), // înălțime imagine + spațiu
            width: "100%",
            marginInline: "auto",
            padding: 0,
        },

        loginMessage: {
            textAlign: "center",
        },
    },
});

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [globalError, setGlobalError] = useState<string>("");
    const router = useRouter();

    const [cookies, setCookie] = useCookies(["name", "role", "id"]);
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const classes = useClasses(useStyles, { name: "LoginFormStyles" }) as StyleClasses;

    useEffect(() => {
        if (router.isReady) {
            const { code, email } = router.query;
            if (code && email) {
                let data = {
                    email: email,
                    code: code,
                };

                const options = {
                    url: "/account/confirm",
                    method: "PUT",
                    data: data,
                };
                Axios(options)
                    .then((response) => {
                        router.push("/login").then((r) => {});
                    })
                    .catch((err) => {
                        router.push("/login").then((r) => {});
                    });
            }
        }
    }, [router?.isReady, router?.query]);

    const handleLogin = () => {
        let data;
        if (showCaptcha) {
            data = {
                email: email,
                password: password,
                recaptchaToken: captchaToken,
            };
            setShowCaptcha(false);
            setCaptchaToken(null);
        } else {
            data = {
                email: email,
                password: password,
            };
        }
        const options = {
            url: "/auth/login",
            method: "POST",
            data: data,
        };
        Axios(options)
            .then((response) => {
                const rspData = response.data;
                setGlobalError("");
                const expires = new Date(Date.now() + 31536000);
                setCookie("name", rspData["name"], { path: "/", expires });
                setCookie("role", rspData["role"], { path: "/", expires });
                setCookie("id", rspData["id"], { path: "/", expires });
                router.push("/dashboard/control-panel").then((r) => {});
            })
            .catch((err) => {
                if (err?.response?.data?.code === "E0010" || err?.response?.code === "E0024") {
                    setGlobalError(languageData?.InvalidCredentials || "");
                } else if (err?.response?.data?.code === "E0011") {
                    setGlobalError(languageData?.CaptchaConfirm || "");
                    setShowCaptcha(true);
                } else {
                    setGlobalError(languageData?.SomethingWentWrong || "");
                }
            });
    };

    const handleCreateAccount = () => {
        router.push("/register").then((r) => {});
    };

    const captchaOnChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    return (
        <div className={classes.container} data-testid="login-form-container">
            <div className={classes.wrapper}>
                <div className={classes.leftSection} data-testid="login-form-right-section">
                    <div className={classes.rightImage} data-testid="login-form-right-image-section"></div>
                </div>
                <div className={classes.rightSection} data-testid="login-form-left-section">
                    <div className={classes.titlesSection} data-testid="login-form-titles-section">
                        <Typography className={classes.title} data-testid="login-form-title">
                            {languageData?.PredictRealEstatePrices || "Predict Real Estate Prices"}
                            🏠
                        </Typography>
                    </div>
                    <div className={classes.formCard} data-testid="login-form-card">
                        <Typography className={classes.loginMessage} data-testid="login-form-message">
                            {languageData?.LoginAction || "Autentificare"}
                        </Typography>
                        <FormLayout
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                            className={classes.form}
                            data-testid="login-form"
                        >
                            <StyledInput
                                label={languageData?.EmailAddress || "Adresa de email"}
                                activeLabel
                                type="email"
                                value={email}
                                onChange={(value: any) => setEmail(value ?? "")}
                                required
                                data-testid="login-form-email-input"
                            />
                            <StyledInput
                                label={languageData?.Password || "Parola"}
                                activeLabel
                                type="password"
                                showHidePassword
                                value={password}
                                onChange={(value: any) => setPassword(value ?? "")}
                                required
                                data-testid="login-form-password-input"
                            />
                            <div className={classes.forgotPassword} data-testid="login-form-forgot-password">
                                <Link href="/forgot-password">{languageData?.ForgotPassword || "Ai uitat parola?"}</Link>
                            </div>
                            {globalError && (
                                <div className={classes.error} data-testid="login-form-error">
                                    {globalError}
                                </div>
                            )}
                            <StyledButton
                                variant="contained"
                                type="submit"
                                fullWidth
                                className={classes.button}
                                disabled={showCaptcha && !captchaToken}
                                data-testid="login-form-submit-button"
                            >
                                {languageData?.Login || "Autentifica-te"}
                            </StyledButton>
                            <Divider style={{ margin: "15px 0", borderColor: "#DDE1E6" }} data-testid="login-form-divider" />
                            <StyledButton
                                variant="outlined"
                                fullWidth
                                onClick={handleCreateAccount}
                                className={classes.createAccountButton}
                                data-testid="login-form-create-account-button"
                            >
                                {languageData?.CreateAccount || "Creeaza cont"}
                            </StyledButton>
                        </FormLayout>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
