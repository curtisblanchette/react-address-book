import { createSlice } from "@reduxjs/toolkit";

export const addressBookSlice = createSlice({
  name: 'addressBook',
  initialState: {
    phrase: '',
    selectedContactId: null
  },
  reducers: {
    updatePhrase: (state, action) => {
      state.phrase = action.payload;
    },
    setContactId: (state, action) => {
      if(!action.payload) {
        state.selectedContactId = null;
      }
      state.selectedContactId = action.payload;
    }
  }
});

export const { updatePhrase, setContactId } = addressBookSlice.actions;
export default addressBookSlice.reducer;

