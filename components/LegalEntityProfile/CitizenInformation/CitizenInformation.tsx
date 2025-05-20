import React from "react";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";

import CitizenInformationStyles from "./CitizenInformationStyles";

interface CitizenInformationComponentProps {
    citizenData?: any;
}

const CitizenInformationComponent: React.FC<CitizenInformationComponentProps> = ({ citizenData }) => {
    const classes = useClasses(CitizenInformationStyles, { name: "CitizenInformationStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title}>{languageData?.LegalEntityProfileFields?.CompanyInformation}</Typography>
            <FormTextInput label={languageData?.LegalEntityProfileFields.CompanyName || "Nume companie"} required name={"companyName"} />
            <div className={classes.sideBySide}>
                <FormTextInput label={languageData?.LegalEntityProfileFields.CUI || "CUI"} required name={"cui"} />
                <FormTextInput
                    label={languageData?.LegalEntityProfileFields.RegisterNumber || "Nr. Ordine Registru Comertului"}
                    required
                    name={"registerNumber"}
                />
            </div>
            <FormTextInput label={languageData?.LegalEntityProfileFields.SocialHQ || "Sediu Social"} required name={"address"} />
            <FormTextInput label={languageData?.LegalEntityProfileFields.RepresentativeName || "Nume reprezentant legal"} required name={"representativeName"} />
            <div className={classes.sideBySide}>
                <FormTextInput label={languageData?.LegalEntityProfileFields.PhoneNumber || "Nr. de telefon reprezentant legal"} required name={"phoneNumber"} />
                <FormTextInput label={languageData?.LegalEntityProfileFields.Email || "Email"} disabled={true} required name={"email"} />
            </div>
        </div>
    );
};

export default CitizenInformationComponent;
