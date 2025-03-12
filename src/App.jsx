import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import Layout from "./components/Layout";
import { CompareProvider } from "./context/CompareContext";

const App = () => {
    return (
        <CompareProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<ProductDetails />} />
                        <Route path="/compare" element={<CompareProducts />} />
                    </Routes>
                </Layout>
            </Router>
        </CompareProvider>
    );
};

export default App;
