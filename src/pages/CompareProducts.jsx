import { useContext } from "react";
import { CompareContext } from "../context/CompareContext";
import { Table, Button } from "antd";

const CompareProducts = () => {
    const { compareList, removeFromCompare } = useContext(CompareContext);

    const columns = [
        { title: "Feature", dataIndex: "feature", key: "feature" },
        ...compareList.map((product) => ({
            title: product.name,
            dataIndex: product.id,
            key: product.id
        }))
    ];

    const data = [
        { key: "brand", feature: "Brand", ...Object.fromEntries(compareList.map(p => [p.id, p.brand])) },
        { key: "price", feature: "Price", ...Object.fromEntries(compareList.map(p => [p.id, `$${p.price}`])) },
        { key: "category", feature: "Category", ...Object.fromEntries(compareList.map(p => [p.id, p.category])) }
    ];

    return (
        <>
            <Table dataSource={data} columns={columns} pagination={false} />
            {compareList.map(product => (
                <Button key={product.id} onClick={() => removeFromCompare(product.id)}>Remove {product.name}</Button>
            ))}
        </>
    );
};

export default CompareProducts;
