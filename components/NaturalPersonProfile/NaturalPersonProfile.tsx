import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Formik } from "formik";

import { RootState } from "../../store";
import { getLegalPerson } from "../../store/slices/natural-person-profile/thunks";

import { NaturalPersonProfile } from "../../models/generic/natural-person-profile/natural-person-profile";
import CitizenInformationComponent from "./CitizenInformation/CitizenInformation";
import DocumentsComponent from "./Documents/Documents";
import StyledButton from "../generic-components/StyledButton";
import DeleteModal from "../modals/DeleteModal/DeleteModal";
import useClasses from "../../utils/useClasses";

import NaturalPersonStyles from "./NaturalPersonProfileStyles";

type NaturalPersonWithoutId = Omit<NaturalPersonProfile, "id">;

interface NaturalPersonProfileComponentProps {
    citizenId?: string;
}

const NaturalPersonProfileComponent: React.FC<NaturalPersonProfileComponentProps> = ({ citizenId }) => {
    const classes = useClasses(NaturalPersonStyles, { name: "NaturalPersonProfileStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);
    const citizen = useSelector((state: RootState) => state.naturalPersonProfile.citizen);
    const dispatch = useDispatch();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (citizenId) {
            dispatch(getLegalPerson({ id: citizenId }) as any);
        }
    }, [citizenId]);

    const handleSubmit = async (values: NaturalPersonWithoutId) => {};

    const validationHandler = (values: NaturalPersonWithoutId) => {
        const errors: any = {};

        if (!values.identityCardExpiryDate) {
            errors.identityCardExpiryDate = languageData?.Validation?.Required;
        }
        return errors;
    };

    return (
        <>
            <Formik
                initialValues={{
                    id: citizen?.id || "",
                    name: citizen?.name || "",
                    phoneNumber: citizen?.phoneNumber || "",
                    email: citizen?.email || "",
                    cnp: citizen?.cnp || "",
                    cnpSeries: citizen?.cnpSeries || "",
                    cnpNumber: citizen?.cnpNumber || "",
                    address: citizen?.address || "",
                    issuedBy: citizen?.issuedBy || "",
                    identityCardExpiryDate: citizen?.identityCardExpiryDate || null,
                    identityCard: citizen?.identityCard || { id: "", name: "", size: 0, type: "", folder: "", date: "" },
                    otherDocuments: citizen?.otherDocuments || [],
                }}
                enableReinitialize
                onSubmit={handleSubmit}
                validate={validationHandler}
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

export default NaturalPersonProfileComponent;
