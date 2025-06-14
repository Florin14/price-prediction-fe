import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { RegisterInterface } from "../../../interfaces/RegisterInterfaces";

export const registerNaturalPerson = createAsyncThunk(
    "register/naturalPerson",
    async ({ name, phoneNumber, email, password, confirmPassword }: RegisterInterface, { rejectWithValue }) => {
        try {
            const options = {
                url: `/clients/register`,
                method: "POST",
                data: { name, phoneNumber, email, password, confirmPassword },
            };

            const response = await Axios.post(options.url, options.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ error: true, message: "SomethingWentWrong", code: error?.response?.data?.code, fields: error?.response?.data?.fields });
        }
    }
);
