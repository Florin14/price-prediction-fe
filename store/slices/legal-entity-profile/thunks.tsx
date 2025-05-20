import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { setProfile } from "./legal-entity-profile-slice";

import { ErrorResponse } from "../../../models/generic/generic";
import { LegalEntityProfile } from "../../../models/generic/legal-entity-profile/legal-entity-profile";

export const getLegalPerson = createAsyncThunk<LegalEntityProfile, { id: string }, { rejectValue: ErrorResponse }>(
    "getBattery",
    async ({ id }: { id: string }, thunkAPI) => {
        const options = {
            url: `/natural-persons/${id}`,
            method: "GET",
        };
        try {
            // const response = await Axios.get<NaturalPersonProfile>(options.url);
            // const data = response.data;

            const data: LegalEntityProfile = {
                id: 1,
                companyName: "Company Name",
                representativeName: "John Doe",
                registerNumber: "123456789",
                phoneNumber: "1234567890",
                email: "johndoe@gmail.com",
                cui: "34536456453",
                address: "123 Main St, City, Country",
                taxCertificate: {
                    id: "1",
                    name: "copie certificat fiscal.jpg",
                    folder: "tax_certificates",
                    date: "2023-10-01",
                },
                otherDocuments: [
                    {
                        id: "2",
                        name: "passport.jpg",
                        folder: "passports",
                        date: "2023-10-01",
                    },
                ],
            };

            thunkAPI.dispatch(setProfile(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
        }
    }
);
