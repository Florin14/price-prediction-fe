import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { communicationComplaintActions } from "./communication-complaints-slice";
import {
    CommunicationComplaint,
    AddCommunicationComplaintPayload,
    EditCommunicationComplaintPayload,
    FetchCommunicationComplaintArgs,
    FetchCommunicationComplaintsResponse,
} from "../../../models/generic/communication-complaints/communication-complaints";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchCommunicationComplaints = createAsyncThunk<
    FetchCommunicationComplaintsResponse,
    FetchCommunicationComplaintArgs,
    { rejectValue: ErrorResponse }
>(
    "communicationComplaint/fetchCommunicationComplaints",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/complaint-type`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            // In a real application, this would be an actual API call:
            // const response = await Axios.get<FetchCommunicationComplaintsResponse>(options.url, { params: options.params });
            // const data = response.data;

            // Mock data for development:
            const data: FetchCommunicationComplaintsResponse = {
                items: [
                    {
                        id: 1,
                        name: "Problema iluminat stradal",
                        applicantType: "NATURAL_PERSON",
                    },
                    {
                        id: 2,
                        name: "Problema canalizare",
                        applicantType: "LEGAL_PERSON",
                    },
                    {
                        id: 3,
                        name: "Problema colectare deseuri",
                        applicantType: "NATURAL_PERSON_AND_LEGAL_PERSON",
                    },
                ],
                quantity: 3,
            };

            dispatch(communicationComplaintActions.setItems(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to fetch communication complaints" });
        }
    }
);

export const addCommunicationComplaints = createAsyncThunk<
    CommunicationComplaint,
    { payload: AddCommunicationComplaintPayload },
    { rejectValue: ErrorResponse }
>("communicationComplaint/add", async ({ payload }, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/complaint-type`,
        method: "POST",
        data: payload,
    };
    try {
        // In a real application, this would be an actual API call:
        // const response = await Axios.post<CommunicationComplaint>(options.url, options.data);
        // const data = response.data;

        const newComplaint = { ...payload, id: new Date().getTime() };
        dispatch(communicationComplaintActions.addCommunicationComplaint(newComplaint));
        return newComplaint;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to add communication complaint" });
    }
});

export const editCommunicationComplaints = createAsyncThunk<
    CommunicationComplaint,
    { id: number; payload: EditCommunicationComplaintPayload },
    { rejectValue: ErrorResponse }
>("communicationComplaint/edit", async ({ id, payload }, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/complaint-type/${id}`,
        method: "PUT",
        data: payload,
    };
    try {
        // In a real application, this would be an actual API call:
        // const response = await Axios.put<CommunicationComplaint>(options.url, options.data);
        // const data = response.data;

        const editedComplaint = { ...payload, id };
        dispatch(communicationComplaintActions.editCommunicationComplaint(editedComplaint));
        return editedComplaint;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to edit communication complaint" });
    }
});

export const deleteCommunicationComplaints = createAsyncThunk<number, { id: number }, { rejectValue: ErrorResponse }>(
    "communicationComplaint/delete",
    async ({ id }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/complaint-type/${id}`,
            method: "DELETE",
        };
        try {
            // In a real application, this would be an actual API call:
            // await Axios.delete(options.url);

            dispatch(communicationComplaintActions.deleteCommunicationComplaint(id));
            return id;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to delete communication complaint" });
        }
    }
);
