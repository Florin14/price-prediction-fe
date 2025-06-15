import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientProfile, ClientProfileResponse } from "../../../models/generic/client/client";

interface SectionState {
    client: ClientProfile | null;
}

const initialState: SectionState = {
    client: null,
};

const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ClientProfileResponse>) => {
            state.client = action.payload;
        },
    },
});

export const { setProfile } = clientsSlice.actions;
export default clientsSlice.reducer;
