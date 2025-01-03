import React, { useEffect, useState } from 'react';
import TopInfo from './top';
import Nav from './nav';
import Footer from './footer';
import ItemCart from './item_cart';
import Cshop from './continue_shop';
import { useCart } from '../context/cart';
import toast, { Toaster } from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import ItemCartTest from './item_cart_test';
import { useMediaQuery } from 'react-responsive';
import { SwiperSlide,Swiper } from 'swiper/react';
import ProductGrid from './product';
import { useCategories } from '../context/notifications';

const CartTest = () => {
    const { cartItems, removeItemFromCart } = useCart();
      const { destacados } = useCategories();
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




                                <section class="bg-white  antialiased dark:bg-gray-900">
                                    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">


                                        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">

                                                <div class="space-y-6 max-h-[600px] min-h-[600px] overflow-y-auto">


                                                    {cartItems.length > 0 ? cartItems.map((item, index) => (
                                                        <ItemCartTest

                                                            item={item}
                                                            key={index}
                                                            removeItemFromCart={removeItemFromCart}
                                                            toast={toast}
                                                        />
                                                    )) : <div className="flex flex-col items-center justify-center h-full">
                                                        <p className='text-center'>No hay productos en tu carrito aún.</p>
                                                        <Cshop />
                                                    </div>

                                                    }
                                                </div>















                                            </div>

                                        </div>
                                    </div>
                                </section>

































































                            </div>
                            {/*   <div className="row">
                                <Cshop />
                            </div> */}
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

            <div>
                <Toaster />
            </div>
        </>
    );
};

export default CartTest;
