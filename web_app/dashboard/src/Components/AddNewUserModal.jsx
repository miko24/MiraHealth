import {Alert, Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";

export default function AddNewUserModal({isModalOpen,handleOk,handleCancel,currentUser,error,success,successDelete,fetch_data}){
    const [formData, setFormData] = useState(()=>({
        first_name: currentUser && currentUser.first_name,
        last_name: currentUser && currentUser.last_name,
        email: currentUser && currentUser.email,
        mac_address: currentUser && currentUser.mac_address,
        phone_number: currentUser && currentUser.phone_number,
        role: currentUser && currentUser.role,
    }));

    useEffect(() => {
        setFormData({
            first_name: currentUser ? currentUser.first_name : "",
            last_name: currentUser ? currentUser.last_name : "",
            email: currentUser ? currentUser.email : "",
            mac_address: currentUser ? currentUser.mac_address : "",
            phone_number: currentUser ? currentUser.phone_number : "",
            role: currentUser ? currentUser.role : "",
        })
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleRoleChange = (value)=>{
        setFormData((prevFormData) => ({
            ...prevFormData,
            role: value,
        }));
    }

    const handleDelete = async()=>{
        try {
            const response = await fetch("http://34.159.120.168:9009/user/"+currentUser.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                successDelete();
            } else {
                // Handle the error response
                error();
            }
        } catch (err) {
            // Handle any network or fetch-related errors
            error();
        }

        fetch_data();
        handleOk();
    }

    const handleSubmit = async ()=>{
        // submit changes
        if (currentUser) {
            // update
            try {
                const response = await fetch("http://34.159.120.168:9009/user/"+currentUser.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    success();
                } else {
                    // Handle the error response
                    error();
                }
            } catch (err) {
                // Handle any network or fetch-related errors
                error();
            }
        } else {
            //create
            try {
                const response = await fetch("http://34.159.120.168:9009/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    success();
                } else {
                    // Handle the error response
                    error();
                }
            } catch (err) {
                // Handle any network or fetch-related errors
                error();
            }

        }

        fetch_data();
        handleOk();
    }

    return (
        <Modal title="Add Or Edit User" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel} width={800}>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout={"vertical"}
                onFinish={handleOk}
            >
                <Form.Item
                    name="first_name"
                    label="First Name"
                    valuePropName={""}// this allows the inputs read value prop for some reason
                >
                    <Input size={"large"} name={"first_name"} onChange={handleChange} value={formData.first_name}/>
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Last Name"
                    valuePropName={""}// this allows the inputs read value prop for some reason
                >
                    <Input size={"large"} name={"last_name"} onChange={handleChange} value={formData.last_name}/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    valuePropName={""}// this allows the inputs read value prop for some reason
                >
                    <Input size={"large"} name={"email"} onChange={handleChange} value={formData.email}/>
                </Form.Item>
                <Form.Item
                    name="mac_address"
                    label="Mac Address"
                    valuePropName={""}// this allows the inputs read value prop for some reason
                >
                    <Input size={"large"} name={"mac_address"} onChange={handleChange} value={formData.mac_address}/>
                </Form.Item>
                <Form.Item
                    name="phone_number"
                    label="Phone Number"
                    valuePropName={""}// this allows the inputs read value prop for some reason
                >
                    <Input size={"large"} name={"phone_number"} onChange={handleChange} value={formData.phone_number}/>
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    valuePropName={""}// this allows the inputs read value prop for some reason
                >
                    <Select
                        defaultValue="PATIENT"
                        style={{ width: 120 }}
                        onChange={handleRoleChange}
                        value={formData.role}
                        options={[
                            { value: 'ADMIN', label: 'ADMIN' },
                            { value: 'DOC', label: 'DOC' },
                            { value: 'PATIENT', label: 'PATIENT' },
                        ]}
                    />
                </Form.Item>

                {currentUser &&(
                    <>
                        <Alert
                            message="Warning"
                            description="This action is irreversible!"
                            type="error"
                            showIcon
                        />
                        <Button style={{margin:"10px 10px 10px 0"}} type="primary" danger onClick={handleDelete}>
                            Delete
                        </Button>
                    </>
                )}
            </Form>
        </Modal>
    );
}