import { Layout, Menu, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
	MenuOutlined,
	AppstoreOutlined,
	SwapOutlined,
} from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { CompareContext } from "../context/CompareContext";
import { useMediaQuery } from "react-responsive";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
	const location = useLocation();
	const { compareList } = useContext(CompareContext);
	const MAX_COMPARE_ITEMS = 4;

	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	
	useEffect(() => {
		setCollapsed(isMobile);
	}, [isMobile, setCollapsed]);

	const getSelectedKey = () => (location.pathname === "/compare" ? "2" : "1");

	const menuItems = [
		{
			key: "1",
			icon: <AppstoreOutlined />,
			label: <Link to="/">Product Details</Link>,
		},
		{
			key: "2",
			icon: <SwapOutlined />,
			label: (
				<Link to="/compare">
					Compare ({compareList.length}/{MAX_COMPARE_ITEMS})
				</Link>
			),
		},
	];

	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				breakpoint="md"
				collapsedWidth={isMobile ? 60 : 80} 
				width={220}
				style={{
					position: "fixed",
					left: 0,
					height: "100vh",
					zIndex: 1000,
					background: "#fff",
					transition: "all 0.3s ease-in-out",
				}}
			>
				<Menu
					mode="vertical"
					items={menuItems}
					selectedKeys={[getSelectedKey()]}
				/>
			</Sider>
		</>
	);
};

export default Sidebar;
