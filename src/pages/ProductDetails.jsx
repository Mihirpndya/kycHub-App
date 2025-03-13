import { useState, useEffect, useContext, useMemo } from "react";
import { Table, Button, Skeleton, notification, Tag } from "antd";
import { CompareContext } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ProductDetails = () => {
	const { compareList, addToCompare, removeFromCompare } =
		useContext(CompareContext);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch("https://dummyjson.com/products?limit=20");
				const data = await response.json();
				setProducts(data.products);
			} catch (error) {
				notification.error({
					message: "Error fetching products",
					description: error.message,
				});
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

	
	const columns = useMemo(() => {
		const baseColumns = [
			{
				title: "Title",
				dataIndex: "title",
				key: "title",
				render: (text, product) => (
					<div className="p-2 flex items-center gap-2 text-sm md:text-base">
						<span>{text}</span>
						{compareList.some((p) => p.id === product.id) && (
							<Tag color="blue">In Compare</Tag>
						)}
					</div>
				),
			},
			{
				title: "Price ($)",
				dataIndex: "price",
				key: "price",
				sorter: (a, b) => a.price - b.price,
				render: (price) => (
					<div className="p-2 text-sm md:text-base">${price.toFixed(2)}</div>
				),
			},
			{
				title: "Action",
				key: "action",
				render: (_, product) => (
					<div className="p-2">
						<Button
							type={
								compareList.some((p) => p.id === product.id)
									? "default"
									: "primary"
							}
							size={isMobile ? "small" : "middle"}
							className="w-full md:w-auto"
							disabled={
								compareList.length >= 4 &&
								!compareList.some((p) => p.id === product.id)
							}
							onClick={() => handleCompare(product)}
						>
							{compareList.some((p) => p.id === product.id)
								? "Remove"
								: "Compare"}
						</Button>
					</div>
				),
			},
		];

		if (!isMobile) {
			baseColumns.splice(1, 0, {
				title: "Features",
				dataIndex: "description",
				key: "description",
				render: (text) => <div className="p-2">{text}</div>,
			});

			baseColumns.splice(3, 0, {
				title: "Discount (%)",
				dataIndex: "discountPercentage",
				key: "discountPercentage",
				sorter: (a, b) => a.discountPercentage - b.discountPercentage,
				render: (discount) => <div className="p-2">{discount.toFixed(1)}%</div>,
			});
		}

		return baseColumns;
	}, [compareList, isMobile]);

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
				<div className="overflow-x-auto max-h-[500px] border rounded-lg shadow-md">
					<Table
						dataSource={products}
						columns={columns}
						rowKey="id"
						pagination={{ pageSize: isMobile ? 3 : 5 }}
						bordered
						rowClassName={(record) =>
							compareList.some((p) => p.id === record.id)
								? "bg-blue-100 font-semibold"
								: ""
						}
					/>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
