import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LegalEntityProfile, LegalEntityProfileResponse } from "../../../models/generic/legal-entity-profile/legal-entity-profile";

interface SectionState {
    citizen: LegalEntityProfile | null;
}

const initialState: SectionState = {
    citizen: null,
};

const legalEntityProfileSlice = createSlice({
    name: "legalEntityProfile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<LegalEntityProfileResponse>) => {
            state.citizen = action.payload;
        },
    },
});

export const { setProfile } = legalEntityProfileSlice.actions;
export default legalEntityProfileSlice.reducer;
