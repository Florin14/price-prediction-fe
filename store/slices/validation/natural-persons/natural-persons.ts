import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NaturalPerson, FetchNaturalPersonsResponse } from "../../../../models/generic/natural-persons/natural-persons";

interface NaturalPersonsState {
    items: NaturalPerson[];
    quantity: number;
}

const initialState: NaturalPersonsState = {
    items: [],
    quantity: 0,
};

const naturalPersonsSlice = createSlice({
    name: "naturalPersons",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchNaturalPersonsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        editNaturalPerson: (state, action: PayloadAction<NaturalPerson>) => {
            const index = state.items.findIndex((section) => section.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { setItems, editNaturalPerson } = naturalPersonsSlice.actions;
export default naturalPersonsSlice.reducer;
