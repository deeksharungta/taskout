import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import { useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import { Suspense, lazy, useEffect, useState } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";

const TodayPage = lazy(() => import("./pages/TodayPage"));
const OverduePage = lazy(() => import("./pages/OverduePage"));
const UpcomingPage = lazy(() => import("./pages/UpcomingPage"));
const CompletedPage = lazy(() => import("./pages/CompletedPage"));
const MyAccountPage = lazy(() => import("./pages/MyAccountPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: null,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SignupPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "today",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TodayPage />
          </Suspense>
        ),
      },
      {
        path: "upcoming",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UpcomingPage />
          </Suspense>
        ),
      },
      {
        path: "overdue",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <OverduePage />
          </Suspense>
        ),
      },
      {
        path: "completed",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <CompletedPage />
          </Suspense>
        ),
      },
      {
        path: "account",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MyAccountPage />
          </Suspense>
        ),
      },
      {
        path: "project/:projectId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProjectsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  const notification = useSelector((state) => state.ui.notification);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      {showNotification && notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
