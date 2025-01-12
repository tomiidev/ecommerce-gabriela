import { useState, useEffect } from "react";
import { useSearch } from "../context/search";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../context/notifications";
import { useMediaQuery } from "react-responsive";
import MMobile from "./menu_mobile";
import { useCart } from "../context/cart";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import TopInfo from "./top";
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
        <div className="w-full z-999">
            <TopInfo />
            <nav className="bg-white border border-b">
                <div className="container px-4  py-1 mx-auto justify-center ">
                    <div className="relative flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-black md:text-xl text-sm font-bold no-underline font-poppins">
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
                                        className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline font-poppins"
                                    >
                                        SERVICIOS
                                    </Link>
                                    <Link
                                        to="/blog"
                                        className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium no-underline font-poppins"
                                    >
                                        BLOG
                                    </Link>

                                    {/* Dropdown de Categorías */}
                                    <div className="relative">
                                        <button
                                            onClick={toggleDropdown}
                                            className="text-black px-3 py-2 rounded-md text-sm font-medium flex items-center font-poppins"
                                        >
                                            EXPLORAR CATEGORÍAS
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
                                                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${products.length}`}>

                                                    {products.length > 0 ? products.map((category, i) => (
                                                        <div key={i} className="w-full">
                                                            <h3 className="text-lg  text-gray-700 mb-2 text-left font-poppins">
                                                                {category.productoTipo.toUpperCase()}
                                                            </h3>
                                                            <div className="space-y-1 text-left">
                                                                {category.categorias.map((product, index) => (
                                                                    <p key={index}>
                                                                        <Link
                                                                            to={`/shop/${category.productoTipo}/${product}`}
                                                                            className="text-gray-600 hover:text-gray-700 no-underline font-questrial relative group"
                                                                        >
                                                                            <span className="relative pb-1">{/* Agregamos padding-bottom para separar */}
                                                                                {product.toUpperCase()}
                                                                            </span>
                                                                            {/* Efecto del borde inferior */}
                                                                            <span className="absolute left-0 bottom-[-5px] h-[2px] w-0 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                                                                        </Link>
                                                                    </p>
                                                                ))}
                                                            </div>



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
                                <CiSearch className="text-2xl" />
                            </button>

                            <div className="relative">
                                <button
                                    className="text-black focus:outline-none"
                                    onClick={() => navigate("/cart")}
                                >
                                    <IoBagHandleOutline className="text-2xl" />
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
        </div>

    )
};

export default Navbar;
