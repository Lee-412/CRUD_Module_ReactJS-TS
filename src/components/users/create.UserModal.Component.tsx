import { Form, FormProps, Input, InputNumber, Modal, Select, notification } from "antd";


// interFace data Props
interface dataProps_createModal {
    access_token: string;
    getData: any;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: dataProps_createModal) => {

    const { access_token, getData,
        isCreateModalOpen, setIsCreateModalOpen } = props;

    const { Option } = Select;
    const [form] = Form.useForm();


    //set default data in form and modal
    const handleCancel_setDefaultData = () => {
        setIsCreateModalOpen(false);
        form.resetFields();

    }

    // Update data, fetch API, check Error
    // handle submit data Form ant
    const onFinish: FormProps["onFinish"] = async (values) => {
        const { name, email, password, age, gender, address, role } = values;
        const dataUserInput = { name, email, password, age, gender, address, role }
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
                description: "Thêm mới người dùng thành công"
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

    // Validate message Email and number type
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
            {/* Create modal */}
            <Modal title="Add New Users"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => { handleCancel_setDefaultData(); }}
                maskClosable={false}
            >
                {/* Form Create user Antd */}
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
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{ marginBottom: "5px" }}
                    >
                        <Input.Password />
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
export default CreateUserModal;