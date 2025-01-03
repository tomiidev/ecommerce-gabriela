import { Link } from "react-router-dom";
import { useState } from "react";

const MMobile = ({ products, setIsMenuOpen }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (index) => {
        setExpandedCategory((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="menu-mobile fixed inset-0 z-50 bg-black bg-opacity-50 flex">
            {/* Contenedor del Menú */}
            <div className="bg-white w-full h-full flex flex-col shadow-lg">
                {/* Encabezado */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Menú</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        aria-label="Cerrar menú"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* Contenido */}
                <div className="flex-1 overflow-y-auto p-4">
                    <nav className="space-y-4 text-left">
                        <Link
                            to="/"
                            className="block text-lg font-medium text-gray-800 py-2 hover:text-gray-600 transition duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/servicios"
                            className="block text-lg font-medium text-gray-800 py-2 hover:text-gray-600 transition duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Servicios
                        </Link>
                        <Link
                            to="/blog"
                            className="block text-lg font-medium text-gray-800 py-2 hover:text-gray-600 transition duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                    </nav>

                    {/* Categorías de Productos */}
                    <div className="mt-6">
                        {products.map((category, i) => (
                            <div key={i} className="mb-4">
                                <button
                                    className="w-full text-left flex items-center justify-between text-lg font-semibold text-gray-800 py-2 hover:text-gray-800 transition duration-200"
                                    onClick={() => toggleCategory(i)}
                                >
                                    {category.productoTipo.charAt(0).toUpperCase() + category.productoTipo.slice(1)}
                                    <span>
                                        {expandedCategory === i ? "−" : "+"}
                                    </span>
                                </button>
                                {expandedCategory === i && (
                                    <ul className="mt-2 space-y-2 pl-4 border-l-2 border-gray-300">
                                        {category.categorias.map((product, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={`/shop/${category.productoTipo}/${product}`}
                                                    className="block text-gray-600 hover:text-gray-800 transition duration-200"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {product.charAt(0).toUpperCase() + product.slice(1)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
