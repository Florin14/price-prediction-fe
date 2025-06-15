import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { ErrorResponse } from "../../../models/generic/generic";
import { PriceHistoryResponse, setHistories } from "./price-history-slice";

interface PriceHistoryListResponse {
    items: PriceHistoryResponse[];
}

export const getPriceHistories = createAsyncThunk<PriceHistoryListResponse, { id: number }, { rejectValue: ErrorResponse }>(
    "getClient",
    async ({ id }: { id: number }, thunkAPI) => {
        const options = {
            url: `/price-history`,
            method: "GET",
            params: { user_id: id },
        };
        try {
            const response = await Axios.get<PriceHistoryListResponse>(options.url, { params: options.params });
            const data = response.data;

            thunkAPI.dispatch(setHistories(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
        }
    }
);
