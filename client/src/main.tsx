import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Router } from "./components/routing/Router";
import { AuthInitializer } from "./components/auth/AuthInitializer";

import "./styles/index.css";
import "./styles/theme.css";

const container = document.getElementById("root");

container
  ? createRoot(container).render(
      <StrictMode>
        <AuthInitializer>
          <RouterProvider router={Router} />
        </AuthInitializer>
      </StrictMode>,
    )
  : console.error("Root element not found");
