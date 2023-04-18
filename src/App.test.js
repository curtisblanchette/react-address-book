import App from './App';
import { renderWithProviders } from "./utils/test-utils";

test('renders the address book component', () => {
  renderWithProviders(<App />);
});
