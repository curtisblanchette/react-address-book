import '@testing-library/jest-dom'
import AddressBook from "./AddressBook";
import { renderWithProviders } from "../../utils/test-utils";

test('Loads and displays the AddressBook', () => {
  renderWithProviders(<AddressBook />);
});
