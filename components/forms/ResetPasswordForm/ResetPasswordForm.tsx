import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

import { Typography, Divider, ListItemIcon, ListItem, styled } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { RootState } from "../../../store";

import StyledInput from "../../generic-components/StyledInput";
import StyledButton from "../../generic-components/StyledButton";
import FormLayout from "../../../containers/FormLayout";
import cssVariables from "../../../assets/css/variables";
import useClasses from "../../../utils/useClasses";
import { ValidationState } from "../../../assets/language/constants";

interface StyleClasses {
    container: any;
    leftSection: any;
    rightSection: any;
    form: any;
    formCard: any;
    resetPassword: any;
    button: any;
    error: any;
    title: any;
    subtitle: any;
    titlesSection: any;
    resetPasswordMessage: any;
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
    error: {
        marginTop: 8,
        fontSize: 12,
        lineHeight: "14px",
        fontWeight: 500,
        fontStyle: "normal",
        color: "red",
        textAlign: "end",
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
    resetPasswordMessage: {
        fontSize: "25px",
        fontWeight: 700,
        lineHeight: "20px",
        color: "#21272A",
        marginBottom: 25,
    },
    subtitle: {
        fontSize: "33px",
        fontWeight: 700,
        lineHeight: "100%",
        color: "#5FBAFA",
        marginBottom: "38px",
    },
    resetPassword: {
        textAlign: "right",
        color: "#001D6C",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "120%",
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
        resetPasswordMessage: {
            textAlign: "center",
        },
    },
});

const ValidationListItem = styled(ListItem)<{ isvalid: number }>(({ isvalid }) => ({
    padding: "0px 0",
    color: isvalid ? "#34C759" : "#637381",
    fontSize: "12px",
    fontWeight: 400,
    fontFamily: "Inter",
    "& .MuiListItemIcon-root": {
        minWidth: "20px",
        color: "inherit",
    },
    "& .MuiSvgIcon-root": {
        fontSize: "8px",
    },
    "& .MuiSvgIcon-root.checkmark": {
        fontSize: "12px",
    },
}));

