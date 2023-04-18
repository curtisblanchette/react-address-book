import { act, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { renderWithProviders } from "../../../utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ContactSearch from "./ContactSearch";
import { baseUrl } from "../../../mocks/handlers";
import { setupStore } from "../../../store";
import { updatePhrase } from "../addressBookSlice";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/contacts` endpoint
export const handlers = [
  rest.get(baseUrl('/contacts'), (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 1,
        name: 'John Smith',
        address: '123',
        phone: '456'
      },
      {
        id: 2,
        name: 'Jane Doe',
        address: '123',
        phone: '456'
      }
    ]), ctx.delay(150))
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('Loads and displays the ContactDetails', async () => {
  renderWithProviders(<ContactSearch />);

  // attempt to open the dropdown
  fireEvent.click(screen.getByRole('button', { suggest: false }));

  // should show the loading element
  expect(screen.getByText(/Loading contact list.../i)).toBeInTheDocument();

  // after some time, the user should be received
  expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
  expect(screen.queryByText(/Loading contact list.../i)).not.toBeInTheDocument();
});

test('Filters contacts when typing in the search field', async () => {
  const store = setupStore();
  renderWithProviders(<ContactSearch />, { store });

  fireEvent.keyPress(screen.getByRole('combobox'), { key: 'Ja' });

  act(() => store.dispatch(updatePhrase('Ja')));

  /** TODO need to mock isLoading || isFetching
   *  as they are used to conditionally render the dropdown list */

  // open the dropdown
  fireEvent.click(screen.getByRole('button', { suggest: false }));

  expect(await screen.findByText('Loading contact list...')).toBeInTheDocument();

})
