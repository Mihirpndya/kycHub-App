import { useState, useEffect, useContext } from "react";
import { Table, Button, Spin } from "antd";
import { CompareContext } from "../context/CompareContext";

const ProductTable = ({ filterOut = [] }) => {
	const { compareList, addToCompare } = useContext(CompareContext);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((data) => {
				// Exclude products already in compareList
				const filteredProducts = data.products.filter(
					(product) => !filterOut.some((p) => p.id === product.id)
				);
				setProducts(filteredProducts);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [filterOut]);

	const columns = [
		{ title: "Title", dataIndex: "title", key: "title" },
		{ title: "Features", dataIndex: "description", key: "description" },
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: "Brand",
			dataIndex: "brand",
			key: "brand",
		},
		{
			title: "Action",
			key: "action",
			render: (_, product) => (
				<Button type="primary" onClick={() => addToCompare(product)}>
					Compare
				</Button>
			),
		},
	];

	return loading ? (
		<div className="flex items-center justify-center mt-8">
			<Spin size="large" />
			<p className="ml-2 text-gray-600">Loading products...</p>
		</div>
	) : (
		<div className="w-full h-[500px] overflow-hidden">
			<Table
				dataSource={products}
				columns={columns}
				pagination={false} // Disable pagination if you want full scrollability
				rowKey="id"
				scroll={{ y: 400 }} // Enables vertical scrolling inside the table
				className="min-w-[600px] sm:min-w-full"
			/>
		</div>
	);
};

export default ProductTable;
