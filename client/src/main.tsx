import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Router } from "./Router";

import "./index.css";

const container = document.getElementById("root");

container
  ? createRoot(container).render(
      <StrictMode>
        <RouterProvider router={Router} />
      </StrictMode>,
    )
  : console.error("Root element not found");
