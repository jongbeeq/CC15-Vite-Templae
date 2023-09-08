import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import FriendPage from "../pages/FriendPage";
import FeedPage from "../pages/FeedPage";

function Router() {
    const router = createBrowserRouter([
        { path: "/", element: <HomePage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/profile/:userId", element: <FriendPage /> },
        { path: "/feed", element: <FeedPage /> },
        { path: "*", element: <Navigate to="/" /> },
    ])

    return <RouterProvider router={router} />;
}

export default Router;