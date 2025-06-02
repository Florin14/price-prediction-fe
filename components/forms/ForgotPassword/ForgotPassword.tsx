import React, { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
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
    forgotPasswordMessage: any;
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
        position: "relative",
        justifyContent: "center",
    },
    leftSection: {
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
    rightSection: {
        flex: 1,
        paddingRight: 60,
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
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "45px",
        color: "#21272A",
    },
    forgotPasswordMessage: {
        fontSize: "25px",
        fontWeight: 700,
        lineHeight: "20px",
        color: "#21272A",
        marginBottom: 16,
    },
    subtitle: {
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "100%",
        color: "#5FBAFA",
        marginBottom: "38px",
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
    [theme.breakpoints.down(1200)]: {
        wrapper: {
            width: "90%",
        },
        leftSection: {
            padding: "0 30px",
        },
        rightSection: {
            paddingRight: 30,
        },
        titlesSection: {
            padding: "0 30px",
        },
        formCard: {
            padding: "0 30px",
        },
    },

    [theme.breakpoints.down(900)]: {
        leftSection: {
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
            top: `calc(${cssVariables.defaultMargin} + 0.5em)`,
            zIndex: 2,
            width: "calc(100% - 40px)",
            textAlign: "center",
            marginBottom: 0, // spațiu între titluri și imagine
            paddingLeft: 0,
            paddingRight: 0,
        },

        rightSection: {
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
            marginTop: 220 + parseInt(cssVariables.defaultMargin), // înălțime imagine + spațiu
            width: "100%",
            marginInline: "auto",
            padding: 0,
        },
        forgotPasswordMessage: {
            textAlign: "center",
        },
    },
});

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [okResponse, setOkResponse] = useState<string | null>(null);

    const router = useRouter();

    const languageData = useSelector((state: RootState) => state.website.languageData);

    const classes = useClasses(useStyles, { name: "ForgotPasswordStyles" }) as StyleClasses;

    const handleSubmit = () => {
        setOkResponse(languageData?.ResetPasswordEmailSentConfirm || null);
        const data = {
            email: email,
        };
        const options = {
            url: "/account/reset-password",
            method: "POST",
            headers: {
                "X-Loading": false,
            },
            data: data,
        };
        Axios(options)
            .then((response) => {
                // Handle success if necessary
            })
            .catch((err) => {
                // Handle error if necessary
            });
    };

    return (
        <div className={classes.container} data-testid="forgot-password-form-container">
            <div className={classes.wrapper}>
                <div className={classes.leftSection} data-testid="forgot-password-form-left-section">
                    <div className={classes.titlesSection} data-testid="forgot-password-form-titles-section">
                        <Typography className={classes.title} data-testid="forgot-password-form-title">
                            {languageData?.PredictRealEstatePrices || "Predict Real Estate Prices"}
                        </Typography>
                    </div>
                    <div className={classes.formCard} data-testid="forgot-password-form-card">
                        <Typography className={classes.forgotPasswordMessage} data-testid="forgot-password-form-message">
                            {languageData?.ForgotPassword || "Ai uitat parola?"}
                        </Typography>
                        <FormLayout
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className={classes.form}
                            data-testid="forgot-password-form"
                        >
                            <StyledInput
                                label={languageData?.EmailAddress || "Adresa de email"}
                                activeLabel
                                type="email"
                                value={email}
                                onChange={(value: any) => setEmail(value)}
                                required
                                data-testid="forgot-password-form-email-input"
                            />
                            {!okResponse && (
                                <div className={classes.forgotPassword} data-testid="login-form-forgot-password">
                                    <Link href="/login">{languageData?.BackToAuthentication || "Inapoi la autentificare"}</Link>
                                </div>
                            )}
                            {okResponse && <Typography className={classes.successful}>{okResponse}</Typography>}
                            {!okResponse ? (
                                <StyledButton
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    className={classes.button}
                                    data-testid="forgot-password-form-submit-button"
                                >
                                    {languageData?.Reset}
                                </StyledButton>
                            ) : (
                                <StyledButton variant="contained" type="submit" fullWidth className={classes.button} onClick={() => router.push("/login")}>
                                    {languageData?.BackToAuthentication}
                                </StyledButton>
                            )}
                            <Divider style={{ margin: "35px 0", borderColor: "#DDE1E6" }} data-testid="forgot-password-form-divider" />
                        </FormLayout>
                    </div>
                </div>
                <div className={classes.rightSection} data-testid="forgot-password-form-right-section">
                    <div className={classes.rightImage} data-testid="forgot-password-form-right-image-section"></div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
