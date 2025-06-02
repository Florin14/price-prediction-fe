import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { listingActions } from "./listing-slice";
import { Listing, AddListingPayload, EditListingPayload, FetchListingArgs, FetchListingsResponse } from "../../../models/generic/listing/listing";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchListings = createAsyncThunk<FetchListingsResponse, FetchListingArgs, { rejectValue: ErrorResponse }>(
    "listing/fetchListings",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/listing`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            // const response = await Axios.get<FetchListingsResponse>(options.url, { params: options.params });
            // const data = response.data;
            const data: FetchListingsResponse = {
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

            dispatch(listingActions.setItems(data));
            return data;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to fetch listing" });
        }
    }
);

export const addListings = createAsyncThunk<Listing, {}, { rejectValue: ErrorResponse }>("listing/add", async ({}, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/listing`,
        method: "POST",
    };
    try {
        const response = await Axios.post<Listing>(options.url);
        // const data = response.data;
        return {};
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to add listing" });
    }
});

export const importListings = createAsyncThunk<boolean, {}, { rejectValue: ErrorResponse }>("listing/import", async ({}, { dispatch, rejectWithValue }) => {
    const options = {
        url: `/listing-import`,
        method: "POST",
        data: {},
    };
    try {
        const response = await Axios.post<Listing>(options.url, options.data);
        console.log(response);
        // const data = response.data;
        // dispatch(listingActions.addListing({ ...payload, id: new Date().getTime() }));
        // return { ...payload, id: new Date().getTime() };
        return true;
    } catch (e) {
        return rejectWithValue({ error: true, message: "Failed to add listing" });
    }
});

export const fetchImobiliareRoData = createAsyncThunk<boolean, {}, { rejectValue: ErrorResponse }>(
    "listing/import",
    async ({}, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/listing-search`,
            method: "GET",
            
        };
        try {
            const response = await Axios.get(options.url);
            console.log(response);
            // const data = response.data;
            // dispatch(listingActions.addListing({ ...payload, id: new Date().getTime() }));
            // return { ...payload, id: new Date().getTime() };
            return true;
        } catch (e) {
            console.log(e);
            return rejectWithValue({ error: true, message: "Failed to add listing" });
        }
    }
);

export const editListings = createAsyncThunk<Listing, { id: number; payload: EditListingPayload }, { rejectValue: ErrorResponse }>(
    "listing/edit",
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/listing/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            // const response = await Axios.put<Listing>(options.url, options.data);
            // const data = response.data;
            return payload;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to edit listing" });
        }
    }
);

export const deleteListings = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>(
    "listing/delete",
    async ({ id }, { dispatch, rejectWithValue }) => {
        const options = {
            url: `/listing/${id}`,
            method: "DELETE",
        };
        try {
            // await Axios.delete(options.url);
            dispatch(listingActions.deleteListing(id));
            return true;
        } catch (e) {
            return rejectWithValue({ error: true, message: "Failed to delete listing" });
        }
    }
);
