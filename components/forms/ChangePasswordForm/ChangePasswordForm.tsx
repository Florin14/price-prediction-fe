import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Card, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { websiteActions } from "../../../store/slices/website/website-slice";
import { RootState } from "../../../store";

import FormLayout from "../../../containers/FormLayout";
import StyledInput from "../../generic-components/StyledInput";
import StyledButton from "../../generic-components/StyledButton";
import useClasses from "../../../utils/useClasses";
import { LanguageDataTypes } from "../../../assets/language/ro";

interface StyleClasses {
    contentWrapper: any;
    wrapper: any;
    input: any;
    lastInput: any;
    error: any;
    confirmed: any;
    unconfirmed: any;
    button: any;
    label: any;
    title: any;
    fieldInput: any;
}

const useStyles = (theme: any): StyleClasses => ({
    contentWrapper: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        padding: "70px 40px 40px 40px",
    },
    input: {
        width: "100%",
        marginBottom: 10,
    },
    lastInput: {
        width: "100%",
        marginBottom: 32,
    },
    error: {
        color: "red",
        fontSize: 10,
        lineHeight: "12px",
        fontWeight: 500,
        fontStyle: "normal",
        marginBottom: 10,
    },
    confirmed: {
        color: "green",
        fontSize: 10,
        fontWeight: 500,
        fontStyle: "normal",
    },
    unconfirmed: {
        color: "#000",
        fontSize: 10,
        fontWeight: 500,
        fontStyle: "normal",
    },
    button: {
        fontWeight: "bold",
        fontSize: theme.typography.fs14,
        lineHeight: "15px",
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        padding: "0px 15px 0px 15px",
        height: "40px",
        "&:hover": {
            backgroundColor: "#04253E",
        },
        borderRadius: "3px",
        marginTop: "20px",
    },
    label: {
        fontStyle: "normal",
        fontSize: theme.typography.fs10,
        lineHeight: "15px",
        color: "#000",
    },
    title: {
        margin: "20px auto 20px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        color: theme.palette.grey.text,
    },
    fieldInput: {
        height: 35,
    },
});

