import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { ErrorResponse } from "../../../models/generic/generic";
import { CommunicationCategoryResource, CommunicationType } from "../../../models/generic/communication-type/communication-type";
import { setCommunicationType, setResources } from "./add-edit-communication-type-slice";

export const getCommunicationType = createAsyncThunk<CommunicationType, { id: string }, { rejectValue: ErrorResponse }>(
    "getBattery",
    async ({ id }: { id: string }, thunkAPI) => {
        const options = {
            url: `/communications-type/${id}`,
            method: "GET",
        };
        try {
            // const response = await Axios.get<NaturalPersonProfile>(options.url);
            // const data = response.data;

            const data: CommunicationType = {
                id: 1,
                name: "John Doe",
                applicantType: "NATURAL_PERSON",
                category: {
                    id: 1,
                    name: "Cerere adeverinta",
                },
                fillingForm: {
                    id: "1",
                    name: "filling_form.pdf",
                    folder: "filling_forms",
                    date: "2023-10-01",
                },
                modelFillingForm: {
                    id: "2",
                    name: "model_filling_form.pdf",
                    folder: "model_filling_forms",
                    date: "2023-10-01",
                },
                formInstructions: "<p>sadsadas</p><p><br></p><ol><li>sdasdas</li></ol><p><br></p><p>afbfab</p><p><br></p><p><br></p><ul><li>ssss</li></ul>",
            };

            thunkAPI.dispatch(setCommunicationType(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
        }
    }
);

export const getCommunicationCategoriesResources = createAsyncThunk<CommunicationCategoryResource[], {}, { rejectValue: ErrorResponse }>(
    "getBattery",
    async ({}, thunkAPI) => {
        const options = {
            url: `/communication-categories-resources`,
            method: "GET",
        };
        try {
            // const response = await Axios.get<NaturalPersonProfile>(options.url);
            // const data = response.data;

            const data: CommunicationCategoryResource[] = [
                {
                    id: 1,
                    name: "Cerere adeverinta",
                },
                {
                    id: 2,
                    name: "Cerere inregistrare",
                },
                {
                    id: 3,
                    name: "Declaratie privind inregistrarea/modificarea datelor in registru agricol persoanelor fizice (PF), persoane juridice (PJ)",
                },
            ];

            thunkAPI.dispatch(setResources(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
        }
    }
);
