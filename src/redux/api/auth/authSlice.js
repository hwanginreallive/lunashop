import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        id: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, id } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.id = id;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.user;
