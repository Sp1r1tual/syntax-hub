import { createBrowserRouter } from "react-router-dom";

import App from "./App";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
]);

export { Router };
