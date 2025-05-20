import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { inputChannelActions } from "./input-channels-slice";
import {
    InputChannel,
    AddInputChannelPayload,
    EditInputChannelPayload,
    FetchInputChannelArgs,
    FetchInputChannelsResponse,
} from "../../../models/generic/input-channels/input-channels";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchInputChannels = createAsyncThunk<FetchInputChannelsResponse, FetchInputChannelArgs, { rejectValue: ErrorResponse }>(
    "inputChannel/fetchInputChannels",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/input-channel`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            const response = await Axios.get<FetchInputChannelsResponse>(options.url, { params: options.params });
            const data = response.data;

            dispatch(inputChannelActions.setItems(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to fetch input channels" });
        }
    }
);

export const addInputChannels = createAsyncThunk<InputChannel, { payload: AddInputChannelPayload }, { rejectValue: ErrorResponse }>(
    "inputChannel/add",
    async ({ payload }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/input-channel`,
            method: "POST",
            data: payload,
        };
        try {
            const response = await Axios.post<InputChannel>(options.url, options.data);
            const data = response.data;
            dispatch(inputChannelActions.addInputChannel(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to add input channel" });
        }
    }
);

export const editInputChannels = createAsyncThunk<InputChannel, { id: number; payload: EditInputChannelPayload }, { rejectValue: ErrorResponse }>(
    "inputChannel/edit",
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/input-channel/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            const response = await Axios.put<InputChannel>(options.url, options.data);
            const data = response.data;
            dispatch(inputChannelActions.editInputChannel(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to edit input channel" });
        }
    }
);

export const deleteInputChannels = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>(
    "inputChannel/delete",
    async ({ id }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/input-channel/${id}`,
            method: "DELETE",
        };
        try {
            await Axios.delete(options.url);
            dispatch(inputChannelActions.deleteInputChannel(id));
            return true;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to delete input channel" });
        }
    }
);
