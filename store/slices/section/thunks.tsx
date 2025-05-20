import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { setItems, addSection, editSection, deleteSection } from "./section-slice";
import { Section, AddSectionPayload, EditSectionPayload, FetchSectionsArgs, FetchSectionsResponse } from "../../../models/generic/sections/sections";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchSections = createAsyncThunk<FetchSectionsResponse, FetchSectionsArgs, { rejectValue: ErrorResponse }>(
    "section/fetchAll",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, thunkAPI) => {
        const options = {
            url: `/sections`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            const response = await Axios.get<FetchSectionsResponse>(options.url, { params: options.params });
            const data = response.data;

            thunkAPI.dispatch(setItems(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to fetch sections" });
        }
    }
);

export const addSections = createAsyncThunk<Section, { payload: AddSectionPayload }, { rejectValue: ErrorResponse }>(
    "administrator/add",
    async ({ payload }, thunkAPI) => {
        const options = {
            url: `/sections`,
            method: "POST",
            data: payload,
        };
        try {
            const response = await Axios.post<Section>(options.url, options.data);
            const data = response.data;
            thunkAPI.dispatch(addSection(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to add section" });
        }
    }
);

export const editSections = createAsyncThunk<Section, { id: number; payload: EditSectionPayload }, { rejectValue: ErrorResponse }>(
    "administrator/edit",
    async ({ id, payload }, thunkAPI) => {
        const options = {
            url: `/sections/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            const response = await Axios.put<Section>(options.url, options.data);
            const data = response.data;
            thunkAPI.dispatch(editSection(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to edit section" });
        }
    }
);

export const deleteSections = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>("administrator/delete", async ({ id }, thunkAPI) => {
    const options = {
        url: `/sections/${id}`,
        method: "DELETE",
    };
    try {
        await Axios.delete(options.url);
        thunkAPI.dispatch(deleteSection(id));
        return true;
    } catch (e) {
        return thunkAPI.rejectWithValue({ error: true, message: "Failed to delete section" });
    }
});
