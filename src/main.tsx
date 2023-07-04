import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStateProvider } from "./state";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>
);
