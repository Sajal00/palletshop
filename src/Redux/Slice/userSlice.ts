import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    photo: string;
}

const initialState: { userInfo: UserState | null } = {
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserState>) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;