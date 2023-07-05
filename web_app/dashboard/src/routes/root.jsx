import {
    LineChartOutlined,
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {Button, Layout, Menu, message, Spin, theme} from 'antd';
import {useContext, useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import styles from "../styles/root.module.css";
import {UserContext} from "../Contexts/UserContext";


const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Users', 'user_management', <UserOutlined />),
    getItem('Patients', 'patients', <LineChartOutlined />),
];
export default function Root() {
    const [messageApi, contextHolder] = message.useMessage();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {currentUser,logout} = useContext(UserContext);


    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    const onSelectHandler = (el)=>{
        if (el.key === "home") {
            navigate("/");
        }else{
            navigate(`/${el.key}`);
        }
    }


    // rendering
    if (!currentUser) {
        return <Spin />;
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >

            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className={styles.logo}>
                    <img src={"/ant_design.svg"} alt={"Ant Design"}/>
                    <p className={styles.username}>{currentUser.name}</p>
                    <div className={styles.user_widget_actions}>
                        <Button type="default" shape="circle" icon={<SettingOutlined/>} size={"small"}/>
                        <Button type="default" shape="circle" icon={<LogoutOutlined/>} size={"small"} onClick={logout}/>
                    </div>
                </div>
                <Menu theme="light" defaultSelectedKeys={['home']} mode="inline" items={items}
                      onSelect={onSelectHandler}/>
            </Sider>
            <Layout>
                <Content
                    style={{padding: 20}}
                >
                    <Outlet/>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                </Footer>
            </Layout>
        </Layout>
    );
};
