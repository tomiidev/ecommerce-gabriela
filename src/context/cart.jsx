import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/apis';

const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
/*     const [discountCode, setDiscountCode] = useState(''); */
/*     const [discount, setDiscount] = useState(0); // Porcentaje de descuento (ej. 10 para 10%)
 */
    // Lista de códigos de descuento válidos (esto podría venir de una base de datos)
/*     const validCodes = {
        'DESCUENTO10': 10,
        'OFERTA20': 20,
    }; */
    // Cargar carrito desde localStorage cuando se monta el componente
    /*     useEffect(() => {
    
            const storedCartItems = localStorage.getItem(`cartItems`);
            if (storedCartItems) {
                setCartItems(JSON.parse(storedCartItems));
            }
        }, []);
    
     */
    useEffect(() => {
        try {
            const storedCartItems = localStorage.getItem(`cartItems`);
            setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
        } catch (error) {
            console.error("Error al cargar el carrito desde localStorage:", error);
            setCartItems([]);
        }
    }, []);





    useEffect(() => {
        // Guardar carrito en localStorage cuando cartItems cambia y el usuario está autenticado

        localStorage.setItem(`cartItems`, JSON.stringify(cartItems));

    }, [cartItems]);

    const addItemToCart = (item) => {
        // Verificar si el producto ya existe en el carrito (incluyendo sus variantes)
        const productoExistente = cartItems.find(
            (producto) => producto.id === item.id &&
                producto.color === item.color &&
                producto.peso === item.peso /* &&
                producto.precio === item.precio &&
                producto.peso === item.peso */
        );

        if (productoExistente) {    
            // Si existe, actualizar su cantidad
            setCartItems((prevItems) =>
                prevItems.map((producto) =>
                    producto.id === item.id &&
                    producto.color === item.color &&
                    producto.peso === item.peso
                        ? { ...producto, cantidad: producto.cantidad + item.cantidad }
                        : producto
                )
            );
           /*  setCartItems(
                cartItems.map((producto) =>
                    producto.id === item.id &&
                        producto.color === item.color &&
                        producto.peso === item.peso
                        ? { ...producto, cantidad: producto.cantidad + item.cantidad }
                        : producto
                )
            ); */
        } else {
            // Si no existe, agregarlo como un nuevo producto
            setCartItems((prevItems) => [
                ...prevItems,
                { ...item },
            ]);
           /*  setCartItems([
                ...cartItems,
                {
                    id: item.id,
                    titulo: item.titulo,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    color: item.color,
                    imagen: item.imagen,
                    peso: item.peso,
                },
            ]); */
        }
    };


    console.log(cartItems)


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



/*     const applyDiscount = () => {
        if (validCodes[discountCode]) {
            setDiscount(validCodes[discountCode]);
        } else {
            setDiscount(0);

        }
    };
    const subtotal = cartItems.reduce((acc, product) => acc + product.precio * (product.cantidad || 1), 0);

    // Cálculo del total (descuento y otros costos)
    const discountAmount = (subtotal * discount) / 100;
    const shippingCost = 0; // Puedes agregar lógica para calcular el envío
    const totalMonto = subtotal + shippingCost - discountAmount;
 */

    // Contexto de valor
    const value = {
       /*  applyDisc *//* ount, */
       /*  subtotal, */
      /*   discountCode, */
    /*     discountAmount, */
       /*  discount, */
      /*   setDiscountCode, */
      /*   totalMonto,
        shippingCost, */
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
