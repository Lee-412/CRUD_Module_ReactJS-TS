import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, notification, } from 'antd';
import type { TableColumnsType } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Users {
    _id: string,
    email: string,
    name: string,
    role: string
}

// fetch API database
const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmODQ0M2RiMDMyYmNiZjExYjgwNmMyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTA3NzI3NzMsImV4cCI6MTc5NzE3Mjc3M30.R327R7vjWRXu8GdaNbtMS_KxQ8M_oCD9Y2g-9Olpzvk"
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
        console.log("check Data1: ", dataUsers.data.result);
        setListUsers(dataUsers.data.result);
    }

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
        }
    ]
    const handleCancel_setDefaultData = () => {
        setIsModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    }
    const handleOk = async () => {
        const dataUserInput = { name, email, password, age, gender, address, role }
        console.log("Check data: ", dataUserInput);

        // fetch API POST data 
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmODQ0M2RiMDMyYmNiZjExYjgwNmMyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTA3NzI3NzMsImV4cCI6MTc5NzE3Mjc3M30.R327R7vjWRXu8GdaNbtMS_KxQ8M_oCD9Y2g-9Olpzvk"
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {

                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"

                },
                method: "POST",
                body: JSON.stringify({
                    ...dataUserInput
                })
            }
        )
        const dataPost = await res.json();

        if (dataPost.data) {
            await getData();
            notification.success({

                message: JSON.stringify(dataPost.message),
                description: "success"
            })
            handleCancel_setDefaultData();
        }
        else {
            notification.warning({

                message: JSON.stringify(dataPost.message),
                description: "Thông tin nhập không chính xác"
            })
        }
    };

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
                        onClick={() => { setIsModalOpen(true); }}
                    >And new User</Button></div>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            ></Table>

            {/* Modal add users */}
            <Modal title="Add New Users"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => { handleCancel_setDefaultData(); }}
                maskClosable={false}>

                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <Input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <Input
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
            </Modal>
        </div>
    )
}
export default UsersTable;