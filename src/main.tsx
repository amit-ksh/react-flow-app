import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppQueryClientProvider from "./contexts/app-query-client-context.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppQueryClientProvider>
      <App />
      <Toaster richColors closeButton position="top-center" theme="light" />
    </AppQueryClientProvider>
  </StrictMode>
);
