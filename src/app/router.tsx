import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { GameLayout } from "./layouts/GameLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { ArchivePage } from "../pages/ArchivePage";
import { CasePage } from "../pages/CasePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProfilePage } from "../pages/ProfilePage";
import { StartPage } from "../pages/StartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <StartPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    element: <GameLayout />,
    children: [
      { path: "cases/:caseId", element: <CasePage /> },
      { path: "archive", element: <ArchivePage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/app",
    element: <Navigate replace to="/cases/bellweather" />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
