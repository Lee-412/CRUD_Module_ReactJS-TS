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
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });
    const access_token = localStorage.getItem("access_token") as string;
    useEffect(() => {
        getData();
    }, [])

    //get Data
    const getData = async () => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
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
        setMeta({
            current: dataUsers.data.meta.current,
            pageSize: dataUsers.data.meta.pageSize,
            pages: dataUsers.data.meta.pages,
            total: dataUsers.data.meta.total
        })
    }

    //Confirm delete User 
    const confirm = async (user: Users) => {


        const res = await fetch(
            `http://localhost:8000/api/v1/users/${user._id} `,
            {

                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"

                },
                method: "DELETE",
            }
        )
        const dataPost = await res.json();


        //check error
        if (dataPost.data) {
            await getData();
            notification.success({

                message: JSON.stringify(dataPost.message),
                description: "Xóa người dùng thành công"
            })
        }
        else {
            notification.warning({

                message: JSON.stringify(dataPost.message),
                description: "Không thể thực hiện xóa người dùng"
            })
        }
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
                        <Button type="primary" ghost
                            style={{ marginRight: 20 }}
                            onClick={() => {
                                console.log("check data record: ", record),
                                    setIsUpdateModalOpen(true)
                                setDataUpdateUser(record)
                            }}
                        >
                            Edit</Button>
                        <Popconfirm
                            title="Delete the Users"
                            description={`Are you sure to delete this user. name = ${record.name}?`}
                            onConfirm={() => { confirm(record) }}
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

    //  handle Change Pagination
    const handleOnchangePage = async (page: number, pagesize: number) => {

        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pagesize}`,
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
        setMeta({
            current: dataUsers.data.meta.current,
            pageSize: dataUsers.data.meta.pageSize,
            pages: dataUsers.data.meta.pages,
            total: dataUsers.data.meta.total
        })
    }

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
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pagesize: number) => handleOnchangePage(page, pagesize),
                    showSizeChanger: true

                }}
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
        </div >
    )
}
export default UsersTable;