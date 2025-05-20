import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SnackbarStore = {
    message: "",
    type: "",
    open: false,
    hideDuration: 3000,
};

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        handleClose(state) {
            state.open = false;
        },
        handleOpen(state, action: PayloadAction<SnackbarPayload>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.open = true;
            state.hideDuration = state.type === "error" ? 5000 : 3000;
        },
    },
});

export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice.reducer;
