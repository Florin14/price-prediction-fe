import React from "react";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { RootState } from "../../../store";

import useClasses from "../../../utils/useClasses";
import FormTextInput from "../../generic-components/FormFields/FormTextInput";
import FormDateTimePicker from "../../generic-components/FormFields/FormDatePicker";

import CitizenInformationStyles from "./CitizenInformationStyles";

interface CitizenInformationComponentProps {
    citizenData?: any;
}

const CitizenInformationComponent: React.FC<CitizenInformationComponentProps> = ({ citizenData }) => {
    const classes = useClasses(CitizenInformationStyles, { name: "CitizenInformationStyles" });
    const languageData = useSelector((state: RootState) => state.website.languageData);

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title}>{languageData?.NaturalPersonProfileFields?.CitizenInformation}</Typography>
            <FormTextInput label={languageData?.NaturalPersonProfileFields.NameAndSurname || "Nume si prenume"} required name={"name"} />
            <div className={classes.sideBySide}>
                <FormTextInput label={languageData?.NaturalPersonProfileFields.PhoneNumber || "Numar de telefon"} required name={"phoneNumber"} />
                <FormTextInput label={languageData?.NaturalPersonProfileFields.Email || "Email"} disabled={true} required name={"email"} />
            </div>
            <FormTextInput label={languageData?.NaturalPersonProfileFields.CNP || "CNP"} required name={"cnp"} />
            <div className={classes.sideBySide}>
                <FormTextInput label={languageData?.NaturalPersonProfileFields.IDSeries || "Serie CI"} required name={"cnpSeries"} />
                <FormTextInput type="number" label={languageData?.NaturalPersonProfileFields.IDNumber || "Numar CI"} required name={"cnpNumber"} />
            </div>
            <FormTextInput label={languageData?.NaturalPersonProfileFields.Address || "Adresa"} required name={"address"} />
            <FormTextInput label={languageData?.NaturalPersonProfileFields.IssuedBy || "Eliberat de"} required name={"issuedBy"} />
            <FormDateTimePicker
                label={languageData?.NaturalPersonProfileFields.IDExpiryDate || "Valabilitate Carte de identitate"}
                required={true}
                name={"identityCardExpiryDate"}
                datePickerClassName={classes.datePicker}
            />
        </div>
    );
};

export default CitizenInformationComponent;
