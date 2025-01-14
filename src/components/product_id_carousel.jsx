import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductCarousel = ({ variantes,imagesAdded, selectedVariant, isLoading ,productoTipo,categoria}) => {

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    // Construir el conjunto de imágenes de las variantes
    const variantImages = variantes?.flatMap((variant) =>
        variant.imagenes.map(
            (img) =>
                `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${img}`
        )
    );

    // Agregar imágenes adicionales si existen
    const additionalImages = imagesAdded?.map(
        (img) =>
            `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${categoria}/${img}`
    );

    // Combinar todas las imágenes
    const allImages = [...(variantImages || []), ...(additionalImages || [])];

    return (
        <div className="sm:hidden product-carousel">
            {/* Carrusel de todas las imágenes */}
            <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows={false}
                autoPlay={false}
                centerMode={false}
                containerClass="carousel-container"
                draggable
                infinite={true}
                itemClass="p-2"
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
               
                showDots={true}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {isLoading ? (
                    <div className="h-[600px] flex items-center justify-center bg-gray-100">
                        <span className="text-gray-500">Cargando...</span>
                    </div>
                ) : (
                    allImages.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt={`Imagen ${index}`}
                                className="w-full h-[600px] img-fluid border"
                            />
                        </div>
                    ))
                )}
            </Carousel>
        </div>
    );
};

export default ProductCarousel;
