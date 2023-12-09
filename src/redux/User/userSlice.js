import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        // other user-related data
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        // other user-related reducers
    },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
