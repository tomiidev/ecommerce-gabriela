import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const BlogSlider = ({ articulos }) => {
    // Detectar si el dispositivo es móvil o escritorio
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

    // Condicionar slidesPerView según el tamaño de la pantalla
    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4;

    return (
        <div className="w-full container-fluid mx-auto py-16 h-full">
            
            <Swiper
                autoHeight={true}
                spaceBetween={30}
                slidesPerView={slidesToShow}
                pagination={{ clickable: true }}
            >
                {articulos.map((post) => (
                    <SwiperSlide key={post.id}>
                        <div className="flex flex-col items-center rounded-sm p-6 bg-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-2xl">
                            <img
                                src={`https://productosvet.s3.us-east-1.amazonaws.com/blog/${post.image}`}
                                alt={post.title}
                                className="w-full h-56 object-cover rounded-lg mb-6"
                            />
                            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm text-center mb-4 px-3">
                                Descubre más sobre este tema y cómo puede ser útil para ti y tu
                                mascota.
                            </p>
                            <Link
                                state={post}
                                to={`/blog/${post._id}`}
                                className="bg-red-600 no-underline text-white font-medium text-sm py-2 px-4 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Ver más
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BlogSlider;
