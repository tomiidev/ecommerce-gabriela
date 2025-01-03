import { useState, useEffect } from "react";
import { useSearch } from "../context/search";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../context/notifications";
import { useMediaQuery } from "react-responsive";
import MMobile from "./menu_mobile";
import { useCart } from "../context/cart";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 640 }); // Detectar dispositivos móviles
    const navigate = useNavigate();
    const { setOpenSearch } = useSearch();
    const { products } = useCategories();
    const { cartItems } = useCart()
    const [cartCount, setCartCount] = useState(cartItems.length); // Puedes conectar esto con el estado real del carrito

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verifica si el clic ocurrió fuera del menú móvil
            if (
                !event.target.closest(".menu-mobile") && // Clase asociada al contenedor del menú móvil
                !event.target.closest(".menu-button")    // Botón del menú
            ) {
                setIsMenuOpen(false);
            }
        };
    
        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMenuOpen]);
    

    return (
        (
            <nav className="bg-white border border-b">
                <div className="container mx-auto justify-center ">
                    <div className="relative flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-black md:text-2xl text-sm font-bold no-underline">
                                Veterinaria La Comercial
                            </Link>
                        </div>

                        {/* Menú principal en pantallas grandes */}
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {/*  <Link
                                        to="/"
                                        className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline"
                                    >
                                        Inicio
                                    </Link> */}
                                    <Link
                                        to="/servicios"
                                        className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline"
                                    >
                                        Servicios
                                    </Link>
                                    <Link
                                        to="/blog"
                                        className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline"
                                    >
                                        Blog
                                    </Link>

                                    {/* Dropdown de Categorías */}
                                    <div className="relative">
                                        <button
                                            onClick={toggleDropdown}
                                            className="text-black px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                        >
                                            Explorar categorías
                                            <svg
                                                className="-mr-1 ml-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {/* Menú desplegable */}
                                        {isOpen && (
                                            <div className="absolute bg-white border border-gray-200 shadow-md mt-2 rounded-none p-4 z-50 w-full sm:w-[600px] md:w-[900px] ">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">

                                                    {products.length > 0 ? products.map((category, i) => (
                                                        <div key={i} className="w-full">
                                                            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-left">
                                                                {category.productoTipo.charAt(0).toUpperCase() + category.productoTipo.slice(1)}
                                                            </h3>
                                                            <ul className="space-y-1 text-left">
                                                                {category.categorias.map((product, index) => (
                                                                    <li key={index}>
                                                                        <Link
                                                                            to={`/shop/${category.productoTipo}/${product}`}
                                                                            className="text-gray-600 hover:text-gray-700 no-underline"
                                                                        >
                                                                            {product.charAt(0).toUpperCase() + product.slice(1)}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )) : <p>Cargando...</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Íconos a la derecha */}
                        <div className="flex items-center space-x-4">
                            <button
                                className="text-black focus:outline-none"
                                onClick={() => setOpenSearch(true)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-search"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </button>

                            <div className="relative">
                                <button
                                    className="text-black focus:outline-none"
                                    onClick={() => navigate("/cart")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icon-tabler-shopping-bag"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                        <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                                    </svg>
                                </button>
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                        {cartCount}
                                    </span>
                                )}
                            </div>

                            {/* Menú móvil */}
                            {
                                isMobile && (

                                    <button
                                        onClick={toggleMenu}
                                        className="text-black focus:outline-none menu-button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon icon-tabler icon-tabler-menu-2"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 6h16" />
                                            <path d="M4 12h16" />
                                            <path d="M4 18h16" />
                                        </svg>
                                    </button>
                                )
                            }
                        </div>
                    </div>
               
                    {/* Menú móvil desplegable */}
                    {isMenuOpen && (
                        <MMobile setIsMenuOpen={setIsMenuOpen} /* isOpen={isOpen} */ products={products} toggleDropdown={toggleDropdown} />
                    )}
                </div>
            </nav>

        ))
};

export default Navbar;
