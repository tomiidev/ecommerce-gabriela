
import Nav from "./nav";
import Footer from "./footer";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import QuantitySelector from "./quantity_selector";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./search_bar";
import ProductGrid from "./product";
import "react-multi-carousel/lib/styles.css";
import { API_PROD, API_URL } from "../lib/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { useCategories } from "../context/notifications";
import ShoppingCartModal from "./modal";
import ProductCarousel from "./product_id_carousel";
import AddCartMobileComponent from "./addcart_mobile";
import { FacebookShareButton, WhatsappShareButton } from "react-share"
import { IoLogoFacebook, IoLogoWhatsapp } from "react-icons/io5";
const ProductIDV2 = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
    const paymentMethods = ["Mercado Pago", "Efectivo", "Pos", "Transferencia bancaria"];


    const handleImageLoad = () => {
        setIsLoading(false); // Cambiar el estado cuando la imagen se haya cargado
    };

    const handleImageError = () => {
        setIsLoading(false); // Cambiar el estado incluso si la imagen falla al cargar
    };
    const cambiarImagenPrincipalv = (img) => {
        // Cambiar imagen según el color seleccionado
        setImgPrincipalv(img);
    }
    const cambiarImagenPrincipal = (img) => {
        // Cambiar imagen según el color seleccionado
        setImgPrincipal(img);
    }
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
    const { destacados } = useCategories();
    // Condicionar slidesPerView según el tamaño de la pantalla
    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4;
    const [q, setQ] = useState(1);
    const [stock, setStock] = useState(0);
    const { productTitle, category, subCategory } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState({
        dato_1_col: null,
        dato_2_mul: null,
        dato_3_pre: 0,
        dato_4_stock: 0
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Activa la animación después de que el componente se monta
        setTimeout(() => setIsVisible(true), 100); // Retraso opcional para suavidad
    }, []);
    const [selectedImage, setSelectedImage] = useState(""); // Imagen seleccionada
    const [addingToCart, setAddingToCart] = useState(false); // Imagen seleccionada
    const [price, setPrice] = useState(0); // Imagen seleccionada
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const continueShopping = () => {
        closeModal();
        // Lógica para continuar comprando
    };
    const gotocart = useNavigate()
    const viewCart = () => {
        gotocart("/cart");
        // Lógica para ver el carrito
    };
    const { addItemToCart } = useCart();

    useEffect(() => {
        /*   const parametros = {
              category: category,
              subcategory: subCategory,
          } */
        const fetchProduct = async () => {

            try {
                const response = await fetch(`${API_PROD}/get-product-by-id/${productTitle}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                    /*       credentials: "include", */
                    /*    body: JSON.stringify({ parametros: parametrosssss }) */
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const { data } = await response.json();
                setProduct(data);

                if (data?.imagesAdded?.length > 0) {
                    setSelectedImage(data.imagesAdded[0])
                }

                if (data?.variantes?.length > 0) {
                    const firstVariant = data.variantes[0];

                    setSelectedVariant({
                        dato_1_col: firstVariant?.dato_1_col,
                        dato_2_mul: firstVariant?.dato_2_mul,
                        dato_3_pre: firstVariant?.dato_3_pre,
                        dato_4_stock: firstVariant?.dato_4_stock,
                        imagenes: firstVariant.imagenes[0],
                    });
                    setPrice(firstVariant.dato_3_pre)
                    setStock(firstVariant.dato_4_stock)

                } else {
                    setPrice(data.precio)
                    setStock(data.stock)
                }

            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productTitle) fetchProduct();
    }, [productTitle, category, subCategory, selectedImage]);
    const [imgPrincipal, setImgPrincipal] = useState(product?.imagesAdded?.[0]); // Estado para manejar la carga
    const [imgPrincipalv, setImgPrincipalv] = useState(product?.variantes?.imagenes?.[0]); // Estado para manejar la carga
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

            // Actualizar imagen o precio según el campo modificado
            const matchingVariant = product?.variantes.find(
                (v) =>
                    /*  (field === "dato_1_col" && v.dato_1_col === value && (!updatedVariant.dato_2_mul || v.dato_2_mul === updatedVariant.dato_2_mul)) || */
                    (field === "dato_2_mul" && v.dato_2_mul === value /* && (!updatedVariant.dato_1_col || v.dato_1_col === updatedVariant.dato_1_col) */)
            );

            if (matchingVariant) {
                // Actualiza la imagen si el color cambia
                if (field === "dato_2_mul") {
                    setImgPrincipalv(matchingVariant.imagenes[0]);
                    setSelectedImage(matchingVariant.imagenes[0]);
                }

                // Actualiza el precio si cambia el peso o el color
                setPrice(matchingVariant.dato_3_pre);
                setStock(matchingVariant.dato_4_stock);

            } else if (product?.precio) {
                // Restablece al precio base si no hay coincidencia
                setPrice(product.precio);
            } else {
                console.log("No se encontró un precio para el producto");
            }

            return updatedVariant;
        });
    };

    // Filtrar colores disponibles según el peso seleccionado
    const filteredColors = product?.variantes
        ? product.variantes
            .filter(
                (v) =>
                    !selectedVariant.dato_2_mul || v.dato_2_mul === selectedVariant.dato_2_mul
            )
            .map((v) => v.dato_1_col)
            .filter((value, index, self) => self.indexOf(value) === index) // Eliminar duplicados
        : [];

    // Filtrar pesos disponibles según el color seleccionado
    const filteredPesos = product?.variantes
        ? product.variantes
            .filter(
                (v) =>
                    !selectedVariant.dato_1_col || v.dato_1_col === selectedVariant.dato_1_col
            )
            .map((v) => v.dato_2_mul)
            .filter((value, index, self) => self.indexOf(value) === index) // Eliminar duplicados
        : [];


    const addToCart = () => {
        if (!product) {
            toast.error("No se encontró el producto");
            return;
        }
        const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
        const productoTipo = cleanPath(product.productoTipo);
        const categoria = cleanPath(product.categoria);
        // Verifica si los parámetros son válidos

        if (!productoTipo || !categoria) {
            toast.error("Parámetros faltantes o inválidos");
            return null; // Salta este producto
        }
        const selectedProduct = {
            id: product._id,
            imagen: selectedImage ? selectedImage : product?.imagesAdded[0],
            titulo: product.titulo,
            categoria: categoria.toLowerCase(),
            precio: product.variantes.length > 0 ? price : product.precio,
            productoTipo: productoTipo.toLowerCase(),
            color: product.variantes.length > 0 ? selectedVariant.dato_1_col : product?.color,
            cantidad: q,
            peso: selectedVariant.dato_2_mul,
        };
        console.log(selectedProduct)
        if (product.productoUnico === "no") {

            if (!selectedProduct.precio || !selectedProduct.color || !selectedProduct.cantidad || selectedProduct.imagen === "" || selectedProduct.peso) {
                return;
            }
        }
        setAddingToCart(true);

        // Espera de 3 segundos antes de agregar al carrito
        setTimeout(() => {
            addItemToCart(selectedProduct);  // Aquí agregar el producto al carrito
            openModal();
            setAddingToCart(false); // Volver a establecer en false después de agregar al carrito
        }, 3000);  // 3000 ms = 3 segundos
    };

    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            {/*  <TopInfo /> */}
            <SearchBar />
            <header className="header">
                <Nav />
            </header>
            <section className="shop-details">

                <div className="product__details__pic min-h-screen bg-white">
                    <div className="container min-h-[700px]">
                        <div className="text-gray-600 text-lg text-left font-questrial">
                            {/*   <span> */}
                            <NavLink to="/" className="text-gray-600 hover:text-gray-700 no-underline font-questrial">
                                Inicio
                            </NavLink>
                            <span className="mx-2">/</span>


                            <span className="font-questrial text-gray-700">{product?.productoTipo}</span>
                            <span className="mx-2">/</span>
                            <span className="font-questrial text-black"><strong>{product?.categoria}</strong></span>
                            {/*  </span> */}
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-12">
                                <div className="product__details__breadcrumb">
                                    <Link to={"/"}>Inicio</Link>
                                    <Link to={`/shop/${cleanPath(subCategory)}`}>Explorar</Link>
                                    <span>Detalle</span>
                                </div>
                            </div>
                        </div> */}
                        <div className=" mx-auto  py-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Columna de imágenes */}
                                <div className="hidden sm:block">
                                    {/* Imagen principal */}
                                    <div className="product__details__pic__item relative">
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                                <span className="text-gray-500">Cargando...</span>
                                            </div>
                                        )}
                                        {product?.variantes.length > 0 ? (
                                            <img
                                                className={`w-full h-[600px] object-cover ${isLoading ? "opacity-0" : "opacity-100"} border p-1`}
                                                src={
                                                    selectedVariant.dato_1_col
                                                        ? `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${product?.variantes.find(
                                                            (v) => v.dato_1_col === selectedVariant.dato_1_col
                                                        )?.imagenes[0]}` // Usamos la primera imagen de la variante seleccionada
                                                        : `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${imgPrincipalv ? imgPrincipalv : product?.variantes[0].imagenes[0]}` // Usamos la primera imagen de la primera variante
                                                }
                                                alt="Producto"
                                                onLoad={handleImageLoad} // Evento para manejar la carga exitosa
                                                onError={handleImageError} // Evento para manejar errores de carga
                                            />
                                        ) : (
                                            <img
                                                className={`w-full h-[600px] img-fluid p-1 border ${isLoading ? "opacity-0" : "opacity-100"}`}
                                                src={`https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${imgPrincipal ? imgPrincipal : product?.imagesAdded[0]}`} // Si no hay variantes, usamos la primera imagen de imagesAdded
                                                alt="Producto"
                                                onLoad={handleImageLoad} // Evento para manejar la carga exitosa
                                                onError={handleImageError} // Evento para manejar errores de carga
                                            />
                                        )}
                                    </div>


                                    {/* Miniaturas */}
                                    <div className="flex mt-4 space-x-1 w-full">
                                        {product?.variantes.length > 0
                                            ? product?.variantes.map((v, index) => (
                                                // Recorremos cada variante
                                                v.imagenes.map((imagen, idx) => (
                                                    <div
                                                        key={`${index}-${idx}`} // Combinamos el índice de la variante y el de la imagen
                                                        className={`w-1/4  flex cursor-pointer p-1 border ${selectedVariant.dato_1_col === v.dato_1_col ? "border-gray-800" : "border-gray-200"}`}
                                                        onClick={() => cambiarImagenPrincipalv(imagen)}
                                                    /*  onClick={() => handleVariantChange("dato_1_col", v.dato_1_col)} */
                                                    >
                                                        <img
                                                            src={`https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${imagen}`}
                                                            alt={`Miniatura ${index}-${idx}`}
                                                            className="w-full h-[100px] object-cover cursor-pointer"
                                                        />
                                                    </div>
                                                ))
                                            ))

                                            : product?.imagesAdded.map((v, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-1/4 flex cursor-pointer p-1 border ${selectedVariant.dato_1_col === v.dato_1_col ? "border-gray-800" : "border-gray-200"
                                                        }`}
                                                    onClick={() => cambiarImagenPrincipal(v)}
                                                /*           onClick={() => handleVariantChange("dato_1_col", v.dato_1_col)} */
                                                >
                                                    <img
                                                        src={`https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${v}`}
                                                        alt={`Miniatura ${index}`}
                                                        className="w-full h-[100px] object-cover cursor-pointer"
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                {/*  <div> */}
                                <ProductCarousel variantes={product?.variantes} imagesAdded={product?.imagesAdded} cambiarImagenPrincipalv={cambiarImagenPrincipalv} productoTipo={productoTipo} categoria={categoria} selectedVariant={selectedVariant} product={product} isLoading={isLoading} />
                                {/*  </div> */}

                                {/* Columna de detalles del producto */}
                                <div
                                    className={`space-y-4 text-left transition-all duration-500 ease-out ${isVisible ? "transform translate-x-0 opacity-100" : "transform translate-x-full opacity-0"
                                        }`}
                                >
                                    <h1 className="text-lg sm:text-2xl font-open  text-black capitalize"><strong>{product?.titulo.toUpperCase()}</strong></h1>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                                        ${product?.variantes.length > 0 ? price : product?.precio}
                                    </h3>
                                    <hr />
                                   {/*  {
                                        product?.variantes.length > 0 ?
                                            <>
                                                <p className="font-questrial text-red-500">
                                                    ¡QUEDAN {stock} DISPONIBLES!
                                                </p>
                                                <hr />
                                            </>
                                            : <>
                                                <p className="font-questrial text-red-500">
                                                    ¡QUEDAN {product?.stock} DISPONIBLES!
                                                </p>
                                                <hr />
                                            </>
                                    } */}

                                    <p className="text-gray-600">{product?.descripcion || "Descripción no disponible."}</p>
                                    <hr className="hidden sm:hidden" />
                                    {/* Opciones de variantes */}
                                    <div className="space-y-4">
                                        {/* Selección de peso */}
                                        {product?.variantes.length > 0 && (
                                            <div>
                                                {/*    <label htmlFor="peso" className="block text-sm font-medium text-gray-700">
                                                    Seleccionar Peso
                                                </label> */}
                                                <select
                                                    id="peso"

                                                    disabled={filteredPesos.length === 0}
                                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-sm font-questrial"
                                                    onChange={(e) => handleVariantChange("dato_2_mul", e.target.value)}
                                                    value={selectedVariant?.dato_2_mul || ""}
                                                >
                                                    <option value="" disabled>
                                                        Seleccionar peso
                                                    </option>
                                                    {filteredPesos.map((peso, index) => (
                                                        <option key={index} value={peso}>
                                                            {peso}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Selección de color */}
                                        {product?.variantes.length > 0 &&
                                            (["perro", "gato"].includes(product?.productoTipo) &&
                                                ["accesorios", "paseos", "ropa"].includes(product?.categoria)) && (
                                                <div>
                                                    <select
                                                        id="color"
                                                        disabled={filteredColors.length === 0}
                                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-sm font-questrial"
                                                        onChange={(e) => handleVariantChange("dato_1_col", e.target.value)}
                                                        value={selectedVariant?.dato_1_col || ""}
                                                    >
                                                        <option value="" disabled>
                                                            Seleccionar color
                                                        </option>
                                                        {filteredColors.map((color, index) => (
                                                            <option key={index} value={color}>
                                                                {color}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                    </div>

                                    {/* Selector de cantidad */}
                                    <QuantitySelector q={q} setQ={setQ} />

                                    {/* Botón de agregar al carrito */}

                                    <div className="mt-4 hidden sm:block">

                                        <button
                                            className="w-full bg-red-700 text-white py-3 rounded-sm hover:bg-red-500 transition font-questrial"
                                            onClick={addToCart}
                                        >
                                            {addingToCart ? (
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white mx-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                "AGREGAR AL CARRITO"
                                            )}
                                        </button>
                                    </div>

                                    <div className="gap-2">
                                        <h2 className="text-lg  font-poppins mb-2">Métodos de pago disponibles</h2>

                                        {/* Lista de métodos de pago */}
                                        <div className="gap-2">
                                            {paymentMethods.map((method, index) => (
                                                <div
                                                    key={index}
                                                    className="text-left items-center justify-center py-1 bg-white rounded-full font-questrial text-sm text-black"
                                                >
                                                    - {method}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <p className="text-black"><strong>Compartí este producto en tus redes sociales</strong></p>
                                    <div className="flex gap-2">

                                        <WhatsappShareButton title={product?.descripcion} url={`https://ecommerce-gabriela.vercel.app/shop/${productoTipo}/${categoria}/${productTitle}`}>
                                            <button className="bg-green-500 text-white font-bold p-2 rounded-full hover:bg-green-600 transition-colors">
                                                <IoLogoWhatsapp />
                                            </button>
                                        </WhatsappShareButton>

                                        <FacebookShareButton title={product?.descripcion} url={`https://ecommerce-gabriela.vercel.app/shop/${productoTipo}/${categoria}/${productTitle}`}>
                                            <button className="bg-blue-500 text-white font-bold p-2 rounded-full hover:bg-blue-600 transition-colors">
                                                <IoLogoFacebook />
                                            </button>
                                        </FacebookShareButton>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <AddCartMobileComponent q={q} setQ={setQ} addToCart={addToCart} addingToCart={addingToCart} />


                    <section className="featured sm:my-5 container">

                        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">Otros usuarios compraron</h4>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={slidesToShow}
                            className="my-5"


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
            </section >
            <ShoppingCartModal closeModal={closeModal} continueShopping={continueShopping} isModalOpen={isModalOpen} viewCart={viewCart} />
        </>
    );
};

export default ProductIDV2;

