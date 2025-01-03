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
        <div className="w-full container-fluid overflow-hidden">
            <Swiper
                spaceBetween={30}
                slidesPerView={slidesToShow}
                pagination={{ clickable: true }}
            >
                {articulos.length > 0 && articulos.map((post) => (
                    <SwiperSlide key={post._id}>
                        <div className="flex flex-col justify-between h-full border border-gray-300 rounded-sm  overflow-hidden">

                            <img
                                className="w-full h-48 object-cover"
                                src={`https://productosvet.s3.us-east-1.amazonaws.com/blog/${post.image}`}
                                alt=""
                            />

                            <div className="p-4">
                                <h2 className="text-lg font-bold">{post.title}</h2>
                                <div className="mt-4">
                                    <Link
                                        state={post}
                                        to={`/blog/${post._id}`}
                                        className="inline-block no-underline bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-red-700 transition"
                                    >
                                        Leer más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>


    );
};

export default BlogSlider;
