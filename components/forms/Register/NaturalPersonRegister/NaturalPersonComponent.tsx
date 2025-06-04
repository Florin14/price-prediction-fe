import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import Link from "next/link";
import { AppDispatch, RootState } from "../../../../store";
import { registerNaturalPerson } from "../../../../store/slices/register/thunks";

import useClasses from "../../../../utils/useClasses";
import FormTextInput from "../../../generic-components/FormFields/FormTextInput";
import FormFileUpload from "../../../generic-components/FormFields/FormFileUpload";
import StyledButton from "../../../generic-components/StyledButton";

import { NaturalPersonRegisterInterface } from "../../../../interfaces/NaturalPersonRegisterInterfaces";
import NaturalPersonStyles from "./NaturalPersonStyles";

const NaturalPersonComponent = () => {
    const classes = useClasses(NaturalPersonStyles, { name: "NaturalPersonStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch: AppDispatch = useDispatch();
    const [globalError, setGlobalError] = useState<string>("");
    const router = useRouter();

    const validationHandler = (values: NaturalPersonRegisterInterface) => {
        const errors: Partial<NaturalPersonRegisterInterface> = {};

        return errors;
    };

    return (
        <Formik<NaturalPersonRegisterInterface>
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

                    <div className={classes.forgotPassword}>
                        <Link href="/login">{languageData?.BackToAuthentication}</Link>
                    </div>
                    <StyledButton id="create-account-button" color="primary" variant="contained" type="submit" className={classes.button}>
                        {languageData?.CreateAccount}
                    </StyledButton>
                </Form>
            )}
        </Formik>
    );
};

export default NaturalPersonComponent;
