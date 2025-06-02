import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Listing, FetchListingsResponse } from "../../../models/generic/listing/listing";

interface ListingState {
    items: Listing[];
    quantity: number;
}

const initialStateLabel: ListingState = {
    items: [],
    quantity: 0,
};

const listingSlice = createSlice({
    name: "listing",
    initialState: initialStateLabel,
    reducers: {
        setItems: (state, action: PayloadAction<FetchListingsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addListing: (state, action: PayloadAction<Listing>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        // editListing: (state, action: PayloadAction<Listing>) => {
        //     const index = state.items.findIndex((label: any) => label.id === action.payload.id);
        //     if (index !== -1) {
        //         state.items[index] = action.payload;
        //     }
        // },
        deleteListing: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((label: any) => label.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const listingActions = listingSlice.actions;

export default listingSlice.reducer;
