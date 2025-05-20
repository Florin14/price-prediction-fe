import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LegalPersonRegisterInterface } from "../../../interfaces/LegalPersonRegisterInterfaces";
import { NaturalPersonRegisterInterface } from "../../../interfaces/NaturalPersonRegisterInterfaces";

export const registerLegalPerson = createAsyncThunk(
    "register/legalPerson",
    async ({ companyName, representativeName, phoneNumber, email, taxCertificate }: LegalPersonRegisterInterface, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("companyName", companyName);
            formData.append("representativeName", representativeName);
            formData.append("phoneNumber", phoneNumber);
            formData.append("email", email);
            if (taxCertificate) {
                formData.append("file", taxCertificate);
            }

            const response = await axios.post("/legal-entities/register", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ error: true, message: "SomethingWentWrong", code: error?.response?.data?.code, fields: error?.response?.data?.fields });
        }
    }
);

export const registerNaturalPerson = createAsyncThunk(
    "register/naturalPerson",
    async ({ name, phoneNumber, email, identityCard }: NaturalPersonRegisterInterface, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phoneNumber", phoneNumber);
            formData.append("email", email);
            if (identityCard) {
                formData.append("file", identityCard);
            }

            const response = await axios.post("/natural-persons/register", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ error: true, message: "SomethingWentWrong", code: error?.response?.data?.code, fields: error?.response?.data?.fields });
        }
    }
);
