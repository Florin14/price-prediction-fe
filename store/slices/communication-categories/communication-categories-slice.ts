import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommunicationCategory, FetchCommunicationCategoriesResponse } from "../../../models/generic/communication-categories/communication-categories";

interface CommunicationCategoryState {
    items: CommunicationCategory[];
    quantity: number;
}

const initialState: CommunicationCategoryState = {
    items: [],
    quantity: 0,
};

const communicationCategorySlice = createSlice({
    name: "communicationCategory",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchCommunicationCategoriesResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addCommunicationCategory: (state, action: PayloadAction<CommunicationCategory>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editCommunicationCategory: (state, action: PayloadAction<CommunicationCategory>) => {
            const index = state.items.findIndex((communicationCategory) => communicationCategory.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCommunicationCategory: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((communicationCategory) => communicationCategory.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const communicationCategoryActions = communicationCategorySlice.actions;
export default communicationCategorySlice.reducer;
