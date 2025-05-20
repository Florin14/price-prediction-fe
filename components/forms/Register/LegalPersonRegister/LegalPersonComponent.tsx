import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import Link from "next/link";

import { AppDispatch, RootState } from "../../../../store";
import { registerLegalPerson } from "../../../../store/slices/register/thunks";

import useClasses from "../../../../utils/useClasses";
import FormTextInput from "../../../generic-components/FormFields/FormTextInput";
import FormFileUpload from "../../../generic-components/FormFields/FormFileUpload";
import StyledButton from "../../../generic-components/StyledButton";
import { LegalPersonRegisterInterface } from "../../../../interfaces/LegalPersonRegisterInterfaces";

import LegalPersonStyles from "./LegalPersonStyles";

const LegalPersonComponent = () => {
    const classes = useClasses(LegalPersonStyles, { name: "LegalPersonStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string>("");

    const validationHandler = (values: LegalPersonRegisterInterface) => {
        const errors: Partial<LegalPersonRegisterInterface> = {};

        if (!values.taxCertificate) {
            errors.taxCertificate = languageData?.forms.register.legalPerson.taxCertificateIsRequired;
        }

        return errors;
    };

    return (
        <Formik<LegalPersonRegisterInterface>
            initialValues={{
                companyName: "",
                representativeName: "",
                phoneNumber: "",
                email: "",
                taxCertificate: null,
            }}
            enableReinitialize
            validate={validationHandler}
            onSubmit={(values) => {
                dispatch(registerLegalPerson(values)).then((response) => {
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
            {({ resetForm: formikResetForm }) => (
                <Form className={classes.formContainer} data-testid="natural-person-form">
                    <FormTextInput
                        placeholder={languageData?.forms.register.placeholder}
                        name="companyName"
                        required
                        label={languageData?.forms.register.legalPerson.companyName ?? "Company Name"}
                        borderError={globalError === "client_name"}
                    />
                    <FormTextInput
                        placeholder={languageData?.forms.register.placeholder}
                        name="representativeName"
                        required
                        label={languageData?.forms.register.legalPerson.representativeName ?? "Representative Name"}
                        borderError={globalError === "representative_name"}
                    />
                    <FormTextInput
                        placeholder={languageData?.forms.register.placeholder}
                        name="phoneNumber"
                        required
                        label={languageData?.forms.register.legalPerson.phoneNumber ?? "Phone Number"}
                        borderError={globalError === "phone_number"}
                    />
                    <FormTextInput
                        placeholder={languageData?.forms.register.placeholder}
                        type="email"
                        name="email"
                        required
                        label={languageData?.forms.register.legalPerson.email ?? "Email"}
                        borderError={globalError === "email"}
                    />

                    <FormFileUpload
                        accept=".pdf, .jpg, .jpeg, .png"
                        required
                        isViewable={false}
                        name="taxCertificate"
                        buttonClassName={classes.uploadButton}
                        buttonLabel={languageData?.forms.register.legalPerson.uploadTaxCertificate || "Upload Tax Certificate"}
                    />

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

export default LegalPersonComponent;
