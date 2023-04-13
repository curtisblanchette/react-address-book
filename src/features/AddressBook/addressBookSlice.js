import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../Api/api";

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

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectContactsResult = apiSlice.endpoints.getContacts.select();

const emptyContacts = [];
export const selectAllContacts = createSelector(
  selectContactsResult,
  contactsResult => contactsResult?.data ?? emptyContacts
);

export const selectContactById = createSelector(
  selectAllContacts,
  (state, id) => id,
  (contacts, contactId) => contacts.find(contact => contact.id === contactId)
);

export const { updatePhrase, setContactId } = addressBookSlice.actions;
export default addressBookSlice.reducer;

