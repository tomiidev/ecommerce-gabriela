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

const Shop = () => {
    const { loading, setLoading, setError } = useCategories();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 20000]); // Estado para el rango de precios (por defecto 0-250)
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Mantener el acordeón de precios abierto
    const [isAccordionOpenColor, setIsAccordionOpenColor] = useState(true); // Mantener el acordeón de colores abierto

    // Extraer partes de la ruta
    const pathParts = location.pathname.split("/").filter(Boolean);
    const productoTipo = pathParts[1]; // Segundo segmento
    const categoria = pathParts[2]; // Tercer segmento

    const cleanPath = (path) => {
        // Reemplaza %20 o espacios en blanco con nada
        return path.replace(/%20|\s+/g, " ");
    };

    const obtenerDatosDeCategoriaElegida = useCallback(
        async (productoTipo, categoria) => {
            try {
                setLoading(true); // Inicia el indicador de carga
                setError(null); // Reinicia el estado de error
                const cleanedCategory = await new Promise((resolve) => {
                    const result = cleanPath(categoria);
                    resolve(result); // Resuelve con la categoría limpia
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

    useEffect(() => {
        obtenerDatosDeCategoriaElegida(productoTipo, categoria);
    }, [productoTipo, categoria, obtenerDatosDeCategoriaElegida]); // `obtenerDatosDeCategoriaElegida` está memorizada con useCallback

    useEffect(() => {
        if (products && products.length > 0) {  // Verifica que 'products' no sea undefined o vacío
            const [minPrice, maxPrice] = priceRange;

            const filtered = products.filter(product => {
                // Asegúrate de que el producto tiene un precio definido
                if (typeof product.precio !== "number") {
                    return false; // Excluye productos sin un precio válido
                }

                // Verifica si el precio del producto está dentro del rango
                return product.precio >= minPrice && product.precio <= maxPrice;
            });

            setFilteredProducts(filtered); // Actualiza los productos filtrados
        }
    }, [priceRange, products]);



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
            <TopInfo />
            <SearchBar />
            <header className="header">
                <Nav />
            </header>

            <section className="breadcrumb-option text-left">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Explorar</h4>
                                <div className="breadcrumb__links">
                                   {/*  <Link to={"/"} className="no-underline">
                                        Inicio
                                    </Link>
                                    <span>Explorar</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__accordion">
                                    {/* Acordeón de Precios */}
                                    <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-heading">
                                                <p
                                                    className="card-heading no-underline text-gray-800 text-left"
                                                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                                                >
                                                    <strong>Precio</strong>
                                                </p>

                                            </div>
                                            {isAccordionOpen && (
                                                <div className="card-body">
                                                    <div className="shop__sidebar__price">
                                                        <ul className="text-left text-gray-600">
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); // Previene que el enlace afecte al acordeón
                                                                        handlePriceChange(0, 500);
                                                                    }}
                                                                    className="text-gray-600 no-underline active"
                                                                >
                                                                    $0.00 - $500.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(501, 1000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $501.00 - $1,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(1001, 2000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $1,001.00 - $2,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(2001, 3000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $2,001.00 - $3,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(3001, 4000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $3,001.00 - $4,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(4001, 5000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $4,001.00 - $5,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(5001, 6000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $5,001.00 - $6,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(6001, 7000);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $6,001.00 - $7,000.00
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(7001, Infinity);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    $7,001.00+
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="/"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handlePriceChange(0, Infinity);
                                                                    }}
                                                                    className="text-gray-600 no-underline"
                                                                >
                                                                    Mostrar todo
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}


                                        </div>
                                    </div>

                                    {/* Acordeón de Colores */}
                             {/*        <div className="card">
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

                        <div className="col-lg-9">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="shop__product__option__left text-left">
                                            <p>
                                                Mostrando {currentProducts.length} de {products.length} resultados
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {console.log(currentProducts)}
                                {currentProducts.map((p, index) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-6" key={index}>
                              {/*           <NavLink className="no-underline" to={`/shop/${productoTipo}/${categoria}/${p._id}`}> */}
                                            <ProductGrid key={index} {...p} />
                                     {/*    </NavLink> */}
                                    </div>
                                ))}
                                {
                                    currentProducts.length === 0 && (
                                        <div className="col-lg-12">
                                            <p className="text-center">No hay resultados para el rango seleccionado.</p>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
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

export default Shop;
