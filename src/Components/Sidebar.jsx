import { Layout, Menu, Button, Badge } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CompareContext } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const { compareList } = useContext(CompareContext);
	const navigate = useNavigate();
	const MAX_COMPARE_ITEMS = 4;

	// Determine which menu item should be selected based on the current path
	const getSelectedKey = () => {
		if (currentPath === "/") return "1";
		if (currentPath === "/compare") return "2";
		return "";
	};

	const handleRedirectToCompare = () => {
		if (compareList.length > 0) {
			navigate("/compare");
		} else {
			notification.info({
				message: "No products to compare",
				description: "Please add at least one product to the comparison list.",
				placement: "top",
				duration: 2,
			});
		}
	};

	const items = [
		{ key: "1", label: <Link to="/">Product Details</Link> },
		{
			key: "2",
			label: (
				<Link to="/compare">
					Compare Products ({compareList.length}/{MAX_COMPARE_ITEMS})
				</Link>
			),
		},
	];

	return (
		<Sider style={{ background: "#fff" }}>
			<Menu mode="vertical" items={items} selectedKeys={[getSelectedKey()]} />
		</Sider>
	);
};

export default Sidebar;
