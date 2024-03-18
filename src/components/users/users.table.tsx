import { useEffect, useState } from "react";
import "../../styles/users.css";

interface Users {
    _id: string,
    email: string,
    name: string,
    role: string
}

const UsersTable = () => {

    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        getData();

    }, [])
    const getData = async () => {

        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmODQ0M2RiMDMyYmNiZjExYjgwNmMyIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTA3NzI3NzMsImV4cCI6MTc5NzE3Mjc3M30.R327R7vjWRXu8GdaNbtMS_KxQ8M_oCD9Y2g-9Olpzvk"
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
    console.log(">>> check users: ", listUsers);

    return (
        <div>
            <h2>Table Users</h2>

            <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Role</td>
                    </tr>

                </thead>
                <tbody>
                    {
                        listUsers.map((item: Users) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>
        </div>
    )
}
export default UsersTable;