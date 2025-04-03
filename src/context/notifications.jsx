import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_PROD, API_URL } from '../lib/apis';

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [destacados, setDestacados] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [articulos, setArticulos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Reutilizable función de fetch
    const fetchData = useCallback(async (url, options = {}, onSuccess = () => { }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, { ...options,mode:"cors", headers: { 'Content-Type': 'application/json', ...options.headers } });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Error fetching data');
                return;
            }
            const data = await response.json();
            onSuccess(data.data);
        } catch (err) {
            setError('Network or server error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!categories.length) {
            fetchData(`${API_PROD}/get-suppliers`, {}, setCategories);
        }
    }, [categories.length, fetchData]);

    useEffect(() => {
        fetchData(`${API_PROD}/get-destacados`, {}, setDestacados);
    }, [fetchData]);

    useEffect(() => {
        fetchData(`${API_PROD}/get-articles`, {}, setArticulos);
    }, [fetchData]);
    useEffect(() => {
        fetchData(`${API_PROD}/get-promotions`, {}, setPromociones);
    }, [fetchData]);

    const getData = useCallback(
        (category) => {
            fetchData(
                `${API_PROD}/productsbycategory`,
                { method: 'POST', body: JSON.stringify({ category }) },
                setProducts
            );
        },
        [fetchData]
    );

    useEffect(() => {
        if (!products.length) {
            fetchData(`${API_PROD}/productsbyproductstype`, {}, setProducts);
        }
    }, [products.length, fetchData]);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                getData,
                products,
                promociones,
                loading,
                error,
                setLoading,
                destacados,
                setError,
                articulos,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
}

export function useCategories() {
    return useContext(CategoriesContext);
}