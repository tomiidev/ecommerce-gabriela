import React, { useCallback, useEffect, useState } from 'react';
import TopInfo from './top';
import Nav from './nav';
import Footer from './footer';
import ItemCartTest from './item_cart_test';
import Cshop from './continue_shop';
import { useCart } from '../context/cart';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import HeaderCart from './header_cart';
import { CartDrawer } from './drawer';
import DiscountAndTotal from './discount_and_total';


const CartTest = () => {
    const [showCouponInput, setShowCouponInput] = useState(false);
    const { cartItems, removeItemFromCart } = useCart();
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [totalMonto, setTotalMonto] = useState(0);
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const validCodes = { d: 50 }; // Ejemplo de código de descuento
    const nv = useNavigate();

    // Función para calcular el subtotal


    const [subtotal, setSubTotal] = useState(cartItems.reduce(
        (acc, product) => acc + product.precio * (product.cantidad || 1),
        0
    ))
    // Función para recalcular el total (con el descuento aplicado sobre el total)
    const recalculate = useCallback(() => {

        const shippingCost = 0; // Costo de envío (por ahora es 0)

        // El descuento se aplica al total, no al subtotal
        const discountAmount = (subtotal * discount) / 100;
        const newTotalMonto = subtotal + shippingCost - discountAmount;

        // Actualizar el totalMonto con el descuento aplicado
        setTotalMonto(newTotalMonto);
    }, [discount, subtotal])

    const applyDiscount = () => {
        const discountValue = validCodes[discountCode];
        if (discountValue) {
            setDiscount(discountValue); // Establece el valor del descuento
            setShowCouponInput(false); // Oculta la caja de código de descuento
            setIsDiscountApplied(true);
            toast.success(`Código aplicado: ${discountValue}% de descuento`);
        } else {
            setDiscount(0); // Resetea el descuento si el código no es válido
            toast.error('Código inválido');
        }
    };

    // Recalcular valores cada vez que cartItems, discountCode o discount cambian
    useEffect(() => {
        recalculate(); // Recalcular totalMonto con descuento aplicado
    }, [discountCode, discount, cartItems, recalculate]);
    useEffect(() => {
        setSubTotal(cartItems.reduce(
            (acc, product) => acc + product.precio * (product.cantidad || 1),
            0
        ));
    }, [cartItems]);
    // Calcular el monto del descuento para la renderización
    const discountAmount = (subtotal * discount) / 100;

    // Actualizar objetoCompra con los valores actuales
    useEffect(() => {
        setObjectoCompra({
            cartItems,
            shippingCost: 0,
            totalMonto,
            discount: discountAmount,
            subtotal: subtotal,
            cupon_code: discountCode,
        });
    }, [cartItems, discount, subtotal, discountAmount, totalMonto, discountCode]);

    const [objetoCompra, setObjectoCompra] = useState({
        cartItems,
        shippingCost: 0,
        totalMonto: totalMonto,
        discount: discountAmount,
        subtotal: subtotal,
        cupon_code: discountCode,
    });

    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            <HeaderCart />
            <section className="shopping-cart z-0">
                <div className="container-fluid">
                    <div className="row">
                        {/* Primera columna */}
                        <div className="col-lg-7 ml-auto">
                            <div className="shopping__cart__table">
                                <section className="bg-white antialiased dark:bg-gray-900">
                                    <div className="mx-auto max-w-screen-xl  px-4">
                                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl h-screen">
                                                <div className="space-y-6 max-h-[600px] min-h-[600px] overflow-y-auto">
                                                    {cartItems.length > 0 ? (
                                                        cartItems.map((item, index) => (
                                                            <ItemCartTest
                                                                product={item}
                                                                cantidad={item.cantidad}
                                                                item={item}
                                                                key={index}
                                                                removeItemFromCart={removeItemFromCart}
                                                                toast={toast}
                                                            />
                                                        ))
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center h-full">
                                                            <p className="text-center font-poppins">
                                                                No hay productos en tu carrito aún.
                                                            </p>
                                                            <Cshop />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* El Drawer solo se muestra en móvil */}
                        <div className="block lg:hidden col-lg-4">
                            <CartDrawer
                                cartItems={cartItems}
                                discountCode={discountCode}
                                isDiscountApplied={isDiscountApplied}
                                showCouponInput={showCouponInput}
                                setShowCouponInput={setShowCouponInput}
                                validCodes={validCodes}
                                setDiscountCode={setDiscountCode}
                                applyDiscount={applyDiscount}
                                subtotal={subtotal}
                                discountAmount={discountAmount}
                                totalMonto={totalMonto}
                                onCheckout={() => nv("/cart/checkout", { state: objetoCompra })}
                                objetoCompra={objetoCompra}
                            />
                        </div>

                        {/* Segunda columna: Solo visible en pantallas grandes */}
                        <div className="hidden sm:block col-lg-4 bg-gray-100 lg:min-h-screen flex flex-col ">
                            {/* Contenedor de contenido (resumen y descuento) */}
                            <div className="container mx-auto  mt-5 flex-grow">
                                <DiscountAndTotal
                                    isDiscountApplied={isDiscountApplied} // Pasar el estado como prop
                                    showCouponInput={showCouponInput}
                                    subtotal={subtotal}
                                    discountAmount={discountAmount}
                                    totalMonto={totalMonto}
                                    applyDiscount={applyDiscount}
                                    discountCode={discountCode}
                                    setDiscountCode={setDiscountCode}
                                    cartItems={cartItems}
                                />
                                <div className="py-6 mt-auto">
                                    <button
                                       /*  disabled={true} */
                                        disabled={cartItems.length === 0}
                                        onClick={() => nv("/cart/checkout", { state: objetoCompra })}
                                        className={`block w-full text-center py-3  text-white rounded-sm no-underline transition font-questrial font-light ${cartItems.length === 0 ? "bg-gray-400" : "bg-red-700 hover:bg-red-800"}`}
                                    >
                                        Ir al checkout
                                    </button>
                                </div>
                            </div>

                            {/* Contenedor con el botón de checkout, asegurando que esté en el "piso" */}
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <Toaster />
            </div>
        </>
    );
};

export default CartTest;
