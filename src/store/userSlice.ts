import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "../shared/interfaces/users.interface";


interface UserState {
    user: {
        isAuthenticated: boolean,
        details: UserProfile | null
    },
};

const initialStore: UserState = {
    user: {
        isAuthenticated: false,
        details: null,
    },
}

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialStore,
    reducers: {
        addUser(state, action: PayloadAction<UserProfile>) {
            state.user.isAuthenticated = true;
            state.user.details = action.payload;
        },

        removeUser(state) {
            state.user.isAuthenticated = false;
            state.user.details = null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;