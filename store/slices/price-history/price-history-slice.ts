import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SectionState {
    histories: any[];
}

export interface PriceHistoryResponse {
    id: number;
    name: string;
    phoneNumber: string | null;
    email: string | null;
}

const initialState: SectionState = {
    histories: [],
};

const priceHistorySlice = createSlice({
    name: "priceHistory",
    initialState,
    reducers: {
        setHistories: (state, action: PayloadAction<{ items: PriceHistoryResponse[] }>) => {
            state.histories = action.payload.items;
        },
    },
});

export const { setHistories } = priceHistorySlice.actions;
export default priceHistorySlice.reducer;
