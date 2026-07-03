import { createSlice } from "@reduxjs/toolkit";
import type { RequestsType } from "../shared/interfaces/connection.interface";

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        requests: [] as RequestsType[],
    },
    reducers: {
        addRequest: (state, action) => {
            state.requests = action.payload;
        },
    }
});

export const { addRequest } = requestSlice.actions;

export default requestSlice.reducer;