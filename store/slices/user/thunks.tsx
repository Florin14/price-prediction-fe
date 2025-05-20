import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { setItems, addUser, editUser, deleteUser } from "./user-slice";
import { User, AddUserPayload, EditUserPayload, FetchUsersArgs, FetchUsersResponse } from "../../../models/generic/users/users";
import { ErrorResponse } from "../../../models/generic/generic";

export const fetchUsers = createAsyncThunk<FetchUsersResponse, FetchUsersArgs, { rejectValue: ErrorResponse }>(
    "user/fetchAll",
    async ({ limit = 25, offset = 1, sortBy = "name", sortType = "asc" }, thunkAPI) => {
        const options = {
            url: `/users`,
            method: "GET",
            params: { limit, offset, sortBy, sortType },
        };
        try {
            // const response = await Axios.get<FetchUsersResponse>(options.url, { params: options.params });
            // const data = response.data;

            const data: FetchUsersResponse = {
                items: [
                    {
                        id: 1,
                        name: "admin",
                        email: "admin@gmail.com",
                        phoneNumber: "123-456-7890",
                        isActive: false,
                        section: {
                            id: 1,
                            name: "Registratura",
                        },
                    },
                ],
                quantity: 2,
            };

            thunkAPI.dispatch(setItems(data));
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to fetch sections" });
        }
    }
);

export const addUsers = createAsyncThunk<User, { payload: AddUserPayload }, { rejectValue: ErrorResponse }>("user/add", async ({ payload }, thunkAPI) => {
    const options = {
        url: `/users`,
        method: "POST",
        data: payload,
    };
    try {
        // const response = await Axios.post<User>(options.url, options.data);
        // const data = response.data;
        thunkAPI.dispatch(addUser({ ...payload, id: new Date().getTime() }));
        return { ...payload, id: new Date().getTime() };
    } catch (e) {
        return thunkAPI.rejectWithValue({ error: true, message: "Failed to add section" });
    }
});

export const editUsers = createAsyncThunk<User, { id: number; payload: EditUserPayload }, { rejectValue: ErrorResponse }>(
    "user/edit",
    async ({ id, payload }, thunkAPI) => {
        const options = {
            url: `/users/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            // const response = await Axios.put<User>(options.url, options.data);
            // const data = response.data;
            thunkAPI.dispatch(editUser(payload));
            return payload;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to edit section" });
        }
    }
);

export const deleteUsers = createAsyncThunk<boolean, { id: number }, { rejectValue: ErrorResponse }>("user/delete", async ({ id }, thunkAPI) => {
    const options = {
        url: `/users/${id}`,
        method: "DELETE",
    };
    try {
        // await Axios.delete(options.url);
        thunkAPI.dispatch(deleteUser(id));
        return true;
    } catch (e) {
        return thunkAPI.rejectWithValue({ error: true, message: "Failed to delete section" });
    }
});
