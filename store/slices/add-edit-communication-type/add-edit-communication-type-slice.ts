import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommunicationCategoryResource, CommunicationType } from "../../../models/generic/communication-type/communication-type";

interface CommunicationTypeState {
    communicationType: CommunicationType | null;
    resources: CommunicationCategoryResource[] | null;
}

const initialState: CommunicationTypeState = {
    communicationType: null,
    resources: null,
};

const communicationTypeSlice = createSlice({
    name: "communicationType",
    initialState,
    reducers: {
        setToEmpty: (state) => {
            state.communicationType = null;
            state.resources = null;
        },
        setCommunicationType: (state, action: PayloadAction<CommunicationType>) => {
            state.communicationType = action.payload;
        },
        setResources: (state, action: PayloadAction<CommunicationCategoryResource[]>) => {
            state.resources = action.payload;
        },
    },
});

export const { setToEmpty, setCommunicationType, setResources } = communicationTypeSlice.actions;
export default communicationTypeSlice.reducer;
