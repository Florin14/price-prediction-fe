import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
// import type { PredictionResult, Property } from "./prediction-slice";
import { setPrediction, setLoading, setError, deletePrediction } from "./prediction-slice";
import {generateMockFactors, generateMockMarketTrends, generateMockSimilarProperties } from "../../../utils/app-functions";
import { PredictionResult } from "./prediction-slice";
import { Property } from "../property/property-slice";

// This would be replaced with actual API calls to your FastAPI backend
export const predictPropertyPrice = createAsyncThunk<PredictionResult, Property, { rejectValue: { error: boolean; message: string } }>(
    "prediction/predictPropertyPrice",
    async (property, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await Axios.post<PredictionResult>(`/prediction-predict`, property);
            const result = response.data;
            // END MOCK
            dispatch(setPrediction(result));
            dispatch(setLoading(false));
            return result;
        } catch (e: any) {
            dispatch(setError(e.message));
            dispatch(setLoading(false));
            return rejectWithValue({ error: true, message: e.message });
        }
    }
);

// Load predictions from storage
export const loadPredictions = createAsyncThunk<PredictionResult[], void, { rejectValue: { error: boolean; message: string } }>(
    "prediction/loadPredictions",
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            // const response = await Axios.get<PredictionResult[]>(`/predictions`)
            // const predictions = response.data
            // MOCK: Remove below when BE is ready
            await new Promise((resolve) => setTimeout(resolve, 500));
            const predictions: PredictionResult[] = []; // TODO: Replace with BE data
            // END MOCK
            predictions.forEach((prediction: PredictionResult) => {
                dispatch(setPrediction(prediction));
            });
            dispatch(setLoading(false));
            return predictions;
        } catch (e: any) {
            dispatch(setError(e.message));
            dispatch(setLoading(false));
            return rejectWithValue({ error: true, message: e.message });
        }
    }
);
interface AddPredictionPayload {}

export interface ErrorResponse {
    error: boolean;
    message: string;
}

export const addPrediction = createAsyncThunk<boolean, {}, { rejectValue: ErrorResponse }>("listing/import", async ({}, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/prediction`,
        method: "POST",
        data: {},
    };
    try {
        const response = await Axios.post(options.url, options.data);
        const data = response.data;
        return data;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to add section" });
    }
});

export const addPredictionV2 = createAsyncThunk<boolean, {}, { rejectValue: ErrorResponse }>("listing/import", async ({}, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/prediction-v2`,
        method: "POST",
        data: {},
    };
    try {
        const response = await Axios.post(options.url, options.data);
        const data = response.data;
        return data;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to add section" });
    }
});
