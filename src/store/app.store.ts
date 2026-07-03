import { configureStore, } from "@reduxjs/toolkit";
import userReduce from "./userSlice";
import toasterSlice from "./toasterSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connection";
import requestSlice from "./requestSlice";


export const appStore = configureStore({
    reducer: {
        user: userReduce,
        toaster: toasterSlice,
        feed: feedSlice,
        connection: connectionSlice,
        request: requestSlice
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;