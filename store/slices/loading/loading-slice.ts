import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LoadingStore = {
    loading: false,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<{ loading: boolean }>) {
            if ((!state.loading && action.payload.loading) || (state.loading && !action.payload.loading)) {
                state.loading = action.payload.loading;
            }
        },
    },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
