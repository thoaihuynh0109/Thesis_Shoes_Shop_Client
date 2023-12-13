import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        // other user-related data
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        // other user-related reducers
        removeUser: (state) => {
            localStorage.removeItem('user');
            state.user = {};
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
