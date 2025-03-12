import { createContext, useState } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);

    const addToCompare = (product) => {
        if (!compareList.some(p => p.id === product.id) && compareList.length < 4) {
            setCompareList([...compareList, product]);
        }
    };

    const removeFromCompare = (id) => {
        setCompareList(compareList.filter(p => p.id !== id));
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare }}>
            {children}
        </CompareContext.Provider>
    );
};
