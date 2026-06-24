import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type ToasterClassNames = 'alert-success' | 'alert-info' | 'alert-warning' | 'alert-error';

interface ToastState {
    show: boolean;
    message: string;
    clsName: ToasterClassNames;
};

const initialState: ToastState = {
    show: false,
    message: '',
    clsName: 'alert-info'
};

const toasterSlice = createSlice({
    name: 'toaster',
    initialState: initialState,
    reducers: {
        showToaster(
            state,
            action: PayloadAction<{ message: string, clsName: ToasterClassNames }>
        ) {
            state.show = true,
                state.message = action.payload.message;
            state.clsName = action.payload.clsName;
        },
        hideToast: (state) => {
            state.show = false;
            state.message = '';
        },
    }
});

export const { showToaster, hideToast } = toasterSlice.actions;
export default toasterSlice.reducer;