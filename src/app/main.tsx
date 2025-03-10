import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./providers";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Providers>
        <App />
      </Providers>
    </Suspense>
  </StrictMode>
);
