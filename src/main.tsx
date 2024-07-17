import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoggedContextProvider } from "./context/provider/LoggedProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoggedContextProvider>
      <App />
    </LoggedContextProvider>
  </React.StrictMode>
);
