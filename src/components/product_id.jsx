import TopInfo from "./top";
import Nav from "./nav";
import Footer from "./footer";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import QuantitySelector from "./quantity_selector";
import { NavLink, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./search_bar";
import ProductGrid from "./product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_PROD } from "../lib/apis";

const ProductID = () => {
    const [q, setQ] = useState(1);
    const { productId, category, subCategory } = useParams();
    console.log(productId, category, subCategory);
    const [product, setProduct] = useState(null);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState({
        peso: null,
        color: null,
    });
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4, // Número de productos por slide en pantallas grandes
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3, // Productos por slide en escritorio
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2, // Productos por slide en tablets
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1, // Producto por slide en móviles
        },
    };
    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada

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
                    credentials: "include",
                    body: JSON.stringify({ parametros: parametros })
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const { data } = await response.json();
                setProduct(data.product[0]);
                setRelatedProduct(data.relatedProducts)
                if (data?.[0]?.variantes?.length > 0) {
                    const firstVariant = data[0].variantes[0];
                    setSelectedVariant({
                        peso: firstVariant.peso,
                        color: firstVariant.color,
                    });

                    /*        setSelectedImage(firstVariant.imagen); // Establece la primera imagen por defecto */
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) fetchProduct();
    }, [productId, category, subCategory]);
    console.log(product)
    const handleVariantChange = (field, value) => {
        setSelectedVariant((prev) => {
            const updatedVariant = {
                ...prev,
                [field]: value,
            };

            // Cambiar imagen según el color seleccionado
            if (field === "color") {
                const matchingVariant = product?.variantes.find(
                    (v) => v.color === value
                );
                if (matchingVariant) {
                    setSelectedImage(matchingVariant.imagen); // Actualiza la imagen principal
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
        const selectedProduct = {
            id: product._id,
            imagen: selectedImage,
            titulo: product.titulo,
            precio: product.precio,
            color: selectedVariant.color,
            cantidad: q,
            peso: selectedVariant.peso,
        };
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
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product__details__breadcrumb">
                                    <a href="./index.html">Inicio</a>
                                    <a href="./shop.html">Explorar</a>
                                    <span>Detalle</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                {/* Imagen principal */}
                                <div className="product__details__pic__item">
                                    <img
                                        className="img-fluid w-80 border-1"
                                        src={
                                            selectedVariant.color
                                                ? `https://productosvet.s3.us-east-1.amazonaws.com/${product?.variantes.find(v => v.color === selectedVariant.color)?.imagen}`
                                                : `https://productosvet.s3.us-east-1.amazonaws.com/${product?.variantes[0]?.imagen}`
                                        }
                                        alt="Producto"
                                    />
                                </div>
                                {/* Miniaturas */}
                                <ul className="nav nav-tabs" role="tablist">
                                    {product?.variantes.map((v, index) => (
                                        <li className="nav-item" key={index}>
                                            <div
                                                className={`product__thumb__pic set-bg ${selectedVariant.color === v.color ? "active" : ""
                                                    }`}
                                                style={{
                                                    backgroundImage: `url(https://productosvet.s3.us-east-1.amazonaws.com/${v.imagen})`,
                                                }}
                                                onClick={() => handleVariantChange("color", v.color)} // Cambia el color seleccionado al hacer clic
                                            ></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                {/* Detalles del producto */}
                                <div className="product__details__text">
                                    <h2 className="text-left">{product?.titulo}</h2>
                                    <h3 className="text-left">${product?.precio}</h3>
                                    <p className="text-left">{product?.descripcion || "Descripción no disponible."}</p>
                                    <div className="product__details__option space-y-4">
                                        {/* Selección de peso */}
                                        <select
                                            className="block w-full"
                                            onChange={(e) => handleVariantChange("peso", e.target.value)}
                                            value={selectedVariant?.peso || ""}
                                        >
                                            <option value="" disabled>
                                                Seleccionar Peso
                                            </option>
                                            {product?.variantes.map((v, index) => (
                                                <option key={index} value={v.peso}>
                                                    {v.peso}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Selección de color */}
                                        <select
                                            className="block w-full"
                                            onChange={(e) => handleVariantChange("color", e.target.value)}
                                            value={selectedVariant?.color || ""}
                                        >
                                            <option value="" disabled>
                                                Seleccionar Color
                                            </option>
                                            {product?.variantes.map((v, index) => (
                                                <option key={index} value={v.color}>
                                                    {v.color}
                                                </option>
                                            ))}
                                        </select>
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


                    <Carousel

                        responsive={responsive}
                        className="carousel-container container-fluid  p-5"
                    >
                        {relatedProduct.map((v, index) => (
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6" key={index}>
                                <NavLink className="no-underline" to={`/shop/${category}/${subCategory}/${v._id}`}>
                                    <ProductGrid key={index} _id={v._id} precio={v.precio} titulo={v.titulo} variantes={v.variantes} />
                                </NavLink>
                            </div>
                        ))}
                    </Carousel>



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

