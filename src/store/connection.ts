import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../shared/interfaces/users.interface";


const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connections: [] as UserProfile[],
    },
    reducers: {
        setConnections(state, action) {
            state.connections = action.payload;
        }
    }
});

export const { setConnections } = connectionSlice.actions;
export default connectionSlice.reducer;