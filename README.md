# Address Book 
React, Redux, MSW, Faker, TailwindCSS & tailwind/headlessUI

![Screen Shot 2023-04-13 at 9.41.49 AM.png](Screen%20Shot%202023-04-13%20at%209.41.49%20AM.png)

## Included

### `@reduxjs/toolkit` (RTK)

 1. Reducer: `src/features/AddressBook/addressBookSlice.js`
Governs the applications `selectedContactId` and current `phrase` for searching.


 2. RTK Query: `src/features/Api/api.js` 
RTK Query automatically creates a slice of state handling api calls, caching the \
responses and refreshing when polling is enabled. Cache's can be invalidated by \
the tags applied at each endpoint reducer.

### `msw` Mock Service Worker (MSW) 
Intercepts HTTP requests made by the client and mocks the responses.\
_Only starts when `NODE_ENV=development`</b>_

### `@faker-js/faker` (Faker) 
Used to generate mock data returned by MSW

--- 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\