import { createContext, useContext, useState, useEffect } from 'react';

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función para obtener notificaciones, memorizada para evitar redefinirla en cada render
    useEffect(() => {
        const getSuppliers = async () => {
            if (categories.length > 0) return; // Evita volver a cargar categorías si ya existen
            try {
                const response = await fetch(`http://localhost:3001/api/get-suppliers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    credentials: 'include',
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error fetching categories:', errorData.error);
                    return;
                }
    
                const data = await response.json();
                setCategories(data.data); // Actualiza las categorías
            } catch (error) {
                console.error('Network or server error:', error);
            }
        };
    
        getSuppliers();
    }, [categories]); // Evita llamar repetidamente si ya tienes las categorías
    

  
    
    const getData = async (category) => {
        setLoading(true); // Indicador de carga mientras se espera la respuesta
        setError(null); // Reinicia cualquier error previo
    
        try {
            const response = await fetch(`http://localhost:3001/api/productsbycategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: category }),
                mode: 'cors',
                credentials: 'include',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching products:', errorData.error);
                setError(errorData.error); // Actualiza el estado de error
                setLoading(false);
                return;
            }
    
            const data = await response.json();
            setProducts(data.data); // Actualiza el estado con los productos
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch products.'); // Manejo de error general
        } finally {
            setLoading(false); // Detén el indicador de carga al finalizar
        }
    };

    return (
        <CategoriesContext.Provider value={{ categories, getData, products, loading }}>
            {children}
        </CategoriesContext.Provider>
    );
}

export function useCategories() {
    return useContext(CategoriesContext);
}
