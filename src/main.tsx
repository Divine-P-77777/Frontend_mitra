import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { LoaderProvider } from "./hooks/useLoader";
import { LenisProvider } from "./hooks/useLenis";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <LoaderProvider>
          <LenisProvider>
            <App />
          </LenisProvider>
        </LoaderProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
