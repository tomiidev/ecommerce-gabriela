import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import Nav from "./nav";
import TopInfo from "./top";
import SearchBar from "./search_bar";
import { useCategories } from "../context/notifications";
import { useCallback, useEffect, useState } from "react";
import ProductGrid from "./product";
import Pagination from "./pagination";
import { API_PROD, API_URL } from "../lib/apis";
import Footer from "./footer";
import { CartDrawer } from "./drawer";
import { FiltersDrawer } from "./filters";

const Shop = () => {
    const [open, setOpen] = useState(false); // Controlar el estado del drawer

    const { loading, setLoading, setError } = useCategories();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 20000]); // Estado para el rango de precios (por defecto 0-250)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Mantener el acordeón de precios abierto
    // Extraer partes de la ruta
    const pathParts = location.pathname.split("/").filter(Boolean);

    const productoTipo = pathParts[1]; // Segundo segmento
    const categoria = pathParts[2]; // Tercer segmento

    const cleanPath = (path) => {
        // Reemplaza %20 o espacios en blanco con nada
        return path.replace(/%20|\s+/g, " ");
    };

    const getQueryParams = () => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('query'); // Obtiene el valor del parámetro 'query'
    };

    const query = getQueryParams();

    const obtenerDatosDeCategoriaElegida = useCallback(
        async (productoTipo, categoria) => {
            try {
                setLoading(true); // Inicia el indicador de carga
                setError(null); // Reinicia el estado de error
                const cleanedCategory = await new Promise((resolve) => {
                    const result = cleanPath(categoria);
                    resolve(result); // Resuelve con la categoríaaaaaaa limpia
                });

                const response = await fetch(`${API_PROD}/obtenerdatosdecategoriaelegida`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productType: productoTipo, category: cleanedCategory }),
                    mode: "cors",
                    /*  credentials: "include", */
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching products:", errorData.error);
                    setError(errorData.error); // Actualiza el estado de error
                    return;
                }

                const data = await response.json();
                setProducts(data.data); // Actualiza el estado con los productos
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch products."); // Manejo de error general
            } finally {
                setLoading(false); // Detén el indicador de carga al finalizar
            }
        },
        [setError, setLoading]
    );
    const obtenerDatosDeQueryBusqueda = useCallback(
        async (query) => {
            try {
                setLoading(true); // Inicia el indicador de carga
                setError(null); // Reinicia el estado de error

                const response = await fetch(`${API_PROD}/registersearch?query=${encodeURIComponent(query)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
              
                    mode: "cors",
                    /*  credentials: "include", */
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching products:", errorData.error);
                    setError(errorData.error); // Actualiza el estado de error
                    return;
                }

                const data = await response.json();
                setProducts(data.data); // Actualiza el estado con los productos
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch products."); // Manejo de error general
            } finally {
                setLoading(false); // Detén el indicador de carga al finalizar
            }
        },
        [setError, setLoading]
    );

    useEffect(() => {
        obtenerDatosDeCategoriaElegida(productoTipo, categoria);
    }, [productoTipo, categoria, obtenerDatosDeCategoriaElegida]); // `obtenerDatosDeCategoriaElegida` está memorizada con useCallback
    useEffect(() => {
        obtenerDatosDeQueryBusqueda(query);
    }, [query, obtenerDatosDeQueryBusqueda]); // `obtenerDatosDeCategoriaElegida` está memorizada con useCallback

    useEffect(() => {
        if (products && products.length > 0) { // Verifica que 'products' no sea undefined o vacío
            const [minPrice, maxPrice] = priceRange;

            const filtered = products.filter(product => {
                // Asegúrate de que el producto tiene un precio definido
                if (typeof product.precio !== "number") {
                    return false; // Excluye productos sin un precio válido
                }

                // Verifica si el producto tiene stock directo
                const hasDirectStock = product.stock > 0;

                // Verifica si hay al menos una variante con stock > 0
                const hasVariantStock = product.variantes?.some(variant => variant.dato_4_stock > 0);

                // Verifica si el precio del producto está dentro del rango y si cumple las condiciones adicionales
                return product.precio >= minPrice &&
                    product.precio <= maxPrice &&
                    product.activo === true &&
                    (hasDirectStock || hasVariantStock); // Producto válido si tiene stock directo o en variantes
            });

            setFilteredProducts(filtered); // Actualiza los productos filtrados
        }
    }, [priceRange, products]);




    /* const [currentPage, setCurrentPage] = useState(1); */
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    const productsPerPage = 15; // Número de productos por página

    // Total de páginas (basado en la cantidad total de productos)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Calcular el índice inicial y final de los productos para la página actual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    /*   const handlePageChange = (page) => {
          setCurrentPage(page);
      }; */
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page.toString() });
    };


    const handlePriceChange = (minPrice, maxPrice) => {
        setPriceRange([minPrice, maxPrice]);
    };

    /*     const [filtersVisible, setFiltersVisible] = useState(false); */
    const openDrawer = () => {
        setOpen(!open)
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            {/*     <TopInfo /> */}
            <SearchBar />
            <header className="header">
                <Nav />
            </header>

            <section className="shop spad mt-5">
                <div className="container">
                    {/* Fila para la ruta y el botón de filtros */}
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
                        <div className="z-10">
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

                    <div className="row">
                        {/* Sidebar de filtros */}
                        <FiltersDrawer isAccordionOpen={isAccordionOpen} setIsAccordionOpen={setIsAccordionOpen} open={open} setOpen={setOpen} handlePriceChange={handlePriceChange} />



                        {/* Productos */}
                        <div className={`col-lg-12`}>
                            {/* <div className={`col-lg-${filtersVisible ? "9" : "12"}`}> */}
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="shop__product__option__left text-left">
                                            <p className="font-questrial">
                                                Mostrando {currentProducts.length} de {products.length} resultados
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row  min-h-screen">
                                {currentProducts.map((p, index) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6" key={index}>
                                        <ProductGrid key={index} {...p} />
                                    </div>
                                ))}
                                {currentProducts.length === 0 && (
                                    <div className="col-lg-12">
                                        <p className="text-center font-questrial">
                                            No hay resultados.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
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

export default Shop;
