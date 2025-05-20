import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { setItems, editNaturalPerson } from "./natural-persons";
import { ErrorResponse } from "../../../../models/generic/generic";
import { NaturalPerson, FetchNaturalPersonsArgs, FetchNaturalPersonsResponse, EditNaturalPersonPayload } from "../../../../models/generic/natural-persons/natural-persons";

export const fetchNaturalPersons = createAsyncThunk<FetchNaturalPersonsResponse, FetchNaturalPersonsArgs, { rejectValue: ErrorResponse }>(
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

            const data: FetchNaturalPersonsResponse = {
                items: [
                    {
                        id: 1,
                        name: "admindasfffffffffffffffffffffffffffffffffffffffadsassssssssssssssssfdsasfdasfdasssssssssssssssssssssssssssssssssssssssdsfafdsaaaaaaaaaaaaaaaaaa",
                        email: "admin@gmail.com",
                        phoneNumber: "123-456-7890",
                        copyId: "copiebuletin.jpg",
                        validationType: "Cont nou"
                    }
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

export const editNaturalPersons = createAsyncThunk<NaturalPerson, { id: number; payload: EditNaturalPersonPayload }, { rejectValue: ErrorResponse }>(
    "user/edit",
    async ({ id, payload }, thunkAPI) => {
        const options = {
            url: `/natural-persons/${id}`,
            method: "PUT",
            data: payload,
        };
        try {
            // const response = await Axios.put<User>(options.url, options.data);
            // const data = response.data;
            thunkAPI.dispatch(editNaturalPerson(payload));
            return payload;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: true, message: "Failed to edit section" });
        }
    }
);