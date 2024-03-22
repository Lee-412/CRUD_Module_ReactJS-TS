import { TeamOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        label: <Link to='/'>Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },

    {
        label: <Link to='/Users'>Manage Users</Link >,
        key: 'users',
        icon: <TeamOutlined />,
        disabled: false,
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        // console.log('click ', e);
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
        </div>
    )
}
export default LayoutAdmin;