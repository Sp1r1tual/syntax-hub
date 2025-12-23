import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { MainPage } from "./pages/MainPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);
