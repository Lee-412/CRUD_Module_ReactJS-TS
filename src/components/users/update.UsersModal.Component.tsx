import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Users } from "./users.table";
interface DataUpdateUsers {
    access_token: string;
    getData: any;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdateUsers: null | Users;
    setDataUpdateUser: (v: null | Users) => void;
}
const UpdateUsersModal = (props: DataUpdateUsers) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const { access_token, getData,
        isUpdateModalOpen, setIsUpdateModalOpen,
        dataUpdateUsers, setDataUpdateUser } = props;

    console.log("check Data Update: ", dataUpdateUsers)
    //set default data in modal
    const handleCancel_setDefaultData = () => {
        setIsUpdateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
        setDataUpdateUser(null);
    }

    const fillDataUpdate = () => {
        if (dataUpdateUsers) {
            setName(dataUpdateUsers.name);
            setEmail(dataUpdateUsers.email);
            setPassword(dataUpdateUsers.password);
            setAge(dataUpdateUsers.age);
            setGender(dataUpdateUsers.gender);
            setAddress(dataUpdateUsers.address);
            setRole(dataUpdateUsers.role);
        }
    }

    useEffect(() => {
        fillDataUpdate();
    }, [dataUpdateUsers])

    const handleOk = async () => {

        const data = {
            _id: dataUpdateUsers?._id,
            name, email, age, gender, role, address
        }
        // fetch API POST data 
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json"

                },
                method: "PATCH",
                body: JSON.stringify(
                    data
                )
            }
        )
        const dataPost = await res.json();

        //check error
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
        <>
            <Modal title="Update Users"
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={() => { handleCancel_setDefaultData(); }}
                maskClosable={false} >

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
                        disabled={true}
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
            </Modal >
        </>
    )
}
export default UpdateUsersModal;