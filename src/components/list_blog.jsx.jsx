import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../context/notifications";
import TopInfo from "./top";
import SearchBar from "./search_bar";
import Navbar from "./nav";

const BlogList = () => {
    // Obtener artículos del contexto
    const { articulos } = useCategories();

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
                <Navbar />
            </header>
            <div className="w-full container mx-auto py-16 px-4">
             {/*    <h2 className="text-4xl font-extrabold font-poppins text-center text-gray-900 mb-12">
                    Te va a interesar...
                </h2> */}

                {/* Grid de 3 columnas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articulos.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col items-center bg-white rounded-lg overflow-hidden transition-all duration-300 shadow "
                        >
                            {/* Imagen */}
                            <img
                                src={`https://productosvet.s3.us-east-1.amazonaws.com/blog/${post.image}`}
                                alt={post.title}
                                className="w-full h-96 object-cover rounded-t-lg"
                            />

                            {/* Contenido */}
                            <div className="p-6 flex flex-col items-center">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-poppins">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm text-center mb-6 font-questrial">
                                    Descubre más sobre este tema y cómo puede ser útil para ti y tu mascota.
                                </p>
                                <Link
                                    state={post}
                                    to={`/blog/${post._id}`}
                                    className="bg-red-600 no-underline text-white font-medium text-sm py-2 px-6 rounded-full hover:bg-red-700 font-questrial"
                                >
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogList;
