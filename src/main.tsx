import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UsersPage from './screens/users.page.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LayoutAdmin from './components/layout/layout.Admin.tsx';
import React from 'react';
import TracksPage from './screens/tracks.page.tsx';

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
        element: <TracksPage />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
