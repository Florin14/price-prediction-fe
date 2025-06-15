import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { setProfile } from "./client";
import { ClientProfile, EditClientPayload } from "../../../models/generic/client/client";
import { ErrorResponse } from "../../../models/generic/generic";

export const getClient = createAsyncThunk<ClientProfile, { id: number }, { rejectValue: ErrorResponse }>(
    "getClient",
    async ({ id }: { id: number }, thunkAPI) => {
        const options = {
            url: `/clients/${id}`,
            method: "GET",
        };
        try {
            const response = await Axios.get<ClientProfile>(options.url);
            const data = response.data;

            thunkAPI.dispatch(setProfile(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
        }
    }
);

export const updateClient = createAsyncThunk<ClientProfile, { id: number; payload: EditClientPayload }, { rejectValue: ErrorResponse }>(
    "updateClient",
    async ({ id, payload }, thunkAPI) => {
        const options = {
            url: `/clients/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            const response = await Axios.put<ClientProfile>(options.url, options.data);
            const data = response.data;

            thunkAPI.dispatch(setProfile(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
        }
    }
);

