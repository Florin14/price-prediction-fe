import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputChannel, FetchInputChannelsResponse } from "../../../models/generic/input-channels/input-channels";

interface InputChannelState {
    items: InputChannel[];
    quantity: number;
}

const initialState: InputChannelState = {
    items: [],
    quantity: 0,
};

const inputChannelSlice = createSlice({
    name: "inputChannel",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchInputChannelsResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addInputChannel: (state, action: PayloadAction<InputChannel>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editInputChannel: (state, action: PayloadAction<InputChannel>) => {
            const index = state.items.findIndex((InputChannel) => InputChannel.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteInputChannel: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((InputChannel) => InputChannel.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const inputChannelActions = inputChannelSlice.actions;
export default inputChannelSlice.reducer;
