import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/apis';

const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0); // Porcentaje de descuento (ej. 10 para 10%)

    // Lista de códigos de descuento válidos (esto podría venir de una base de datos)
    const validCodes = {
        'DESCUENTO10': 10,
        'OFERTA20': 20,
    };
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
    const addItemToCart = (item, q) => {
        setCartItems((prevItems) => {
            // Verifica si el ítem ya está en el carrito
            const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex >= 0) {
                // Si el ítem ya está en el carrito, actualiza su cantidad
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + (q || 1),
                };
                return updatedItems;
            } else {
                // Si el ítem no está en el carrito, agrégalo con cantidad inicial (q o 1)
                return [...prevItems, { ...item, quantity: q || 1 }];
            }
        });
    };


    // Eliminar un artículo del carrito
    const removeItemFromCart = (itemId) => {
        // Actualizar el estado y eliminar el ítem
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter(item => item._id !== itemId);

            // Guardar el nuevo carrito actualizado en localStorage
            localStorage.setItem(`cartItems`, JSON.stringify(updatedItems));

            return updatedItems;
        });
    };

    // Vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };



    const applyDiscount = () => {
        if (validCodes[discountCode]) {
            setDiscount(validCodes[discountCode]);
        } else {
            setDiscount(0);

        }
    };
    const subtotal = cartItems.reduce((acc, product) => acc + product.precio * product.quantity, 0);

    // Cálculo del total (descuento y otros costos)
    const discountAmount = (subtotal * discount) / 100;
    const shippingCost = 0; // Puedes agregar lógica para calcular el envío
    const totalMonto = subtotal + shippingCost - discountAmount;


    // Contexto de valor
    const value = {
        applyDiscount,
        subtotal,
        discountCode,
        discountAmount,
        discount,
        setDiscountCode,
        totalMonto,
        shippingCost,
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
