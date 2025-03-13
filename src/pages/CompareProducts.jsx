import { useState, useContext, useEffect } from "react";
import { Button, Modal, notification } from "antd";
import { CompareContext } from "../context/CompareContext";
import ProductTable from "../Components/ProductTable";

const MAX_COMPARE_ITEMS = 4;

const CompareProducts = () => {
	const { compareList, removeFromCompare } = useContext(CompareContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Effect to auto-close the modal when max items are added
	useEffect(() => {
		if (compareList.length >= MAX_COMPARE_ITEMS && isModalOpen) {
			setIsModalOpen(false);
			notification.success({
				message: "Comparison Limit Reached",
				description: `You can compare up to ${MAX_COMPARE_ITEMS} products at once.`,
				placement: "top",
				duration: 3,
			});
		}
	}, [compareList, isModalOpen]);

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">Compare Products</h2>

			{compareList.length === 0 ? (
				<p>No products selected for comparison.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full border border-gray-200">
						<thead>
							<tr className="bg-gray-100">
								<th className="p-2">Attribute</th>
								{compareList.map((product) => (
									<th key={product.id} className="p-2">
										{product.title}
									</th>
								))}
							</tr>
						</thead>
						<tbody >
							{[
								"description",
								"price",
								"discountPercentage",
								"brand",
								"category",
							].map((attribute) => (
								<tr key={attribute} className="border-t">
									<td className="p-2 font-semibold capitalize">
										{attribute.replace(/([A-Z])/g, " $1")}
									</td>
									{compareList.map((product) => (
										<td key={product.id} className="p-2">
											{attribute === "price"
												? `$${product[attribute]}`
												: product[attribute] || "N/A"}
										</td>
									))}
								</tr>
							))}
							<tr className="border-t">
								<td className="p-2 font-semibold">Actions</td>
								{compareList.map((product) => (
									<td key={product.id} className="p-2">
										<Button
											type="danger"
											onClick={() => removeFromCompare(product.id)}
										>
											Remove
										</Button>
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			)}

			<Button
				type="primary"
				className="mt-4"
				onClick={() => setIsModalOpen(true)}
				disabled={compareList.length >= MAX_COMPARE_ITEMS}
			>
				Add More
			</Button>

			<Modal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				title="Add Products"
				width={800}
			>
				<div className="max-h-[400px] overflow-y-auto">
					<ProductTable filterOut={compareList} />
				</div>
			</Modal>
		</div>
	);
};

export default CompareProducts;
