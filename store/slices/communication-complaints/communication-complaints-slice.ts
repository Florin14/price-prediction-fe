import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommunicationComplaint, FetchCommunicationComplaintsResponse } from "../../../models/generic/communication-complaints/communication-complaints";

interface CommunicationComplaintState {
    items: CommunicationComplaint[];
    quantity: number;
}

const initialState: CommunicationComplaintState = {
    items: [],
    quantity: 0,
};

const communicationComplaintSlice = createSlice({
    name: "communicationComplaint",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchCommunicationComplaintsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addCommunicationComplaint: (state, action: PayloadAction<CommunicationComplaint>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editCommunicationComplaint: (state, action: PayloadAction<CommunicationComplaint>) => {
            const index = state.items.findIndex((communicationComplaint) => communicationComplaint.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCommunicationComplaint: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((communicationComplaint) => communicationComplaint.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const communicationComplaintActions = communicationComplaintSlice.actions;
export default communicationComplaintSlice.reducer;