const ResetPasswordForm: React.FC = () => {
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [okResponse, setOkResponse] = useState<string>("");
    const [responseError, setResponseError] = useState<string>("");
    const [validation, setValidation] = useState<ValidationState | null>(null);

    const classes = useClasses(useStyles, { name: "ResetPasswordFormStyles" }) as StyleClasses;
    const router = useRouter();

    const languageData = useSelector((state: RootState) => state.website.languageData);

    const upperCaseRegex = new RegExp("(?=.*[A-Z])");
    const lowerCaseRegex = new RegExp("(?=.*[a-z])");
    const digitRegex = new RegExp("(?=.*[0-9])");
    const specialCharRegex = new RegExp("(?=.*[~`!@#$%^&*()_\\-+={\\[}\\]|:;\"'<,>.?/])");

    useEffect(() => {
        setValidation({
            upperCaseValidation: {
                valid: false,
                message: languageData?.UpperCaseMessage || "",
            },
            lowerCaseValidation: {
                valid: false,
                message: languageData?.LowerCaseMessage || "",
            },
            digitValidation: {
                valid: false,
                message: languageData?.DigitMessage || "",
            },
            specialCharValidation: {
                valid: false,
                message: languageData?.SpecialCharMessage || "",
            },
            lengthValidation: {
                valid: false,
                message: languageData?.LengthMessage || "",
            },
        });
    }, [languageData]);

    useEffect(() => {
        const checkPasswords = () => {
            setResponseError("");
            if (password !== confirmPassword) setError(languageData?.PasswordsDontMatch || "");
            else setError("");
        };

        if (confirmPassword) {
            checkPasswords();
        }
    }, [password, confirmPassword, languageData]);

    const handleSubmit = () => {
        if (
            validation &&
            validation.upperCaseValidation.valid &&
            validation.lowerCaseValidation.valid &&
            validation.digitValidation.valid &&
            validation.specialCharValidation.valid &&
            validation.lengthValidation.valid
        ) {
            const data = {
                email: router.query.email,
                code: router.query.code,
                newPassword: password,
            };
            const options = {
                url: "/account/reset-password",
                method: "PUT",
                data: data,
            };
            Axios(options)
                .then(() => {
                    setResponseError("");
                    router.push("/login");
                })
                .catch(() => {
                    setResponseError(languageData?.InvalidResetCode || "");
                    setOkResponse("");
                });
        }
    };

    const onPasswordChange = (value: string) => {
        setPassword(value);

        let upperCaseState = false;
        let lowerCaseState = false;
        let digitState = false;
        let specialCharState = false;
        let lengthState = true;

        if (value) {
            if (upperCaseRegex.test(value)) {
                upperCaseState = true;
            }
            if (lowerCaseRegex.test(value)) {
                lowerCaseState = true;
            }
            if (digitRegex.test(value)) {
                digitState = true;
            }
            if (specialCharRegex.test(value)) {
                specialCharState = true;
            }
            if (value.length < 8) {
                lengthState = false;
            }
        } else {
            lengthState = false;
        }

        setValidation({
            upperCaseValidation: {
                valid: upperCaseState,
                message: languageData?.UpperCaseMessage || "",
            },
            lowerCaseValidation: {
                valid: lowerCaseState,
                message: languageData?.LowerCaseMessage || "",
            },
            digitValidation: {
                valid: digitState,
                message: languageData?.DigitMessage || "",
            },
            specialCharValidation: {
                valid: specialCharState,
                message: languageData?.SpecialCharMessage || "",
            },
            lengthValidation: {
                valid: lengthState,
                message: languageData?.LengthMessage || "",
            },
        });
    };

    return (
        <div className={classes.container} data-testid="reset-password-form-container">
            <div className={classes.wrapper}>
                <div className={classes.leftSection} data-testid="reset-password-form-left-section">
                    <div className={classes.titlesSection} data-testid="reset-password-form-titles-section">
                        <Typography className={classes.title} data-testid="reset-password-form-title">
                            {languageData?.PredictRealEstatePrices || "Predict Real Estate Prices"}
                        </Typography>
                    </div>
                    <div className={classes.formCard} data-testid="reset-password-form-card">
                        <Typography className={classes.resetPasswordMessage} data-testid="reset-password-form-message">
                            {languageData?.ResetPassword || "Resetare parola"}
                        </Typography>
                        <FormLayout
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className={classes.form}
                            data-testid="reset-password-form"
                        >
                            <StyledInput
                                value={password}
                                label={languageData?.NewPassword}
                                activeLabel
                                className={classes.input}
                                inputClassName={classes.fieldInput}
                                onChange={(value: any) => onPasswordChange(value)}
                                inputName="password"
                                type="password"
                                required={true}
                                showHidePassword={true}
                            />
                            <div style={{ marginBottom: 24 }}>
                                {validation &&
                                    Object.keys(validation).map((key) => {
                                        const valid = validation[key as keyof ValidationState].valid;
                                        const message = validation[key as keyof ValidationState].message;
                                        return (
                                            <ValidationListItem key={key} isvalid={valid ? 1 : 0}>
                                                <ListItemIcon>{valid ? <CheckCircleIcon className="checkmark" /> : <FiberManualRecordIcon />}</ListItemIcon>
                                                <div className={valid ? classes.confirmed : classes.unconfirmed} style={{ width: "90%" }}>
                                                    {message}
                                                </div>
                                            </ValidationListItem>
                                        );
                                    })}
                            </div>
                            <StyledInput
                                value={confirmPassword}
                                label={languageData?.ConfirmNewPassword}
                                activeLabel
                                inputClassName={classes.fieldInput}
                                className={classes.lastInput}
                                onChange={(value: any) => setConfirmPassword(value)}
                                inputName="password"
                                type="password"
                                required={true}
                                showHidePassword={true}
                            />
                            {!okResponse && (
                                <div className={classes.resetPassword} data-testid="login-form-reset-password">
                                    <Link href="/login">{languageData?.BackToAuthentication || "Inapoi la autentificare"}</Link>
                                </div>
                            )}
                            {responseError && <div className={classes.error}>{responseError}</div>}
                            <StyledButton
                                variant="contained"
                                type="submit"
                                fullWidth
                                className={classes.button}
                                disabled={
                                    Boolean(error) ||
                                    !Boolean(password) ||
                                    !Boolean(confirmPassword) ||
                                    validation === null ||
                                    !validation.upperCaseValidation.valid ||
                                    !validation.lowerCaseValidation.valid ||
                                    !validation.digitValidation.valid ||
                                    !validation.specialCharValidation.valid ||
                                    !validation.lengthValidation.valid
                                }
                                data-testid="change-password-form-submit-button"
                            >
                                {languageData?.ChangePassword}
                            </StyledButton>

                            <Divider style={{ margin: "35px 0", borderColor: "#DDE1E6" }} data-testid="reset-password-form-divider" />
                        </FormLayout>
                    </div>
                </div>
                <div className={classes.rightSection} data-testid="reset-password-form-right-section">
                    <div className={classes.rightImage} data-testid="reset-password-form-right-image-section"></div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
