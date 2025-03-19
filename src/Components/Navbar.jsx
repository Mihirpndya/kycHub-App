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
			    position: "sticky", // changed from "fixed" to "sticky"
			    top: "0",
			    zIndex: 10, // optional: to ensure the header stays above other content
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
