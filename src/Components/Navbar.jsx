import { Layout, Avatar } from "antd";

const { Header } = Layout;

const Navbar = () => {
	return (
		<Header
			style={{
				background: "#fff",
				padding: "0 20px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				position:"fixed",
				top: "0"
			}}
		>
			<h2>Product App</h2>
			<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
				<div>John Doe</div>
				<Avatar src="https://placehold.co/40" />
			</div>
		</Header>
	);
};

export default Navbar;
