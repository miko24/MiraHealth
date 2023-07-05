import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {UserProvider} from "./Contexts/UserContext";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import PatientsTable from "./Components/PatientsTable";
import Login from "./Pages/Login";
import UserManagement from "./Pages/UserManagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement:<ErrorPage />,
        children:[
            {
                path: "/",
                element: <>Home</>,
            },
            {
                path: "/patients",
                element: <PatientsTable />,
            },
            {
                path: "/user_management",
                element: <UserManagement />,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
);


