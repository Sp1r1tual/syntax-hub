import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { PageLayout } from "./layouts/PageLayout";
import { MainPage } from "./pages/MainPage";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursePage } from "./pages/CoursePage";
import { RouteErrorFallback } from "./components/errors/RouteErrorFallback";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
            handle: { title: "SyntaxHub - навчання програмуванню" },
          },
          {
            path: "/courses",
            element: <CoursesPage />,
            handle: { title: "Курси | SyntaxHub" },
          },
          {
            path: "/courses/:courseSlug",
            element: <CoursePage />,
          },
        ],
      },
    ],
  },
]);
