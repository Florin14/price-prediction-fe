import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { LabelActions } from "./labels-slice";
import {
    Label,
    AddLabelPayload,
    EditLabelPayload,
    FetchLabelArgs,
    FetchLabelsResponse,
} from "../../../models/generic/labels/labels";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchLabels = createAsyncThunk<
    FetchLabelsResponse,
    FetchLabelArgs,
    { rejectValue: ErrorResponse }
>(
    "Label/fetchLabels",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/labels`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            // const response = await Axios.get<FetchLabelsResponse>(options.url, { params: options.params });
            // const data = response.data;
            const data: FetchLabelsResponse = {
                items: [
                    {
                        id: 1,
                        name: "Legea 434",
                    },
                    {
                        id: 2,
                        name: "Legea 347",
                    },
                    {
                        id: 3,
                        name: "Eticheta 1",
                    },
                    {
                        id: 4,
                        name: "Eticheta 2",
                    },
                ],
                quantity: 5,
            };

            dispatch(LabelActions.setItems(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to fetch labels" });
        }
    }
);

export const addLabels = createAsyncThunk<Label, { payload: AddLabelPayload }, { rejectValue: ErrorResponse }>(
    "Label/add",
    async ({ payload }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/labels`,
            method: "POST",
            data: payload,
        };
        try {
            // const response = await Axios.post<Label>(options.url, options.data);
            // const data = response.data;
            dispatch(LabelActions.addLabel({ ...payload, id: new Date().getTime() }));
            return { ...payload, id: new Date().getTime() };
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to add label" });
        }
    }
);

export const editLabels = createAsyncThunk<
    Label,
    { id: number; payload: EditLabelPayload },
    { rejectValue: ErrorResponse }
>("Label/edit", async ({ id, payload }, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/labels/${id}`,
        method: "PUT",
        data: payload,
    };
    try {
        // const response = await Axios.put<Label>(options.url, options.data);
        // const data = response.data;
        dispatch(LabelActions.editLabel(payload));
        return payload;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to edit label" });
    }
});

export const deleteLabels = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>(
    "Label/delete",
    async ({ id }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/labels/${id}`,
            method: "DELETE",
        };
        try {
            // await Axios.delete(options.url);
            dispatch(LabelActions.deleteLabel(id));
            return true;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to delete label" });
        }
    }
);
