import { useEffect, useState } from "react";
import { Table, Button, notification, Popconfirm, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from "./create.UserModal.Component";
import UpdateUsersModal from "./update.UsersModal.Component";

export interface Users {
    _id: string,
    email: string,
    name: string,
    password: string,
    age: string,
    gender: string,
    address: string,
    role: string
}

// fetch API database
const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdateUsers, setDataUpdateUser] = useState<null | Users>(null);
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmODQ0M2RiMDMyYmNiZjExYjgwNmMyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTExMTY4MTEsImV4cCI6MTc5NzUxNjgxMX0.2vsrMkte1Nvn1Gj2CS2m0xBWyM2AWmEjAHgwdryqWaE"

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const res = await fetch(
            "http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"

                },
            })

        const dataUsers = await res.json();

        //check data API reload
        if (!dataUsers.data) {
            notification.error({
                message: JSON.stringify(dataUsers.message)
            })
        }
        setListUsers(dataUsers.data.result);
    }

    const confirm = () => {
        message.success('Click on Yes');
    };

    // created columns database
    const columns: TableColumnsType<Users> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {
                return (<a>{record.email}</a>)
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Role',
            dataIndex: 'role'
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <div>
                        <button onClick={() => {
                            console.log("check data record: ", record),
                                setIsUpdateModalOpen(true)
                            setDataUpdateUser(record)
                        }}
                        >
                            Edit</button>
                        <Popconfirm
                            title="Delete the Users"
                            description={`Are you sure to delete this user. name = ${record.name}?`}
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>

                    </div >
                )
            }
        }


    ]

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}      >

                <h2>Table Users</h2>
                <div>
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => { setIsCreateModalOpen(true); }}
                    >And new User</Button></div>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}

            ></Table>

            {/* Modal add users */}
            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            {/* Modal update users */}
            <UpdateUsersModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdateUsers={dataUpdateUsers}
                setDataUpdateUser={setDataUpdateUser}
            />
        </div>
    )
}
export default UsersTable;