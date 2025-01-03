import React from "react";
import TopInfo from "./top";
import Nav from "./nav";
import Footer from "./footer";
import SearchBar from "./search_bar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCategories } from "../context/notifications";
import { Link, NavLink } from "react-router-dom";
import ProductGrid from "./product";
import BlogSlider from "./blog_articule";
import WpButton from "./wp";

import { SwiperSlide, Swiper } from "swiper/react";
import RegisterPayment from "../lib/complete_payment";
import { useMediaQuery } from "react-responsive";

const Home = () => {
    const { destacados, articulos, promociones } = useCategories();
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

    // Condicionar slidesPerView según el tamaño de la pantalla
    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4;

    // Configuración del slider
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 1, // Productos por slide en pantallas grandes
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 1, // Productos por slide en escritorio
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1, // Productos por slide en tablets
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1, // Productos por slide en móviles
        },
    };

    return (
        <>
            <RegisterPayment />
            {/* Fondo para el menú lateral */}
            <div className="offcanvas-menu-overlay"></div>

            {/* Información superior */}
            <TopInfo />

            {/* Barra de búsqueda */}
            <SearchBar />

            {/* Encabezado */}
            <header className="header">
                <Nav />
            </header>

            {/* Sección principal de contenido */}
            <main>
                {/* Slider de la sección Hero */}
                <section className="hero">
                    <Carousel responsive={responsive} autoPlay className="slider">
                        <img src={require("../img/1.png")} alt="marca1" />
                        <img src={require("../img/2.png")} alt="marca2" />
                        <img src={require("../img/3.png")} alt="marca3" />
                        <img src={require("../img/4.png")} alt="marca4" />
                    </Carousel>
                </section>

                {/* Sección de marcas */}
                <section className="brands my-5 container">
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">Nuestras marcas</h4>

                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        className=""
                        pagination={{ clickable: true }}
                    >
                        <SwiperSlide>
                            <img src={require("../img/m1.png")} alt="marca1" className="w-full img-fluid" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={require("../img/m2.png")} alt="marca1" className="w-full img-fluid" />
                        </SwiperSlide><SwiperSlide>
                            <img src={require("../img/m3.png")} alt="marca1" className="w-full img-fluid" />
                        </SwiperSlide>
                    </Swiper>
                </section>

                {/* Sección adicional con imágenes destacadas */}
                <section className="featured my-5 container">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        className="my-5"
                        loop={true}
                        autoplay={true}
                        pagination={{ clickable: true }}
                    >
                        {
                            Array.from({ length: 7 }, (_, index) => {
                                return (

                                    <SwiperSlide key={index +1}>

                                        <img src={`https://productosvet.s3.us-east-1.amazonaws.com/marcas/portada${index +1}.png`} alt="" className="w-full img-fluid" />
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                </section>
                <section className="featured my-5 container">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={slidesToShow}
                        className="my-5"
                        loop={true}
                        pagination={{ clickable: true }}
                    >
                        <SwiperSlide>
                            <Link to={"/servicios"}>
                                <img src={require("../img/s1.png")} alt="" className="w-full img-fluid" />
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to={"/servicios"}>
                                <img src={require("../img/envios.png")} alt="" className="w-full img-fluid" />
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to={"/servicios"}>
                                <img src={require("../img/emergencias.png")} alt="" className="w-full img-fluid" />
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to={"/servicios"}>
                                <img src={require("../img/consultas.png")} alt="" className="w-full img-fluid" />
                            </Link>
                        </SwiperSlide>

                    </Swiper>

                </section>

                <section className="featured my-5 container">

                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">🔥Más vendidos</h4>
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
                {/*    <section className="featured my-5">

                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">Promociones</h4>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={7}
                        className="my-5"
                        pagination={{ clickable: true }}
                    >
                        {promociones &&
                            promociones.length > 0 &&
                            promociones
                                .filter((p) => p.destacado === true && p.productoTipo && p.categoria)
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
                                    return (
                                        <SwiperSlide>

                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6" key={index}>
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
                                                        imagenes={v.imagenes}
                                                        variantes={v.variantes}
                                                    />
                                                </NavLink>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}

                    </Swiper>
                </section> */}
                <section className="mb-0 container">
                    <h2 className="text-xl font-extrabold text-center text-gray-800 mb-12">
                        Te va a interesar...
                    </h2>
                    <BlogSlider articulos={articulos} />
                </section>

            </main>

            {/* Pie de página */}
            <Footer />

            {/* Modelo de búsqueda emergente */}
            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">+</div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Buscar..." />
                    </form>
                </div>
            </div>
            <WpButton />
        </>
    );
};

export default Home;
