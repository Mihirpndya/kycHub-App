import { Layout as AntLayout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const { Content } = AntLayout;

const Layout = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<AntLayout style={{ minHeight: "100vh" }}>
			<Navbar />
			<AntLayout style={{ marginLeft: collapsed ? 80 : 220, transition: "margin 0.3s ease" }}> 
				<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
				<Content style={{ padding: "20px", marginLeft: collapsed ? "5px" : "0px", transition: "margin 0.3s ease" }}>
					{children}
				</Content>
			</AntLayout>
		</AntLayout>
	);
};

export default Layout;
