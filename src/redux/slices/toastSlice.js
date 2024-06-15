import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    showToast: false,
    toastMessage: '',
    toastType: 'success'
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers:{
        setToast: (state, action) => {
            state.showToast = true;
            state.toastMessage = action.payload.message;
            state.toastType = action.payload.type || 'success';
        },

        clearToast: (state) => {
            state.showToast = false;
            state.toastMessage = '';
            state.toastType = 'success';
        }
    }
});

export const {setToast, clearToast} = toastSlice.actions;

export default toastSlice.reducer;