const ChangePassword: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [error, setError] = useState("");
    const [responseError, setResponseError] = useState("");
    const [validation, setValidation] = useState<any>(null);

    const upperCaseRegex = new RegExp("(?=.*[A-Z])");
    const lowerCaseRegex = new RegExp("(?=.*[a-z])");
    const digitRegex = new RegExp("(?=.*[0-9])");
    const specialCharRegex = new RegExp("(?=.*[~`!@#$%^&*()_\\-+={\\[}\\]|:;\"'<,>.?/])");

    const classes = useClasses(useStyles, { name: "ChangePasswordStyles" }) as StyleClasses;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(websiteActions.setTitle({ title: "ChangePassword" }));
    }, [dispatch]);

    useEffect(() => {
        setValidation({
            upperCaseValidation: {
                valid: false,
                message: languageData?.UpperCaseMessage,
            },
            lowerCaseValidation: {
                valid: false,
                message: languageData?.LowerCaseMessage,
            },
            digitValidation: {
                valid: false,
                message: languageData?.DigitMessage,
            },
            specialCharValidation: {
                valid: false,
                message: languageData?.SpecialCharMessage,
            },
            lengthValidation: {
                valid: false,
                message: languageData?.LengthMessage,
            },
        });
    }, [languageData]);

    useEffect(() => {
        const checkPasswords = () => {
            setResponseError("");
            if (password !== confirmPassword && password !== "" && confirmPassword !== "") setError(languageData?.PasswordsDontMatch || "");
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
                currentPassword: oldPassword,
                newPassword: password,
            };
            const options = {
                url: "/account/change-password",
                method: "POST",
                data: data,
            };
            Axios(options)
                .then(() => {
                    setValidation({
                        upperCaseValidation: {
                            valid: false,
                            message: languageData?.UpperCaseMessage,
                        },
                        lowerCaseValidation: {
                            valid: false,
                            message: languageData?.LowerCaseMessage,
                        },
                        digitValidation: {
                            valid: false,
                            message: languageData?.DigitMessage,
                        },
                        specialCharValidation: {
                            valid: false,
                            message: languageData?.SpecialCharMessage,
                        },
                        lengthValidation: {
                            valid: false,
                            message: languageData?.LengthMessage,
                        },
                    });
                    setPassword("");
                    setConfirmPassword("");
                    setOldPassword("");
                })
                .catch((err: any) => {
                    if (err?.response?.data?.message)
                        setResponseError((languageData && (languageData[err?.response?.data?.message as keyof LanguageDataTypes] as string)) || "");
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

        setValidation({
            upperCaseValidation: {
                valid: upperCaseState,
                message: languageData?.UpperCaseMessage,
            },
            lowerCaseValidation: {
                valid: lowerCaseState,
                message: languageData?.LowerCaseMessage,
            },
            digitValidation: {
                valid: digitState,
                message: languageData?.DigitMessage,
            },
            specialCharValidation: {
                valid: specialCharState,
                message: languageData?.SpecialCharMessage,
            },
            lengthValidation: {
                valid: lengthState,
                message: languageData?.LengthMessage,
            },
        });
    };

    return (
        <div className={classes.contentWrapper}>
            <Card className={classes.wrapper}>
                <FormLayout
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <StyledInput
                        activeLabel
                        label={languageData?.CurrentPassword}
                        value={oldPassword}
                        className={classes.input}
                        onChange={(value: any) => setOldPassword(value)}
                        inputName="password"
                        type="password"
                        required={true}
                        inputClassName={classes.fieldInput}
                    />
                    <StyledInput
                        activeLabel
                        label={languageData?.NewPassword}
                        value={password}
                        className={classes.input}
                        onChange={(value: any) => onPasswordChange(value)}
                        inputName="password"
                        type="password"
                        required={true}
                        inputClassName={classes.fieldInput}
                    />
                    <div style={{ marginBottom: 10 }}>
                        {validation &&
                            Object.keys(validation).map((key) => {
                                return (
                                    <Grid key={key} container direction="row" justifyContent="flex-start" alignItems="center">
                                        <div style={{ width: "10%" }}>
                                            {validation[key].valid === true ? (
                                                <CheckIcon classes={{ root: classes.confirmed }} />
                                            ) : (
                                                <ClearIcon classes={{ root: classes.unconfirmed }} />
                                            )}
                                        </div>
                                        <div className={validation[key].valid === true ? classes.confirmed : classes.unconfirmed} style={{ width: "90%" }}>
                                            {validation[key].message}
                                        </div>
                                    </Grid>
                                );
                            })}
                    </div>
                    <StyledInput
                        activeLabel
                        label={languageData?.ConfirmNewPassword}
                        value={confirmPassword}
                        className={classes.input}
                        onChange={(value: any) => setConfirmPassword(value)}
                        inputName="password"
                        type="password"
                        required={true}
                        inputClassName={classes.fieldInput}
                    />
                    {responseError && <div className={classes.error}>{responseError}</div>}
                    {error && <div className={classes.error}>{error}</div>}
                    <StyledButton
                        disabled={
                            Boolean(error) ||
                            !Boolean(password) ||
                            !Boolean(oldPassword) ||
                            !Boolean(confirmPassword) ||
                            validation === null ||
                            !validation.upperCaseValidation.valid ||
                            !validation.lowerCaseValidation.valid ||
                            !validation.digitValidation.valid ||
                            !validation.specialCharValidation.valid ||
                            !validation.lengthValidation.valid
                        }
                        variant="contained"
                        type="submit"
                        fullWidth
                        className={classes.button}
                    >
                        {languageData?.ChangePassword.toLocaleUpperCase()}
                    </StyledButton>
                </FormLayout>
            </Card>
        </div>
    );
};

export default ChangePassword;
