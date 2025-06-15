import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { AppDispatch, RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useStyles, StyleClasses } from "./RegisterComponentStyles";
import { RegisterInterface } from "../../../interfaces/RegisterInterfaces";
import { registerNaturalPerson } from "../../../store/slices/register/thunks";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";
import { useRouter } from "next/router";
import StyledButton from "../../generic-components/StyledButton";

export interface LegalPersonFormData {
    companyName: string | null;
    email: string | null;
    phoneNumber: string | null;
    representativeName: string | null;
    taxCertificate: File | null;
}

const RegisterComponent: React.FC = () => {
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const classes = useClasses(useStyles, { name: "RegisterComponentStyles" }) as StyleClasses;
    const dispatch: AppDispatch = useDispatch();

    const [globalError, setGlobalError] = useState<string>("");
    const router = useRouter();

    const validationHandler = (values: RegisterInterface) => {
        const errors: Partial<RegisterInterface> = {};

        return errors;
    };
    return (
        <div className={classes.container} data-testid="register-form-container">
            <div className={classes.wrapper}>
                <div className={classes.leftSection} data-testid="register-form-left-section">
                    <div className={classes.titlesSection} data-testid="register-form-titles-section">
                        <Typography className={classes.title} data-testid="register-form-title">
                            {languageData?.PredictRealEstatePrices || "Welcome!"}
                        </Typography>
                    </div>
                    <div className={classes.formCard} data-testid="register-form-card">
                        <Typography className={classes.loginMessage} data-testid="register-form-message">
                            {languageData?.CreateAccount || "Creare cont"}
                        </Typography>

                        <Formik<RegisterInterface>
                            initialValues={{
                                name: "",
                                email: "",
                                phoneNumber: "",
                                password: "",
                                confirmPassword: "",
                            }}
                            enableReinitialize
                            validate={validationHandler}
                            onSubmit={(values) => {
                                dispatch(registerNaturalPerson(values)).then((response) => {
                                    const payload = response.payload;

                                    if (!payload.error) {
                                        setGlobalError("");
                                        router.push("/waiting-validation"); // Redirect to waiting validation page on successful registration
                                    } else if (payload?.fields && payload?.fields?.length > 0) {
                                        setGlobalError(payload?.fields[0]); // Set global error message if there's an error
                                    }
                                });
                            }}
                        >
                            {({ values, resetForm: formikResetForm }) => (
                                <Form className={classes.formContainer} data-testid="natural-person-form">
                                    <FormTextInput
                                        placeholder={languageData?.forms.register.placeholder}
                                        name="name"
                                        required
                                        label={languageData?.forms.register.naturalPerson.name ?? "Full Name"}
                                        borderError={globalError === "name"}
                                    />
                                    <FormTextInput
                                        placeholder={languageData?.forms.register.placeholder}
                                        name="phoneNumber"
                                        required
                                        label={languageData?.forms.register.naturalPerson.phoneNumber ?? "Phone Number"}
                                        borderError={globalError === "phone_number"}
                                    />
                                    <FormTextInput
                                        type="email"
                                        placeholder={languageData?.forms.register.placeholder}
                                        name="email"
                                        required
                                        label={languageData?.forms.register.naturalPerson.email ?? "Email"}
                                        borderError={globalError === "email"}
                                    />
                                    <div style={{ display: "flex", gap: 5 }}>
                                        <FormTextInput
                                            type="password"
                                            placeholder={languageData?.forms.register.placeholder}
                                            name="password"
                                            required
                                            label={languageData?.forms.register.naturalPerson.password ?? "Parola"}
                                        />
                                        {values?.password && values?.password.length > 0 && (
                                            <FormTextInput
                                                type="password"
                                                placeholder={languageData?.forms.register.placeholder}
                                                name="confirmPassword"
                                                required
                                                label={languageData?.forms.register.naturalPerson.confirmPassword ?? "Confirma parola"}
                                            />
                                        )}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
                                        <div className={classes.noAccount}>
                                            <Link href="/home">{languageData?.ContinueWithoutAccount}</Link>
                                        </div>
                                        <div className={classes.forgotPassword}>
                                            <Link href="/login">{languageData?.BackToAuthentication}</Link>
                                        </div>
                                    </div>

                                    <StyledButton id="create-account-button" color="primary" variant="contained" type="submit" className={classes.button}>
                                        {languageData?.CreateAccount}
                                    </StyledButton>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className={classes.rightSection} data-testid="register-form-right-section">
                    <div className={classes.rightImage} data-testid="register-form-right-image-section"></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
