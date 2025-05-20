import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Administrator, FetchAdministratorsResponse } from "../../../models/generic/administrators/administrators";

interface AdministratorState {
    items: Administrator[];
    quantity: number;
    administrator: Administrator | null;
}

const initialState: AdministratorState = {
    items: [],
    quantity: 0,
    administrator: null,
};

const administratorSlice = createSlice({
    name: "administrator",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchAdministratorsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addAdministrator: (state, action: PayloadAction<Administrator>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editAdministrator: (state, action: PayloadAction<Administrator>) => {
            const index = state.items.findIndex((admin) => admin.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteAdministrator: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((admin) => admin.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const { setItems, addAdministrator, editAdministrator, deleteAdministrator } = administratorSlice.actions;
export default administratorSlice.reducer;
