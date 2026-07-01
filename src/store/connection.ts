import { createSlice } from "@reduxjs/toolkit";
import type { Connections } from "../shared/interfaces/connection.interface";


const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connections: [] as Connections[],
    },
    reducers: {
        setConnections(state, action) {
            state.connections = action.payload;
        }
    }
});

export const { setConnections } = connectionSlice.actions;
export default connectionSlice.reducer;