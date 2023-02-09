import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    layout: {
        header: true,
        footer: true,
    },
};

export const layoutConfigSlice = createSlice({
    name: 'layoutConfig',
    initialState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = {
                header: action?.payload?.header,
                footer: action?.payload?.footer,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLayout } = layoutConfigSlice.actions;

export default layoutConfigSlice.reducer;
