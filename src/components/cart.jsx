import React, { useEffect, useState } from 'react';
import TopInfo from './top';
import Nav from './nav';
import Footer from './footer';
import ItemCart from './item_cart';
import Cshop from './continue_shop';
import { useCart } from '../context/cart';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeItemFromCart } = useCart();
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const validCodes = { DESCUENTO10: 10, OFERTA20: 20 };

    // Función para aplicar el descuento
    const applyDiscount = () => {
        const discountValue = validCodes[discountCode.toUpperCase()];
        if (discountValue) {
            setDiscount(discountValue);
            toast.success(`Código aplicado: ${discountValue}% de descuento`);
        } else {
            setDiscount(0);
            toast.error('Código inválido');
        }
    };

    // Cálculo de totales
    const subtotal = cartItems.reduce(
        (acc, product) => acc + product.precio * (product.cantidad || 1),
        0
    );
    const discountAmount = (subtotal * discount) / 100;
    const shippingCost = 0; // Agregar lógica si es necesario
    const totalMonto = subtotal + shippingCost - discountAmount;


    const [objetoCompra, setObjectoCompra] = useState({
        cartItems: cartItems,
        shippingCost: 0, // Agregar lógica si es necesario
        totalMonto: totalMonto,
        discount: discountAmount,
        subtotal: subtotal,
        cupon_code: discountCode,
    });
    useEffect(() => {
        setObjectoCompra({
            cartItems: cartItems,
            shippingCost: shippingCost,
            totalMonto: totalMonto,
            discount: discountAmount,
            subtotal: subtotal,
            cupon_code: discountCode
        });
    }, [cartItems, discount, subtotal, discountAmount, totalMonto, discountCode]);
    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            <TopInfo />

            <header className="header">
                <Nav />
            </header>

            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Carrito</h4>
                               {/*  <div className="breadcrumb__links">
                                    <Link to={"/"}>Incio</Link>

                                    <span>Carrito</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="shopping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <ItemCart

                                                item={item}
                                                key={index}
                                                removeItemFromCart={removeItemFromCart}
                                                toast={toast}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <Cshop />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart__discount">
                                <h6>Código de descuento</h6>

                                <input
                                    type="text"
                                    placeholder="Ingresa el código"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button
                                    onClick={applyDiscount}
                                    type="button"
                                    style={{
                                        color: "#fff",
                                        borderRadius: "2px",
                                        fontWeight: "lighter",
                                        fontFamily: "questrial, sans-serif",
                                        letterSpacing: "1px",
                                        backgroundColor: "#af1010",
                                        border: "none",
                                        padding: "10px 20px",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                    }}
                                >
                                    Aplicar
                                </button>

                            </div>
                            <div className="cart__total w-full p-4 bg-gray-50  rounded-none flex flex-col items-start space-y-4">
                                <div className='border-b border-b-2 w-full'>

                                    <h6 className="text-xl font-semibold">Total</h6>
                                </div>
                                <ul className="space-y-2 w-full">
                                    <li className="flex justify-between">
                                        Subtotal <div>$ {subtotal}</div>
                                    </li>
                                    <hr />
                                    <li className="flex justify-between">
                                        Descuento <div>- $ {discountAmount}</div>
                                    </li>
                                    <hr />
                                    <li className="flex justify-between font-semibold text-gray-600">
                                        Total <div>$ {totalMonto}</div>
                                    </li>
                                </ul>
                                <Link
                                    
                                    state={objetoCompra}
                                    to="/cart/checkout"
                                    
                                    className="primary-btn no-underline mt-4 w-full text-center py-3 px-6 bg-red-700 text-white font-semibold rounded-none shadow-md hover:bg-red-700 transition duration-300"
                                >
                                    Ir al checkout
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">+</div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>
            <div>
                <Toaster />
            </div>
        </>
    );
};

export default Cart;
