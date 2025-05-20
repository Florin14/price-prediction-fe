import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { communicationCategoryActions } from "./communication-categories-slice";
import {
    CommunicationCategory,
    AddCommunicationCategoryPayload,
    EditCommunicationCategoryPayload,
    FetchCommunicationCategoryArgs,
    FetchCommunicationCategoriesResponse,
} from "../../../models/generic/communication-categories/communication-categories";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchCommunicationCategories = createAsyncThunk<
    FetchCommunicationCategoriesResponse,
    FetchCommunicationCategoryArgs,
    { rejectValue: ErrorResponse }
>(
    "communicationCategory/fetchCommunicationCategories",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/category`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            const response = await Axios.get<FetchCommunicationCategoriesResponse>(options.url, { params: options.params });
            const data = response.data;

            dispatch(communicationCategoryActions.setItems(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to fetch communication categories" });
        }
    }
);

export const addCommunicationCategories = createAsyncThunk<CommunicationCategory, { payload: AddCommunicationCategoryPayload }, { rejectValue: ErrorResponse }>(
    "communicationCategory/add",
    async ({ payload }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/category`,
            method: "POST",
            data: payload,
        };
        try {
            const response = await Axios.post<CommunicationCategory>(options.url, options.data);
            const data = response.data;
            dispatch(communicationCategoryActions.addCommunicationCategory(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to add communication category" });
        }
    }
);

export const editCommunicationCategories = createAsyncThunk<
    CommunicationCategory,
    { id: number; payload: EditCommunicationCategoryPayload },
    { rejectValue: ErrorResponse }
>("communicationCategory/edit", async ({ id, payload }, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/category/${id}`,
        method: "PUT",
        data: payload,
    };
    try {
        const response = await Axios.put<CommunicationCategory>(options.url, options.data);
        const data = response.data;
        dispatch(communicationCategoryActions.editCommunicationCategory(data));
        return data;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to edit communication category" });
    }
});

export const deleteCommunicationCategories = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>(
    "communicationCategory/delete",
    async ({ id }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/category/${id}`,
            method: "DELETE",
        };
        try {
            await Axios.delete(options.url);
            dispatch(communicationCategoryActions.deleteCommunicationCategory(id));
            return true;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to delete communication category" });
        }
    }
);
