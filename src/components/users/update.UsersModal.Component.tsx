import { Form, FormProps, Input, InputNumber, Modal, Select, notification } from "antd";
import { useEffect } from "react";
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

    const { access_token, getData,
        isUpdateModalOpen, setIsUpdateModalOpen,
        dataUpdateUsers, setDataUpdateUser } = props;

    const { Option } = Select;
    const [form] = Form.useForm();

    //set default data in modal
    const handleCancel_setDefaultData = () => {
        setIsUpdateModalOpen(false);
        setDataUpdateUser(null);
    }

    const fillDataUpdate = () => {
        if (dataUpdateUsers) {
            form.setFieldsValue({
                name: dataUpdateUsers.name,
                email: dataUpdateUsers.email,
                age: dataUpdateUsers.age,
                gender: dataUpdateUsers.gender,
                address: dataUpdateUsers.address,
                role: dataUpdateUsers.role,
            })
        }
        else {
            //
        }
    }

    useEffect(() => {
        fillDataUpdate();
    }, [dataUpdateUsers])

    // handle submit data Form ant
    const onFinish: FormProps["onFinish"] = async (values) => {
        const { name, email, age, gender, address, role } = values;
        if (dataUpdateUsers) {

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
                    description: "Chỉnh sửa người dùng thành công "
                })
                handleCancel_setDefaultData();
            }
            else {
                notification.warning({
                    message: JSON.stringify(dataPost.message),
                    description: "Thông tin nhập không chính xác"
                })
            }
        }
    };

    const validateMessages = {
        required: 'Please input your ${label} ',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    return (
        <>
            <Modal title="Update Users"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => { handleCancel_setDefaultData(); }}
                maskClosable={false} >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    validateMessages={validateMessages}
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        style={{ marginBottom: "5px" }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item

                        label="Email"
                        name="email"
                        rules={[{ type: 'email', required: true }]}
                        style={{ marginBottom: "5px" }}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: dataUpdateUsers ? false : true, message: 'Please input your password!' }]}
                        style={{ marginBottom: "5px" }}
                    >
                        <Input.Password
                            disabled={dataUpdateUsers ? true : false}
                        />
                    </Form.Item>

                    <Form.Item
                        name='age'
                        label="Age"
                        rules={[{ required: true, type: 'number', min: 0, max: 150 }]}
                        style={{ marginBottom: "5px" }}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                        style={{ marginBottom: "5px" }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender" label="Gender"
                        rules={[{ required: true }]}
                        style={{ marginBottom: "5px" }}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="MALE">male</Option>
                            <Option value="FEMALE">female</Option>
                            <Option value="OTHER">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true }]}
                        style={{ marginBottom: "5px" }}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="ADMIN">Admin</Option>
                            <Option value="USER">User</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal >
        </>
    )
}
export default UpdateUsersModal;