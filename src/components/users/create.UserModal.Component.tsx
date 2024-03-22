import { Input, Modal, notification } from "antd";
import { useState } from "react";

interface dataProps_createModal {
    access_token: string;
    getData: any;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: dataProps_createModal) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const { access_token, getData,
        isCreateModalOpen, setIsCreateModalOpen } = props;

    //set default data in modal
    const handleCancel_setDefaultData = () => {
        setIsCreateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    }

    // handle click Oke in modal
    // Update data, fetch API, check Error
    const handleOk = async () => {
        const dataUserInput = { name, email, password, age, gender, address, role }
        console.log("Check data: ", dataUserInput);

        // fetch API POST data 
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
            {/* Create modal */}
            <Modal title="Add New Users"
                open={isCreateModalOpen}
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
        </>
    )
}
export default CreateUserModal;