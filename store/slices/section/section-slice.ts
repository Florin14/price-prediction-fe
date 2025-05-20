import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, FetchSectionsResponse } from "../../../models/generic/sections/sections";

interface SectionState {
    items: Section[];
    quantity: number;
}

const initialState: SectionState = {
    items: [],
    quantity: 0,
};

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchSectionsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addSection: (state, action: PayloadAction<Section>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editSection: (state, action: PayloadAction<Section>) => {
            const index = state.items.findIndex((section) => section.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteSection: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((section) => section.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const { setItems, addSection, editSection, deleteSection } = sectionSlice.actions;
export default sectionSlice.reducer;
