import { useState } from 'react';
import { useSearch } from '../context/search';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/notifications';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 640 }); // Verificar si es móvil

    const categories = ["Ropa"];
    const { setOpenSearch } = useSearch();
    const { getData } = useCategories();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white">
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo a la izquierda */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-black text-2xl font-bold">
                            MiLogo
                        </a>
                    </div>
                    {isMenuOpen && (
                        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50">
                            <div className="p-4">

                                {/* Aquí puedes agregar los enlaces del menú */}
                                <nav>
                                    <a href="/enlace1" className="block mt-2">Enlace 1</a>
                                    <a href="/enlace2" className="block mt-2">Enlace 2</a>
                                    <a href="/enlace3" className="block mt-2">Enlace 3</a>
                                </nav>
                            </div>
                        </div>
                    )}
                    {/* Menú principal */}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Inicio
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

                                    {isOpen && (
                                        <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1">
                                                {categories.map((category, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`/shop`}
                                                        onClick={() => getData(category)}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-400"
                                                    >
                                                        {category}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Íconos a la derecha */}
                    <div className="flex items-center space-x-4">
                        {/* Icono de buscar */}
                        <button className="text-black focus:outline-none" onClick={() => setOpenSearch(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-search">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                        </button>

                        {/* Icono de carrito */}
                        <button className="text-black focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-shopping-bag">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                            </svg>
                        </button>

                        {/* Icono de menú, visible solo en mobile */}

                        {isMobile && (
                            <button onClick={toggleMenu} className="text-black focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-menu-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 6h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 18h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
