import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Feed } from "../shared/interfaces/feed.interface";



interface FeedInitialState {
    feeds: Feed[]
}

const initialState: FeedInitialState = {
    feeds: [],
}

const feedSlice = createSlice({
    name: "feed",
    initialState: initialState,
    reducers: {
        addFeeds(state, action: PayloadAction<Feed[]>) {
            state.feeds = action.payload;
        },

        removeFeeds(state) {
            state.feeds = [];
        }
    }
});

export const { addFeeds, removeFeeds } = feedSlice.actions;
export default feedSlice.reducer;