import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import UsersPage from './screens/users.page.tsx';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: 'Manage Users',
    key: 'users',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1',
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         {
  //           label: 'Option 3',
  //           key: 'setting:3',
  //         },
  //         {
  //           label: 'Option 4',
  //           key: 'setting:4',
  //         },
  //       ],
  //     },
  //   ],
  // },


];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal" items={items} />
    </div>
  )
};
const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>footer nè</footer>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,

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
    {/* <App />  */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
