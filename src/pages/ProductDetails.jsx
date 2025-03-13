import { useState, useEffect, useContext, useMemo } from "react";
import { Table, Button, Skeleton, notification } from "antd";
import { CompareContext } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
	const { compareList, addToCompare, removeFromCompare } = useContext(CompareContext);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch("https://dummyjson.com/products?limit=20");
				const data = await response.json();
				setProducts(data.products);
			} catch (error) {
				notification.error({ message: "Error fetching products", description: error.message });
			} finally {
				setLoading(false);
			}
		};

		const timeout = setTimeout(fetchData, 500);
		return () => clearTimeout(timeout);
	}, []);

	const handleCompare = (product) => {
		if (compareList.some((p) => p.id === product.id)) {
			removeFromCompare(product.id);
		} else if (compareList.length < 4) {
			addToCompare(product);
			setTimeout(() => navigate("/compare"), 300);
		}
	};

	const columns = useMemo(
		() => [
			{
				title: "Title",
				dataIndex: "title",
				key: "title",
				render: (text) => <div style={{ padding: "12px" }}>{text}</div>,
			},
			{
				title: "Description",
				dataIndex: "description",
				key: "description",
				render: (text) => <div style={{ padding: "12px" }}>{text}</div>,
			},
			{
				title: "Price ($)",
				dataIndex: "price",
				key: "price",
				sorter: (a, b) => a.price - b.price,
				render: (price) => <div style={{ padding: "12px" }}>${price.toFixed(2)}</div>,
			},
			{
				title: "Discount (%)",
				dataIndex: "discountPercentage",
				key: "discountPercentage",
				sorter: (a, b) => a.discountPercentage - b.discountPercentage,
				render: (discount) => <div style={{ padding: "12px" }}>{discount.toFixed(1)}%</div>,
			},
			{
				title: "Brand",
				dataIndex: "brand",
				key: "brand",
				render: (brand) => <div style={{ padding: "12px" }}>{brand}</div>,
			},
			{
				title: "Action",
				key: "action",
				render: (_, product) => (
					<div style={{ padding: "12px" }}>
						<Button
							type={compareList.some((p) => p.id === product.id) ? "default" : "primary"}
							disabled={compareList.length >= 4 && !compareList.some((p) => p.id === product.id)}
							onClick={() => handleCompare(product)}
						>
							{compareList.some((p) => p.id === product.id) ? "Remove" : "Compare"}
						</Button>
					</div>
				),
			},
		],
		[compareList]
	);

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">Product List</h2>
			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 6 }).map((_, index) => (
						<Skeleton key={index} active />
					))}
				</div>
			) : (
				<div className="max-h-[500px] overflow-auto border rounded-lg shadow-md">
					<Table
						dataSource={products}
						columns={columns}
						rowKey="id"
						pagination={{ pageSize: 5 }}
						bordered
						// Highlighting rows for products in the compare list
						rowClassName={(record) =>
							compareList.some((p) => p.id === record.id) ? "bg-blue-100 font-semibold" : ""
						}
					/>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
