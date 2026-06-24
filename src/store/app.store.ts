import { configureStore, } from "@reduxjs/toolkit";
import userReduce from "./userSlice";
import toasterSlice from "./toasterSlice";
import feedSlice from "./feedSlice";


export const appStore = configureStore({
    reducer: {
        user: userReduce,
        toaster: toasterSlice,
        feed: feedSlice
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;