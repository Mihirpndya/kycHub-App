import { Layout as AntLayout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const { Content } = AntLayout;

const Layout = ({ children }) => {
	return (
		<AntLayout style={{ minHeight: "100vh" }}>
			<Navbar />

			<AntLayout>
				<Sidebar />
				<Content style={{ padding: "20px" }}>{children}</Content>
			</AntLayout>
		</AntLayout>
	);
};

export default Layout;
