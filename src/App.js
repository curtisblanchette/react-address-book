import './App.css';
import React from "react";
import AddressBook from "./features/AddressBook/AddressBook";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <AddressBook />
      </ErrorBoundary>
    </div>
  );
}

export default App;
