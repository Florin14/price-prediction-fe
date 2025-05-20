import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LegalEntity, FetchLegalEntitiesResponse } from "../../../../models/generic/legal-entities/legal-entities";

interface LegalEntitiesState {
    items: LegalEntity[];
    quantity: number;
}

const initialState: LegalEntitiesState = {
    items: [],
    quantity: 0,
};

const LegalEntitiesSlice = createSlice({
    name: "LegalEntities",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchLegalEntitiesResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        editLegalEntity: (state, action: PayloadAction<LegalEntity>) => {
            const index = state.items.findIndex((section) => section.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { setItems, editLegalEntity } = LegalEntitiesSlice.actions;
export default LegalEntitiesSlice.reducer;
