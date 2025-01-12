import { Link, NavLink, useLocation } from "react-router-dom";
import Nav from "./nav";
import TopInfo from "./top";
import SearchBar from "./search_bar";
import { useCategories } from "../context/notifications";
import { useCallback, useEffect, useState } from "react";
import ProductGrid from "./product";
import Pagination from "./pagination";
import { API_PROD, API_URL } from "../lib/apis";
import Footer from "./footer";
import { FiltersDrawer } from "./filters";

const SearchResults = () => {
    const { loading, setLoading, setError } = useCategories();
    const [open, setOpen] = useState(false); // Controlar el estado del drawer

    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 20000]); // Estado para el rango de precios (por defecto 0-250)
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Mantener el acordeón de precios abierto
    const [isAccordionOpenColor, setIsAccordionOpenColor] = useState(true); // Mantener el acordeón de colores abierto
    const location = useLocation();

    const openDrawer = () => {
        setOpen(!open)
    };

    useEffect(() => {
        // Obtener el parámetro "query" de la URL
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get("query");

        if (searchQuery) {
            // Enviar una solicitud POST con el parámetro
            fetch(`${API_PROD}/registersearch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: searchQuery }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setProducts(data.data); // Guardar los resultados en el estado
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [location.search, setLoading]); // Ejecutar cada vez que cambie la query string

    // Extraer partes de la ruta
    const cleanPath = (path) => {
        return path.replace(/%20|\s+/g, "-"); // Reemplaza espacios por guiones
    };

    // Iterar sobre los productos
    /* products.forEach((product) => {
        const { categoria, productoTipo } = product;

        // Limpia los valores de categoria y productoTipo para usarlos en URLs
        const cleanedCategoria = cleanPath(categoria);
        const cleanedProductoTipo = cleanPath(productoTipo);

        // Construye una URL limpia
        const url = `/productos/${cleanedCategoria}/${cleanedProductoTipo}`;
        console.log(`URL del producto: ${url}`);
    }); */


    useEffect(() => {
        if (products && products.length > 0) {  // Verifica que 'products' no sea undefined o vacío
            const [minPrice, maxPrice] = priceRange;

            const filtered = products.filter(product => {
                // Asegúrate de que el producto tiene un precio definido
                if (typeof product.precio !== "number") {
                    return false; // Excluye productos sin un precio válido
                }

                // Verifica si el precio del producto está dentro del rango
                return product.precio >= minPrice && product.precio <= maxPrice && product.activo===true && product.stock >0;
            });

            setFilteredProducts(filtered); // Actualiza los productos filtrados
        }
    }, [priceRange, products]);

console.log(products)
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Número de productos por página

    // Total de páginas (basado en la cantidad total de productos)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Calcular el índice inicial y final de los productos para la página actual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePriceChange = (minPrice, maxPrice) => {
        setPriceRange([minPrice, maxPrice]);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className="offcanvas-menu-overlay"></div>

            <SearchBar />
            <header className="header">
                <Nav />
            </header>



            <section className="shop spad mt-5">
                <div className="container">
                    <div className="row">
                        <div className="flex justify-between items-center mb-5">
                            {/* Columna: Ruta de navegación */}
                            <div className="text-gray-600 text-lg font-questrial">
                                {/*   <span> */}
                                <NavLink to="/" className="text-gray-600 hover:text-gray-700 no-underline">
                                    Inicio
                                </NavLink>
                                <span className="mx-2">/</span>


                                <span className="font-semibold text-gray-700">Explorar</span>
                                {/*  </span> */}
                            </div>

                            {/* Columna: Botón de filtros */}
                            <div>
                                <button
                                    onClick={openDrawer}
                                    className="bg-red-800 fixed  right-5 z-999 sm:block text-white px-4 py-2 rounded-sm hover:bg-red-700 transition duration-300 ease-in-out"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            width="24"
                                            height="24"
                                            strokeWidth="2"
                                        >
                                            <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                            <path d="M4 6l8 0"></path>
                                            <path d="M16 6l4 0"></path>
                                            <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                            <path d="M4 12l2 0"></path>
                                            <path d="M10 12l10 0"></path>
                                            <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                            <path d="M4 18l11 0"></path>
                                            <path d="M19 18l1 0"></path>
                                        </svg>
                                        <span className="font-poppins text-sm hidden sm:block">
                                            Filtros
                                        </span>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <FiltersDrawer isAccordionOpen={isAccordionOpen} setIsAccordionOpen={setIsAccordionOpen} open={open} setOpen={setOpen} handlePriceChange={handlePriceChange} />
                        <div className="col-lg-12">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__accordion">
                                    {/* Acordeón de Precios */}

                                    {/* Acordeón de Colores */}
                                    {/*       <div className="card">
                                        <div className="card-heading">
                                            <Link
                                                className="card-heading no-underline text-gray-600 text-left"
                                                onClick={() => setIsAccordionOpenColor(!isAccordionOpenColor)}
                                            >
                                                Color
                                            </Link>
                                        </div>

                                        {isAccordionOpenColor && (
                                            <div className="card-body">
                                                <div className="shop__sidebar__color">
                                                    <label className="c-1" htmlFor="sp-1">
                                                        <input type="radio" id="sp-1" />
                                                    </label>
                                                    <label className="c-2" htmlFor="sp-2">
                                                        <input type="radio" id="sp-2" />
                                                    </label>
                                                    <label className="c-3" htmlFor="sp-3">
                                                        <input type="radio" id="sp-3" />
                                                    </label>
                                                    <label className="c-4" htmlFor="sp-4">
                                                        <input type="radio" id="sp-4" />
                                                    </label>
                                                    <label className="c-5" htmlFor="sp-5">
                                                        <input type="radio" id="sp-5" />
                                                    </label>
                                                    <label className="c-6" htmlFor="sp-6">
                                                        <input type="radio" id="sp-6" />
                                                    </label>
                                                    <label className="c-7" htmlFor="sp-7">
                                                        <input type="radio" id="sp-7" />
                                                    </label>
                                                    <label className="c-8" htmlFor="sp-8">
                                                        <input type="radio" id="sp-8" />
                                                    </label>
                                                    <label className="c-9" htmlFor="sp-9">
                                                        <input type="radio" id="sp-9" />
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="shop__product__option__left text-left">
                                            <p className="font-questrial">
                                                Mostrando {currentProducts.length} de {filteredProducts.length} resultados
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row min-h-screen">
                                {console.log(currentProducts)}
                                {currentProducts.map((p, index) => {
                                    const cleanedCategoria = cleanPath(p.categoria);
                                    const cleanedProductoTipo = cleanPath(p.productoTipo);
                                    return (


                                        <div className="col-lg-3 col-md-6 col-sm-6 col-6" key={index}>
                                            <NavLink className="no-underline" to={`/shop/${cleanedProductoTipo}/${cleanedCategoria}/${p._id}`}>
                                                <ProductGrid key={index} {...p} />
                                            </NavLink>
                                        </div>
                                    )
                                })}




                                {
                                    currentProducts.length === 0 && (
                                        <div className="col-lg-12">
                                            <p className="text-center">No hay resultados.</p>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="row mx-auto justify-center">
                                <div className="col-12">
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default SearchResults;
