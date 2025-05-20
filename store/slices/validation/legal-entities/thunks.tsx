import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { setItems } from "./legal-entities";
import { ErrorResponse } from "../../../../models/generic/generic";
import {
    FetchLegalEntitiesArgs,
    FetchLegalEntitiesResponse,
} from "../../../../models/generic/legal-entities/legal-entities";

export const fetchLegalEntities = createAsyncThunk<FetchLegalEntitiesResponse, FetchLegalEntitiesArgs, { rejectValue: ErrorResponse }>(
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

            const data: FetchLegalEntitiesResponse = {
                items: [
                    {
                        id: 1,
                        cui: "123456789",
                        name: "John Doe",
                        email: "admin@gmail.com",
                        phoneNumber: "123-456-7890",
                        taxCertificate: {
                            fileId: 1,
                            fileName: "tax_certificate.pdf",
                            folderName: "tax_certificates",
                        },
                        validationType: "Cont nou",
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
