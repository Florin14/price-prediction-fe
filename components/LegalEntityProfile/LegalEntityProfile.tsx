import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Formik } from "formik";

import { RootState } from "../../store";
import { getLegalPerson } from "../../store/slices/legal-entity-profile/thunks";

import { LegalEntityProfile } from "../../models/generic/legal-entity-profile/legal-entity-profile";
import CitizenInformationComponent from "./CitizenInformation/CitizenInformation";
import DocumentsComponent from "./Documents/Documents";
import StyledButton from "../generic-components/StyledButton";
import DeleteModal from "../modals/DeleteModal/DeleteModal";
import useClasses from "../../utils/useClasses";

import LegalEntityStyles from "./LegalEntityProfileStyles";

type LegalEntityWithoutId = Omit<LegalEntityProfile, "id">;

interface LegalEntityProfileComponentProps {
    citizenId?: string;
}

const LegalEntityProfileComponent: React.FC<LegalEntityProfileComponentProps> = ({ citizenId }) => {
    const classes = useClasses(LegalEntityStyles, { name: "LegalEntityProfileStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const citizen = useSelector((state: RootState) => state.legalEntityProfile.citizen);
    const dispatch = useDispatch();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (citizenId) {
            dispatch(getLegalPerson({ id: citizenId }) as any);
        }
    }, [citizenId]);

    const handleSubmit = async (values: LegalEntityWithoutId) => {};

    return (
        <>
            <Formik
                initialValues={{
                    id: citizen?.id || "",
                    companyName: citizen?.companyName || "",
                    phoneNumber: citizen?.phoneNumber || "",
                    email: citizen?.email || "",
                    cui: citizen?.cui || "",
                    registerNumber: citizen?.registerNumber || "",
                    representativeName: citizen?.representativeName || "",
                    address: citizen?.address || "",
                    taxCertificate: citizen?.taxCertificate || { id: "", name: "", size: 0, type: "", folder: "", date: "" },
                    otherDocuments: citizen?.otherDocuments || [],
                }}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ values, resetForm, setFieldValue }) => (
                    <Form className={classes.wrapper}>
                        <CitizenInformationComponent citizenData={values} />
                        <div className={classes.rightSideWrapper}>
                            <DocumentsComponent citizenData={values} setFieldValue={setFieldValue} />
                            <div className={classes.buttonsWrapper}>
                                <StyledButton
                                    id={"delete-client-button"}
                                    variant="contained"
                                    color="error"
                                    className={classes.button}
                                    onClick={() => {
                                        setIsDeleteModalOpen(true);
                                    }}
                                >
                                    {languageData?.DeleteAccount}
                                </StyledButton>
                                <StyledButton id={"validate-account-button"} variant="contained" type="submit" className={classes.button}>
                                    {languageData?.ValidateAccount}
                                </StyledButton>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <DeleteModal
                title={languageData?.DeleteAccount || ""}
                message={languageData?.DeleteAccountMessage || ""}
                isOpen={isDeleteModalOpen}
                id="delete-client-modal"
                onClose={() => {
                    setIsDeleteModalOpen(false);
                }}
                onDelete={() => {}}
            />
        </>
    );
};

export default LegalEntityProfileComponent;
