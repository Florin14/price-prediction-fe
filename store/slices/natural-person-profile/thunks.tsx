import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { setProfile } from "./natural-person-profile-slice";
import { NaturalPersonProfile } from "../../../models/generic/natural-person-profile/natural-person-profile";
import { ErrorResponse } from "../../../models/generic/generic";

export const getLegalPerson = createAsyncThunk<NaturalPersonProfile, { id: string }, { rejectValue: ErrorResponse }>(
    "getBattery",
    async ({ id }: { id: string }, thunkAPI) => {
        const options = {
            url: `/natural-persons/${id}`,
            method: "GET",
        };
        try {
            // const response = await Axios.get<NaturalPersonProfile>(options.url);
            // const data = response.data;

            const data: NaturalPersonProfile = {
                id: 1,
                name: "John Doe",
                phoneNumber: "1234567890",
                email: "johndoe@gmail.com",
                cnp: null,
                cnpSeries: null,
                cnpNumber: null,
                address: null,
                issuedBy: null,
                identityCardExpiryDate: null,
                identityCard: {
                    id: "1",
                    name: "identity_card.jpg",
                    folder: "identity_cards",
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
