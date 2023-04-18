import './App.css';
import React from "react";
import AddressBook from "./features/AddressBook/AddressBook";
import { ErrorBoundary } from "react-error-boundary";

function Fallback({error}) {
  return (
    <div role={"alert"}>
      <p>Something went wrong:</p>
      <pre style={{color: "red"}}>{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <div className="App h-screen flex justify-center items-center drop-shadow-2xl">
      <ErrorBoundary
        FallbackComponent={Fallback}
        onReset={console.log}
      >
        <AddressBook />
      </ErrorBoundary>
    </div>
  );
}

export default App;
