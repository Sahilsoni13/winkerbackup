import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    email: string;
}

const initialState: ProfileState = {
    email: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        clearEmail: (state) => {
            state.email = '';
        },
    },
});

export const { setEmail, clearEmail } = profileSlice.actions;
export default profileSlice.reducer;



// Redux se email use karna

// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// const email = useSelector((state: RootState) => state.profile.email);