import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { PageLayout } from "../layouts/PageLayout";
import { QuestionDetailLayout } from "../layouts/QuestionDetailLayout";
import { MainPage } from "./pages/MainPage";
import { CoursesListPage } from "./pages/CoursesListPage";
import { CoursePage } from "./pages/CoursePage";
import { QuestionDetailPage } from "./pages/QuestionDetailPage";
import { NewsPage } from "./pages/NewsPage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { RouteErrorFallback } from "../errors/RouteErrorFallback";

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
            element: <CoursesListPage />,
            handle: { title: "Курси | SyntaxHub" },
          },
          {
            path: "/courses/:courseSlug",
            element: <CoursePage />,
            children: [
              {
                element: <QuestionDetailLayout />,
                children: [
                  {
                    path: "questions/:questionId",
                    element: <QuestionDetailPage />,
                  },
                ],
              },
            ],
          },
          {
            path: "/news",
            element: <NewsPage />,
            handle: { title: "Новини | SyntaxHub" },
          },
        ],
      },
      { path: "/auth/callback", element: <AuthCallbackPage /> },
    ],
  },
]);
