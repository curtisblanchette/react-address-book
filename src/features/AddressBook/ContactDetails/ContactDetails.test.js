import { act, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ContactDetails from "./ContactDetails";
import { renderWithProviders } from "../../../utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../../../mocks/handlers";
import { setupStore } from "../../../store";
import { setContactId } from "../addressBookSlice";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get(baseUrl('/contacts/1'), (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'John Smith',
        address: '123',
        phone: '456'
      }),
      ctx.delay(150))
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
})

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches & receives a contact on load', async () => {
  const store = setupStore();
  renderWithProviders(<ContactDetails />, { store });

  // should show no user initially
  expect(screen.getByText(/Select a contact/i)).toBeInTheDocument();

  // wrap state mutating actions in `act()`
  act(() => store.dispatch(setContactId(1)));

  expect(screen.getByTestId('loading')).toBeInTheDocument();

  // after some time, the contact should be received
  expect(await screen.findByText(/^John Smith$/i)).toBeInTheDocument();

  expect(screen.queryByText(/Select a contact/i)).not.toBeInTheDocument();
})
