import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import addressBookReducer, { setContactId } from "./features/AddressBook/addressBookSlice";
import { apiSlice } from "./features/Api/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setContactId,
  effect: async(action, listenerApi) => {
    console.log('Contact Selected: ', action.payload.text);

    // can cancel other running instances
    listenerApi.cancelActiveListeners();

    // Run async logic
    listenerApi.dispatch(apiSlice.endpoints.getContactById.initiate(action.payload))

  }
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      addressBook: addressBookReducer,
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  });
}

export const store = setupStore();

setupListeners(store.dispatch);