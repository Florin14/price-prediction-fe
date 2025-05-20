import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { setItems, addAdministrator, editAdministrator, deleteAdministrator } from "./administrator-slice";
import {
    Administrator,
    AddAdministratorPayload,
    EditAdministratorPayload,
    FetchAdministratorsResponse,
    FetchAdministratorsArgs,
} from "../../../models/generic/administrators/administrators";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchAdministrators = createAsyncThunk<FetchAdministratorsResponse, FetchAdministratorsArgs, { rejectValue: ErrorResponse }>(
    "administrator/fetchAll",
    async ({ filter, limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, thunkAPI) => {
        const options = {
            url: `/admins`,
            method: "GET",
            params: { filter, limit, offset, sortBy, sortType },
        };
        try {
            const response = await Axios.get<FetchAdministratorsResponse>(options.url, { params: options.params });
            const data = response.data;
            thunkAPI.dispatch(setItems(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to fetch administrators" });
        }
    }
);

export const addAdministrators = createAsyncThunk<Administrator, { payload: AddAdministratorPayload }, { rejectValue: ErrorResponse }>(
    "administrator/add",
    async ({ payload }, thunkAPI) => {
        const options = {
            url: `/admins`,
            method: "POST",
            data: payload,
        };
        try {
            const response = await Axios.post<Administrator>(options.url, options.data);
            const data = response.data;
            thunkAPI.dispatch(addAdministrator(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to add administrator" });
        }
    }
);

export const editAdministrators = createAsyncThunk<Administrator, { id: number; payload: EditAdministratorPayload }, { rejectValue: ErrorResponse }>(
    "administrator/edit",
    async ({ id, payload }, thunkAPI) => {
        const options = {
            url: `/admins/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            const response = await Axios.put<Administrator>(options.url, options.data);
            const data = response.data;
            thunkAPI.dispatch(editAdministrator(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to edit administrator" });
        }
    }
);

export const deleteAdministrators = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>(
    "administrator/delete",
    async ({ id }, thunkAPI) => {
        const options = {
            url: `/admins/${id}`,
            method: "DELETE",
        };
        try {
            await Axios.delete(options.url);
            thunkAPI.dispatch(deleteAdministrator(id));
            return true;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to delete administrator" });
        }
    }
);
