import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, FetchUsersResponse } from "../../../models/generic/users/users";

interface UserState {
    items: User[];
    quantity: number;
}

const initialState: UserState = {
    items: [],
    quantity: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<FetchUsersResponse>) => {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.items.push(action.payload);
            state.quantity += 1;
        },
        editUser: (state, action: PayloadAction<User>) => {
            const index = state.items.findIndex((section) => section.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((section) => section.id !== action.payload);
            state.quantity -= 1;
        },
    },
});

export const { setItems, addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
