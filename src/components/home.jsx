import React from "react";
import TopInfo from "./top";
import Nav from "./nav";
import Footer from "./footer";
import SearchBar from "./search_bar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCategories } from "../context/notifications";
import { NavLink } from "react-router-dom";
import ProductGrid from "./product";
import BlogSlider from "./blog_articule";
import WpButton from "./wp";

const Home = () => {
    const { destacados, articulos } = useCategories();

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
    const responsiveDestacados = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4, // Productos por slide en pantallas grandes
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 4, // Productos por slide en escritorio
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
                    <Carousel responsive={responsive} className="slider">
                        <img src={require("../img/1.png")} alt="marca1" />
                        <img src={require("../img/2.png")} alt="marca2" />
                        <img src={require("../img/3.png")} alt="marca3" />
                        <img src={require("../img/4.png")} alt="marca4" />
                    </Carousel>
                </section>

                {/* Sección de marcas */}
                <section className="brands my-5">
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">Nuestras marcas</h4>

                    <Carousel responsive={responsive} className="slider">
                        <img src={require("../img/m1.png")} alt="marca1" className="w-full img-fluid" />
                        <img src={require("../img/m2.png")} alt="marca2" className="w-full img-fluid" />
                        <img src={require("../img/m3.png")} alt="marca3" className="w-full img-fluid" />
                    </Carousel>
                </section>

                {/* Sección adicional con imágenes destacadas */}
                <section className="featured my-5">
                    <Carousel responsive={responsive} className="slider">
                        <img src={require("../img/portada1.png")} alt="portada1" className="w-full img-fluid" />
                        <img src={require("../img/portada2.png")} alt="portada2" className="w-full img-fluid" />
                        <img src={require("../img/portada3.png")} alt="portada3" className="w-full img-fluid" />
                        <img src={require("../img/portada4.png")} alt="portada4" className="w-full img-fluid" />
                        <img src={require("../img/portada5.png")} alt="portada5" className="w-full img-fluid" />
                        <img src={require("../img/portada6.png")} alt="portada6" className="w-full img-fluid" />
                        <img src={require("../img/portada7.png")} alt="portada7" className="w-full img-fluid" />
                    </Carousel>
                </section>
                <section className="featured my-5">

                    <img src={require("../img/serviciosvet.png")} alt="portada1" className="w-full img-fluid" />

                </section>

                <section className="featured my-5">

                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">Destacados</h4>
                    <Carousel

                        responsive={responsiveDestacados}
                        className="carousel-container container-fluid  p-5"
                    >
                        {destacados &&
                            destacados.length > 0 &&
                            destacados
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
                                                    precio={v.precio}
                                                    titulo={v.titulo}
                                                    imagenes={v.imagenes}
                                                    variantes={v.variantes}
                                                />
                                            </NavLink>
                                        </div>
                                    );
                                })}

                    </Carousel>
                </section>
                <section className="bg-red-100 mb-0">

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
