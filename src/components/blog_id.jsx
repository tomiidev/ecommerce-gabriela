import React from "react";
import { useLocation, Link } from "react-router-dom";
import TopInfo from "./top";
import Navbar from "./nav";

const BlogArticle = () => {
    const location = useLocation();
    const article = location.state;
    
    // Fallback si no hay datos (el usuario llegó directamente a la URL)
    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Artículo no encontrado</h1>
                <p className="text-gray-600 text-lg mb-4">
                    Parece que llegaste aquí por error o no seleccionaste un artículo válido.
                </p>
                <Link
                    to="/blog"
                    className="bg-blue-600 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-300"
                >
                    Volver al blog
                </Link>
            </div>
        );
    }

    return (
        <>
            <TopInfo />
            <Navbar />
            <div className="min-h-screen container flex items-center justify-center  px-4 sm:px-8">
                <div className=" w-full mt-5 overflow-hidden flex flex-col bg-white ">
                    {/* Imagen con altura fija */}
                    <div className="w-80 h-80 lg:h-full mx-auto overflow-hidden">
                        <img
                             src={`https://productosvet.s3.us-east-1.amazonaws.com/blog/${article.image}`}
                            alt={article.title}
                            className="w-full h-full object-cover border"
                        />

                    </div>
                    {/* Contenido debajo de la imagen */}
                    <div className="p-6 lg:p-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                            {article.title}
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {article.content}
                        </p>
                        <div className="text-center">
                            <Link
                                to="/blog"
                                className="bg-red-600 text-white font-medium text-sm py-2 px-6 rounded-lg hover:bg-red-700 no-underline inline-block shadow-md"
                            >
                                Volver al blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default BlogArticle;
