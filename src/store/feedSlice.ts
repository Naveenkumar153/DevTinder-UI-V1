import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface Feed {
    firstName: string,
    lastName: string,
    age: string,
    about: string,
    gender: string,
    bio: string,
    profilePicture: string,
    skills: string[]
};

interface FeedInitialState {
    feeds: Feed[] | null
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
            state.feeds = null;
        }
    }
});

export const { addFeeds, removeFeeds } = feedSlice.actions;
export default feedSlice.reducer;