import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
const MMobile = ({ products, setIsMenuOpen }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (index) => {
        setExpandedCategory((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="menu-mobile w-full fixed inset-0 z-50  bg-black bg-opacity-50 flex ">
            {/* Contenedor del Menú */}
            <div className="bg-white w-full h-full flex flex-col shadow-lg ">
                {/* Encabezado */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  {/*   <h2 className="text-xl font-bold text-gray-800">Menú</h2> */}
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        aria-label="Cerrar menú"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* Contenido */}
                <div className="flex-1 overflow-y-auto">
                    <nav className="space-y-4 text-left px-4">
                      
                        <Link
                            to="/servicios"
                            className="block text-lg font-medium text-gray-800 py-2 hover:text-gray-600 transition duration-200 font-questrial no-underline"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            SERVICIOS
                        </Link>
                        <Link
                            to="/blog"
                            className="block text-lg font-medium text-gray-800 py-2 hover:text-gray-600 transition duration-200 font-questrial no-underline"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            BLOG
                        </Link>
                    </nav>

                    {/* Categorías de Productos */}
                    <div className="mt-6">
                        {products.map((category, i) => (
                            <div key={i} className="mb-4">
                                <button
                                    className="w-full text-left px-4 flex items-center justify-between font-poppins text-lg font-semibold text-gray-800 py-2 hover:text-gray-800 transition duration-200"
                                    onClick={() => toggleCategory(i)}
                                >
                                    {category.productoTipo.toUpperCase()}
                                    <span>
                                    {expandedCategory === i ? <MdOutlineKeyboardArrowUp/>  : <MdOutlineKeyboardArrowDown />}
                                    </span>
                                </button>
                                <div
                                    className={`transition-all  duration-300 ease-in-out overflow-hidden ${
                                        expandedCategory === i ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <ul
                                        className={`mt-2 space-y-2  bg-gray-100  border-gray-300 transform transition-transform duration-300 ease-in-out ${
                                            expandedCategory === i ? "translate-x-0" : "translate-x-full"
                                        }`}
                                    >
                                        {category.categorias.map((product, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={`/shop/${category.productoTipo}/${product}`}
                                                    className="block text-gray-600  no-underline hover:text-gray-800 transition duration-300 py-1 font-questrial text-left"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {product.toUpperCase()}
                                                </Link>
                                              
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Ecommerce. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MMobile;
