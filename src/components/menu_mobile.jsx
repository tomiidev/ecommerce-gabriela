import { Link } from "react-router-dom";

const MMobile = ({ toggleDropdown, products, setIsMenuOpen }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-screen"> {/* Fondo semitransparente con altura completa */}
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full h-full flex flex-col items-center justify-center space-y-6 overflow-y-auto"> {/* Contenedor principal centrado y ocupando toda la pantalla */}
                <Link
                    to="/"
                    className="text-lg font-medium text-gray-800 w-full text-center py-3 rounded-md  hover:bg-gray-200 transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Inicio
                </Link>
                <Link
                    to="/servicios"
                    className="text-lg font-medium text-gray-800 w-full text-center py-3 rounded-md  hover:bg-gray-200 transition duration-200"
                   
                >
                    Servicios
                </Link>
                <Link
                    to="/blog"
                    className="text-lg font-medium text-gray-800 w-full text-center py-3 rounded-md  hover:bg-gray-200 transition duration-200"
                   
                >
                    Blog
                </Link>
          {/*       <button
                    className="text-lg font-medium text-gray-800 w-full text-center py-3 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200"
                    onClick={toggleDropdown} // Añade funcionalidad aquí si se desea.
                >
                    Explorar categorías
                </button>
 */}
                <div className="w-full space-y-4">
                    {products.map((category, i) => (
                        <div key={i} className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800  pb-1">
                                {category.productoTipo.charAt(0).toUpperCase() + category.productoTipo.slice(1)}
                            </h3>
                            <ul className="space-y-1 pl-2">
                                {category.categorias.map((product, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/shop/${category.productoTipo}/${product}`}
                                            className="block text-gray-600 hover:text-gray-800 hover:pl-2 transition-all duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {product.charAt(0).toUpperCase() + product.slice(1)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MMobile;
