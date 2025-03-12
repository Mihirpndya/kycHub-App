import { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import { CompareContext } from "../context/CompareContext";

const ProductTable = () => {
    const { compareList, addToCompare } = useContext(CompareContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const mockProducts = [
            { id: 1, name: "iPhone 15", brand: "Apple", price: 999, category: "Smartphone" },
            { id: 2, name: "Galaxy S23", brand: "Samsung", price: 899, category: "Smartphone" },
            { id: 3, name: "Pixel 7", brand: "Google", price: 799, category: "Smartphone" }
        ];
        setProducts(mockProducts);
    }, []);

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Brand", dataIndex: "brand", key: "brand" },
        { title: "Price", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price },
        { title: "Category", dataIndex: "category", key: "category" },
        { 
            title: "Action", 
            key: "action", 
            render: (_, product) => (
                <Button 
                    type="primary" 
                    disabled={compareList.some(p => p.id === product.id)} 
                    onClick={() => addToCompare(product)}
                >
                    Compare
                </Button>
            )
        }
    ];

    return <Table dataSource={products} columns={columns} pagination />;
};

export default ProductTable;
