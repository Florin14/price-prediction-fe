import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Label, FetchLabelsResponse } from "../../../models/generic/labels/labels";

interface LabelState {
    items: Label[];
    quantity: number;
}

const initialStateLabel: LabelState = {
    items: [],
    quantity: 0,
};

const LabelSlice = createSlice({
    name: "labels",
    initialState: initialStateLabel,
    reducers: {
        setItems: (state, action: PayloadAction<FetchLabelsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addLabel: (state, action: PayloadAction<Label>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editLabel: (state, action: PayloadAction<Label>) => {
            const index = state.items.findIndex((label: any) => label.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteLabel: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((label: any) => label.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const LabelActions = LabelSlice.actions;

export default LabelSlice.reducer;
