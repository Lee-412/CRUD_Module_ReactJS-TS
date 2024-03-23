import { TeamOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
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

    const getData = async () => {
        const res = await fetch(
            "http://localhost:8000/api/v1/auth/login",
            {
                headers: {
                    "Content-Type": "application/json"

                },
                method: "POST",
                body: JSON.stringify({
                    username: "admin@gmail.com",
                    password: "123456"
                })
            })
        const dataUsers = await res.json();

        //check data API reload
        if (dataUsers.data) {
            localStorage.setItem("access_token", dataUsers.data.access_token)
        }

    }

    useEffect(() => {

        getData();

    }, [])

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}
export default LayoutAdmin;