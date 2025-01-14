import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CartHeader = () => {
    const { pathname } = useLocation()

    return (
        <header className={`bg-white z-999 border-b border-gray-300 w-full  ${pathname==="/cart/checkout" ? "block": "block"}`}>
            <div className="container-fluid mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="text-black md:text-xl text-sm font-bold no-underline font-poppins">
                        Veterinaria La Comercial
                    </Link>
                </div>
                    {/* Enlace al inicio */}
                <nav>
                    {pathname === '/cart' && (
                        <Link
                            to="/"
                            className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline font-questrial hover:underline"
                        >
                            Volver al inicio
                        </Link>

                    )}
                    {pathname === '/cart/checkout' && (
                        <Link
                            to="/cart"
                            className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline font-questrial hover:underline"
                        >
                            Volver al carrito
                        </Link>

                    )}

                </nav>
            </div>
        </header>
    );
};

export default CartHeader;
