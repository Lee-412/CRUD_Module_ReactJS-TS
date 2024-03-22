import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UsersPage from './screens/users.page.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LayoutAdmin from './components/layout/layout.Admin.tsx';
import React from 'react';

// router web
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tracks",
        element: <div>Tracks audio</div>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
