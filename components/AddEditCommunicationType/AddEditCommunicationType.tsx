import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";

import { InputLabel } from "@mui/material";

import { RootState } from "../../store";
import { getCommunicationCategoriesResources, getCommunicationType } from "../../store/slices/add-edit-communication-type/thunks";

import FormTextInput from "../generic-components/FormFields/FormTextInput";
import FormSingleSelect from "../generic-components/FormFields/FormSingleSelect";
import FormFileUpload from "../generic-components/FormFields/FormFileUpload";
import { CommunicationType } from "../../models/generic/communication-type/communication-type";
import StyledButton from "../generic-components/StyledButton";
import { APPLICANT_TYPE } from "../../utils/constants";
import useClasses from "../../utils/useClasses";

import AddEditCommunicationTypeStyles from "./AddEditCommunicationTypeStyles";

import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type CommunicationCategoryWithoutId = Omit<CommunicationType, "id">;

interface AddEditCommunicationTypeComponentProps {
    communicationTypeId?: string;
    mode: "add" | "edit";
}

const AddEditCommunicationType: React.FC<AddEditCommunicationTypeComponentProps> = ({ communicationTypeId }) => {
    const classes = useClasses(AddEditCommunicationTypeStyles, { name: "AddEditCommunicationTypeStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const communication = useSelector((state: RootState) => state.communicationType.communicationType);
    const resources = useSelector((state: RootState) => state.communicationType.resources);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(getCommunicationCategoriesResources({}) as any);
    }, []);

    useEffect(() => {
        if (communicationTypeId) {
            dispatch(getCommunicationType({ id: communicationTypeId }) as any);
        }
    }, [communicationTypeId]);

    const goBack = () => {
        const queryParams: any = router?.query;
        if (queryParams?.mode) {
            delete queryParams.mode;
        }
        if (queryParams?.id) {
            delete queryParams.id;
        }
        router.push({
            pathname: router.pathname,
            query: { ...queryParams },
        });
    };

    const handleSubmit = async (values: CommunicationCategoryWithoutId) => {};

    return (
        <Formik
            initialValues={{
                id: communication?.id || "",
                name: communication?.name || "",
                applicantType: communication?.applicantType
                    ? (() => {
                          const applicantType = APPLICANT_TYPE.find((item) => item.value === communication.applicantType);
                          if (applicantType) {
                              return {
                                  ...applicantType,
                                  name: languageData?.ApplicantType?.[applicantType.value as keyof typeof languageData.ApplicantType] || applicantType.value,
                              };
                          }
                          return null;
                      })()
                    : null,
                category: communication?.category || null,
                fillingForm: communication?.fillingForm || null,
                modelFillingForm: communication?.modelFillingForm || null,
                formInstructions: communication?.formInstructions || "",
            }}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ values, resetForm, setFieldValue }) => (
                <Form className={classes.wrapper}>
                    <FormTextInput placeholder={languageData?.forms.inputPlaceholder} label={languageData?.CommunicationTypeName ?? ""} name="name" required />
                    <div className={classes.sideBySideWrapper}>
                        <FormSingleSelect
                            label={languageData?.Applicant ?? ""}
                            name="applicantType"
                            options={APPLICANT_TYPE.map((item) => ({
                                ...item,
                                name: languageData?.ApplicantType?.[item.value as keyof typeof languageData.ApplicantType],
                            }))}
                            placeholder={languageData?.forms.selectPlaceholder}
                            required
                        />
                        <FormSingleSelect
                            label={languageData?.Category ?? ""}
                            name="category"
                            options={resources || []}
                            placeholder={languageData?.forms.selectPlaceholder}
                            required
                        />
                    </div>
                    <div className={classes.sideBySideWrapper}>
                        <div style={{ width: "100%" }}>
                            <InputLabel className={classes.label}>{languageData?.AddCommunicationForm}</InputLabel>
                            <FormFileUpload
                                acceptAll={true}
                                required
                                isViewable={!!values.fillingForm?.id}
                                name="fillingForm"
                                buttonClassName={classes.uploadButton}
                                buttonLabel={languageData?.UploadFile || ""}
                                wrapperClassName={classes.wrapperClassName}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <InputLabel className={classes.label}>{languageData?.AddCommunicationModelForm}</InputLabel>
                            <FormFileUpload
                                acceptAll={true}
                                required
                                isViewable={!!values.fillingForm?.id}
                                name="modelFillingForm"
                                buttonClassName={classes.uploadButton}
                                buttonLabel={languageData?.UploadFile || ""}
                                wrapperClassName={classes.wrapperClassName}
                            />
                        </div>
                    </div>
                    <InputLabel className={classes.labelInstructions}>{languageData?.AddFormInstructions}</InputLabel>
                    <ReactQuill
                        id={`instruction-textarea-component`}
                        className={classes.editor}
                        theme="snow"
                        value={values.formInstructions}
                        onChange={(value) => setFieldValue("formInstructions", value)}
                    />
                    <div className={classes.buttonsWrapper}>
                        <StyledButton id={"cancel-button"} variant="outlined" className={classes.button} onClick={() => goBack()}>
                            {languageData?.Cancel}
                        </StyledButton>
                        <StyledButton id={"save-button"} variant="contained" type="submit" className={classes.button}>
                            {languageData?.Save}
                        </StyledButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddEditCommunicationType;
