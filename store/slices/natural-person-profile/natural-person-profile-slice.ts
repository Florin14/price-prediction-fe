import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NaturalPersonProfile, NaturalPersonProfileResponse } from "../../../models/generic/natural-person-profile/natural-person-profile";

interface SectionState {
    citizen: NaturalPersonProfile | null;
}

const initialState: SectionState = {
    citizen: null,
};

const naturalPersonProfileSlice = createSlice({
    name: "naturalPersonProfile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<NaturalPersonProfileResponse>) => {
            state.citizen = action.payload;
        },
    },
});

export const { setProfile } = naturalPersonProfileSlice.actions;
export default naturalPersonProfileSlice.reducer;
