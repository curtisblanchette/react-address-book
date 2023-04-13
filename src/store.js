import { configureStore } from "@reduxjs/toolkit";
import addressBookReducer from "./features/AddressBook/addressBookSlice";
import { apiSlice } from "./features/Api/api";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    addressBook: addressBookReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

setupListeners(store.dispatch);