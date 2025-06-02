import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

import { RootState } from "../../../store";
import useClasses from "../../../utils/useClasses";
import NaturalPersonComponent from "./NaturalPersonRegister/NaturalPersonComponent";

import { useStyles, StyleClasses } from "./RegisterComponentStyles";
import LegalPersonComponent from "./LegalPersonRegister/LegalPersonComponent";

export interface LegalPersonFormData {
    companyName: string | null;
    email: string | null;
    phoneNumber: string | null;
    representativeName: string | null;
    taxCertificate: File | null;
}

const RegisterComponent: React.FC = () => {
    const [personType, setPersonType] = useState<string>("natural"); // natural or legal
    const languageData = useSelector((state: RootState) => state.website.languageData);

    const classes = useClasses(useStyles, { name: "RegisterComponentStyles" }) as StyleClasses;

    const handlePersonTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPersonType(event.target.value);
    };

    return (
        <div className={classes.container} data-testid="register-form-container">
            <div className={classes.wrapper}>
                <div className={classes.leftSection} data-testid="register-form-left-section">
                    <div className={classes.titlesSection} data-testid="register-form-titles-section">
                        <Typography className={classes.title} data-testid="register-form-title">
                            {languageData?.PredictRealEstatePrices || "Predict Real Estate Prices"}
                        </Typography>
                    </div>
                    <div className={classes.formCard} data-testid="register-form-card">
                        <Typography className={classes.loginMessage} data-testid="register-form-message">
                            {languageData?.CreateAccount || "Creare cont"}
                        </Typography>
                        <FormControl component="fieldset" className={classes.personTypeSelector}>
                            <RadioGroup
                                id="person-type"
                                aria-label="person-type"
                                name="person-type"
                                value={personType}
                                onChange={handlePersonTypeChange}
                                className={classes.radioGroup}
                            >
                                <div className={classes.radioOption}>
                                    <FormControlLabel
                                        id="natural"
                                        value="natural"
                                        control={<Radio className={classes.radio} />}
                                        label={languageData?.NaturalPerson || "Persoana fizica"}
                                    />
                                </div>
                                <div className={classes.radioOption}>
                                    <FormControlLabel
                                        id="legal"
                                        value="legal"
                                        control={<Radio className={classes.radio} />}
                                        label={languageData?.LegalPerson || "Persoana juridica"}
                                    />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        {personType === "natural" ? <NaturalPersonComponent /> : <LegalPersonComponent />}
                        <div className={classes.divider}></div>
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
