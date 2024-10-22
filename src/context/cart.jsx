import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/apis';

const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // Cargar carrito desde localStorage cuando se monta el componente
    useEffect(() => {

        const storedCartItems = localStorage.getItem(`cartItems`);
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        // Guardar carrito en localStorage cuando cartItems cambia y el usuario está autenticado

        localStorage.setItem(`cartItems`, JSON.stringify(cartItems));

    }, [cartItems]);


    // Añadir un artículo al carrito con el ID del usuario
    const addItemToCart = (item) => {

        setCartItems((prevItems) => {
            // Verifica si el ítem ya está en el carrito
            const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex >= 0) {
                // Si el ítem ya está en el carrito, actualiza su cantidad
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + item.quantity,
                };
                return updatedItems;
            } else {
                // Si el ítem no está en el carrito, agrégalo con el userId
                return [...prevItems, { ...item }];
            }
        });
    };

    // Eliminar un artículo del carrito
    const removeItemFromCart = (itemId) => {
        // Actualizar el estado y eliminar el ítem
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter(item => item.id !== itemId);

            // Guardar el nuevo carrito actualizado en localStorage
            localStorage.setItem(`cartItems`, JSON.stringify(updatedItems));

            return updatedItems;
        });
    };

    // Vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Contexto de valor
    const value = {
        isAuthenticated,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Hook para usar el contexto
export function useCart() {
    return useContext(CartContext);
}
