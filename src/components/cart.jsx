import React, { useState } from 'react';
import TopInfo from './top';
import Nav from './nav';
import Footer from './footer';
import ItemCart from './item_cart';
import Cshop from './continue_shop';
import { useCart } from '../context/cart';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeItemFromCart, totalMonto, shippingCost, applyDiscount, discountCode, setDiscountCode,subtotal, discountAmount} = useCart();



    // Estado para manejar el código de descuento


    // Función para aplicar el descuento

    // Cálculo del total con descuento


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
                                <h4>Shopping Cart</h4>
                                <div className="breadcrumb__links">
                                    <a href="./index.html">Home</a>
                                    <a href="./shop.html">Shop</a>
                                    <span>Shopping Cart</span>
                                </div>
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
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        applyDiscount();
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                    />
                                    <button
                                        type="submit"
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
                                </form>
                            </div>
                            <div className="cart__total">
                                <h6>Total</h6>
                                <ul>
                                    <li>Subtotal <span>$ {subtotal}</span></li>
                                    <li>Descuento <span>- $ { discountAmount }</span></li>
                                  
                                    <li>Total <span>$ {totalMonto}</span></li>
                                </ul>
                                <Link
                                    to="/cart/checkout"
                                    className="primary-btn"
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
