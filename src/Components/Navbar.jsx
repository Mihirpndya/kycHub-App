import { Layout, Avatar } from "antd";

const { Header } = Layout;

const Navbar = () => {
    return (
        <Header style={{ background: "#fff", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Product App</h2>
            <Avatar src="https://via.placeholder.com/40" />
        </Header>
    );
};

export default Navbar;
