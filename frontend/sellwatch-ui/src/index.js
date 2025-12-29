import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Si tu as un provider (Settings, Auth, etc.)
import { SettingsProvider } from "./context/SettingsContext";

// Service Worker (PWA)
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);

// Activation du mode PWA
serviceWorkerRegistration.register();
