import TopInfo from "./top";
import Nav from "./nav";
import Footer from "./footer";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import QuantitySelector from "./quantity_selector";
import { Link, NavLink, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./search_bar";
import ProductGrid from "./product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_PROD, API_URL } from "../lib/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { useCategories } from "../context/notifications";

const ProductID = () => {
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
    const { destacados } = useCategories();
    // Condicionar slidesPerView según el tamaño de la pantalla
    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4;
    const [q, setQ] = useState(1);
    const { productId, category, subCategory } = useParams();
    console.log(productId, category, subCategory);
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState({
        dato_1_col: null,
        dato_2_mul: null,
        dato_3_pre: 0,
    });

    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
    const [price, setPrice] = useState(0); // Imagen seleccionada

    const { addItemToCart } = useCart();

    useEffect(() => {
        const parametros = {
            category: category,
            subcategory: subCategory,
        }
        const fetchProduct = async () => {

            try {
                const response = await fetch(`${API_PROD}/get-product-by-id/${productId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                    /*       credentials: "include", */
                    body: JSON.stringify({ parametros: parametros })
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const { data } = await response.json();
                setProduct(data.product[0]);
                selectedImage(data.product[0].imagesAdded[0].nombre)
                if (data?.[0]?.variantes?.length > 0) {
                    const firstVariant = data[0].variantes[0];
                    setSelectedVariant({
                        dato_1_col: firstVariant.dato_1_col ? firstVariant.dato_1_col : "",
                        dato_2_mul: firstVariant.dato_2_mul,
                        dato_3_pre: firstVariant.dato_3_pre,
                        imagen: firstVariant.imagen,
                    });

                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) fetchProduct();
    }, [productId, category, subCategory, selectedImage]);
    console.log(product)
    const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
    const productoTipo = cleanPath(product?.productoTipo).toLowerCase();
    const categoria = cleanPath(product?.categoria).toLowerCase();
    // Verifica si los parámetros son válidos
    if (!productoTipo || !categoria) {
        console.error("Parámetros faltantes o inválidos");
        return null; // Salta este producto
    }
    const handleVariantChange = (field, value) => {
        setSelectedVariant((prev) => {
            const updatedVariant = {
                ...prev,
                [field]: value,
            };

            // Cambiar imagen según el color seleccionado
            if (field === "dato_1_col") {
                const matchingVariant = product?.variantes.find(
                    (v) => v.dato_1_col === value
                    /*    (v) => v.color === value */
                );
                if (matchingVariant) {
                    setSelectedImage(matchingVariant.imagen); // Actualiza la imagen principal
                }
            }

            if (field === "dato_2_mul") {
                if (product?.variantes) {

                    const matchingVariant = product?.variantes.find(
                        (v) => v.dato_2_mul === value
                        /*     (v) => v.peso === value */
                    );
                    if (matchingVariant) {
                        console.log(matchingVariant)
                        setPrice(matchingVariant.dato_3_pre);
                        // Actualiza la imagen principal
                    }
                }
                else {
                    if (product?.precio) {
                        setPrice(product?.precio); // Asignamos el precio del producto
                        // Aquí también puedes actualizar la imagen principal si es necesario
                    } else {
                        console.log('No se encontró un precio para el producto');
                    }
                }
            }

            return updatedVariant;
        });
    };

    const addToCart = () => {
        if (!product) {
            toast("No se encontró el producto");
            return;
        }
        const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
        const productoTipo = cleanPath(product.productoTipo);
        const categoria = cleanPath(product.categoria);
        // Verifica si los parámetros son válidos
        if (!productoTipo || !categoria) {
            console.error("Parámetros faltantes o inválidos");
            return null; // Salta este producto
        }

        const selectedProduct = {
            id: product._id,
            imagen: selectedImage ? selectedImage : product.imagesAdded[0].nombre,
            titulo: product.titulo,
            categoria: categoria.toLowerCase(),
            precio: product.variantes.length > 0 ? price : product.precio,
            productoTipo: productoTipo.toLowerCase(),
            color: product.variantes.length > 0 ? selectedVariant.dato_1_col : product?.color,
            cantidad: q,
            peso: selectedVariant.dato_2_mul,
        };
        console.log(selectedProduct)
        if (product?.productoUnico === "no") {

            if (!selectedProduct.precio || !selectedProduct.color || !selectedProduct.cantidad) {
                toast("Debes seleccionar lo que queres para agregar al carrito");
                return;
            }
        }
        addItemToCart(selectedProduct);
        toast("Agregado al carrito exitosamente");
    };

    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            <TopInfo />
            <SearchBar />
            <header className="header">
                <Nav />
            </header>
            <section className="shop-details">
                <div className="product__details__pic min-h-screen bg-white">
                    <div className="container min-h-[700px]">
                        {/* <div className="row">
                            <div className="col-lg-12">
                                <div className="product__details__breadcrumb">
                                    <Link to={"/"}>Inicio</Link>
                                    <Link to={`/shop/${cleanPath(subCategory)}`}>Explorar</Link>
                                    <span>Detalle</span>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                {/* Imagen principal */}
                                <div className="product__details__pic__item">
                                    {product?.variantes.length > 0 ?
                                        <img
                                            className="w-full h-full object-cover"
                                            src={
                                                selectedVariant.dato_1_col
                                                    ? `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${product?.variantes.find(v => v.dato_1_col === selectedVariant.dato_1_col)?.imagen}`
                                                    /*    ? `https://productosvet.s3.us-east-1.amazonaws.com/${product?.variantes.find(v => v.color === selectedVariant.color)?.imagen}` */
                                                    : `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${product?.variantes[0].imagen}`
                                            }
                                            alt="Producto"
                                        /> : <img
                                            className="img-fluid w-full h-full  object-cover"
                                            src={`https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${product?.imagesAdded[0].nombre}`}
                                            alt="Producto"
                                        />}
                                </div>
                                {/* Miniaturas */}
                                <ul className="nav nav-tabs" role="tablist">
                                    {product?.variantes ?
                                        product?.variantes.map((v, index) => (
                                            <li className="nav-item" key={index}>
                                                <div
                                                    className={`product__thumb__pic set-bg ${selectedVariant.dato_1_col === v.dato_1_col ? "active" : ""
                                                        /*  className={`product__thumb__pic set-bg ${selectedVariant.color === v.color ? "active" : "" */
                                                        }`}
                                                    style={{
                                                        backgroundImage: `url(https://productosvet.s3.us-east-1.amazonaws.com/${product?.productoTipo}/${product?.categoria}/${v.imagen})`,
                                                    }}
                                                    onClick={() => handleVariantChange("dato_1_col", v.dato_1_col)} // Cambia el color seleccionado al hacer clic
                                                ></div>
                                            </li>
                                        ))


                                        : product?.imagenes.map((v, index) => (
                                            <li className="nav-item" key={index}>
                                                <div
                                                    className={`product__thumb__pic set-bg ${selectedVariant.dato_1_col === v.dato_1_col ? "active" : ""
                                                        }`}
                                                    style={{
                                                        backgroundImage: `url(https://productosvet.s3.us-east-1.amazonaws.com/${product?.productoTipo}/${product?.categoria}/${v})`,
                                                    }}
                                                    onClick={() => handleVariantChange("dato_1_col", v.dato_1_col)} // Cambia el color seleccionado al hacer clic
                                                ></div>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                {/* Detalles del producto */}
                                <div className="product__details__text">
                                    <h2 className="text-left">{product?.titulo}</h2>
                                    {/*   <h3 className="text-left">${price ? price : product?.precio}</h3> */}

                                    <h3 className="text-left">${product?.variantes.length > 0 ? price : product?.precio}</h3>
                                    <p className="text-left">{product?.descripcion || "Descripción no disponible."}</p>
                                    <div className="product__details__option space-y-4">
                                        {/* Selección de peso */}
                                        {product?.variantes.length > 0 ? (
                                            <select
                                                className="block w-full"
                                                onChange={(e) => handleVariantChange("dato_2_mul", e.target.value)}
                                                value={selectedVariant?.dato_2_mul || ""}
                                            >
                                                <option value="" disabled>
                                                    Seleccionar Peso
                                                </option>
                                                {[...new Set(product?.variantes.map(v => v.dato_2_mul))].map((dato_2_mul, index) => (
                                                    <option key={index} value={dato_2_mul}>
                                                        {dato_2_mul}
                                                    </option>
                                                ))}

                                            </select>
                                        ) : (
                                            <p className="text-left">{/* Color disponible:  */}<strong>{product?.color}</strong></p>
                                        )}

                                        {/* Selección de color */}
                                        {product?.variantes.length > 0 ? (
                                            <select
                                                className="block w-full"
                                                onChange={(e) => handleVariantChange("dato_1_col", e.target.value)}
                                                value={selectedVariant?.dato_1_col || ""}
                                            >
                                                <option value="" disabled>
                                                    Seleccionar color
                                                </option>
                                                {[...new Set(product?.variantes.map(v => v.dato_1_col))].map((dato_1_col, index) => (
                                                    <option key={index} value={dato_1_col}>
                                                        {dato_1_col}
                                                    </option>
                                                ))}

                                            </select>
                                        ) : (
                                            <></>

                                        )}
                                        <QuantitySelector q={q} setQ={setQ} />
                                    </div>

                                    <div className="product__details__cart__option">
                                        <button
                                            className="block w-full"
                                            onClick={addToCart}
                                            style={{
                                                color: "#fff",
                                                borderRadius: "2px",
                                                fontWeight: "lighter",
                                                backgroundColor: "#af1010",
                                                border: "none",
                                                padding: "10px 20px",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s ease",
                                            }}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <section className="featured my-5 container">

                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">Otros usuarios compraron</h4>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={slidesToShow}
                            className="my-5"
                            pagination={{ clickable: true }}
                        >
                            {destacados.length > 0 &&
                                destacados
                                    /*     .filter((p) => p.destacado === true && p.productoTipo && p.categoria) */
                                    .map((v, index) => {
                                        const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
                                        const productoTipo = cleanPath(v.productoTipo);
                                        const categoria = cleanPath(v.categoria);
                                        // Verifica si los parámetros son válidos
                                        if (!productoTipo || !categoria) {
                                            console.error("Parámetros faltantes o inválidos:", v);
                                            return null; // Salta este producto
                                        }

                                        console.log(productoTipo, categoria)
                                        console.log(v)
                                        return (
                                            <SwiperSlide>

                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12" key={index}>
                                                    <NavLink
                                                        className="no-underline"
                                                        to={`/shop/${productoTipo}/${categoria}/${v._id}`}
                                                    >
                                                        <ProductGrid
                                                            key={index}
                                                            _id={v._id}
                                                            productoTipo={productoTipo}
                                                            categoria={categoria}
                                                            precio={v.precio ? v.precio : 0}
                                                            titulo={v.titulo}
                                                            imagesAdded={v.imagesAdded}
                                                            variantes={v.variantes}
                                                        />
                                                    </NavLink>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}

                        </Swiper>
                    </section>
                </div>
                <Footer />
                <div>
                    <Toaster />
                </div>
            </section>
        </>
    );
};

export default ProductID;

