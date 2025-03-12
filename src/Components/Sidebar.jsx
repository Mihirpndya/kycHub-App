import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
    const items = [
        { key: "1", label: <Link to="/">Product Details</Link> },
        { key: "2", label: <Link to="/compare">Compare Products</Link> }
    ];

    return (
        <Sider style={{ background: "#fff" }}>
            <Menu mode="vertical" items={items} />
        </Sider>
    );
};

export default Sidebar;
