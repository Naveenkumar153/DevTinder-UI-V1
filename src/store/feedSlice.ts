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
        },

        removeFeed(state, action: PayloadAction<string>) {
            state.feeds = state.feeds.filter((feed) => feed._id !== action.payload);
        }
    }
});

export const { addFeeds, removeFeeds, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;