import {Table, Tag, Button, Modal, Breadcrumb, message} from "antd";
import {useEffect, useState} from "react";
import styles from "../styles/UserManagement.module.css";
import {Link} from "react-router-dom";
import AddNewUserModal from "../Components/AddNewUserModal";


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
    },
    {
        title: 'Mac Address',
        dataIndex: 'mac_address',
    },
    {
        title: 'Phone number',
        dataIndex: 'phone_number'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        render: (_, { role }) => {
            if (!role) return null;
            return(
                <Tag color={role === "ADMIN" ? "#f50" : (role === "DOC" ? "#108ee9" : "#87d068")} key={role}>
                    {role.toUpperCase()}
                </Tag>
        )},
    }
];

export default function UserManagement() {
    const [dataSource, setDataSource] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (values) => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetch_data = async () => {
        try {
            const users = await fetch("http://34.159.120.168:9009/user");
            const data = await users.json();
            setDataSource(data && data.map((user, idx) => ({
                key: idx, first_name: user.first_name,
                last_name: user.last_name, email: user.email, mac_address: user.mac_address,
                phone_number: user.phone_number, id: user.id,role:user.role
            })));
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {


        fetch_data();
    }, []);

    // flash messages
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'An unexpected error occurred, please try again!',
        });
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Entry Saved successfully!',
        });
    };

    const successDelete = () => {
        messageApi.open({
            type: 'success',
            content: 'Entry Deleted successfully!',
        });
    };

    const loading = () => {
        messageApi.open({
            type: 'loading',
            content: 'Saving..',
            duration: 0,
        });
        // Dismiss manually and asynchronously
        setTimeout(messageApi.destroy, 2500);
    };

    return (
        <div className={styles.container}>
            {contextHolder}
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/user_management">User Management</Link>,
                    }
                ]}
            />
            <Button type="primary" onClick={() => {
                setSelectedUser(null);
                showModal();
            }} className={styles.add_user_button}>
                Add User
            </Button>
            <AddNewUserModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk}
                             currentUser={selectedUser} error={error} success={success} loading={loading}
                             successDelete={successDelete}
                             messageApi={messageApi} fetch_data={fetch_data}/>
            <Table
                rowKey="key"
                columns={columns}
                dataSource={dataSource}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (event) => {
                            setSelectedUser(record);
                            setIsModalOpen(true);
                            console.log(record);
                        }, // double click row
                    };
                }}
            />
        </div>
    );
};