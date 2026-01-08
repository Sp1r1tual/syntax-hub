import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { RouteErrorFallback } from "../errors/RouteErrorFallback";
import { PageLayout } from "../layouts/PageLayout";
import { QuestionDetailLayout } from "../layouts/QuestionDetailLayout";
import { LegalLayout } from "../layouts/LegalLayout";

import { MainPage } from "./pages/MainPage";
import { CoursesListPage } from "./pages/CoursesListPage";
import { CoursePage } from "./pages/CoursePage";
import { QuestionDetailPage } from "./pages/QuestionDetailPage";
import { NewsPage } from "./pages/NewsPage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { CommentsRulesPage } from "./pages/CommunityRulesPage";

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

      {
        element: <LegalLayout />,
        children: [
          {
            path: "/terms-of-use",
            element: <TermsOfUsePage />,
            handle: { title: "Користувацька угода | SyntaxHub" },
          },
          {
            path: "/privacy-policy",
            element: <PrivacyPolicyPage />,
            handle: { title: "Політика приватності | SyntaxHub" },
          },
          {
            path: "/comment-rules",
            element: <CommentsRulesPage />,
            handle: { title: "Правила спільноти | SyntaxHub" },
          },
        ],
      },
    ],
  },
]);
