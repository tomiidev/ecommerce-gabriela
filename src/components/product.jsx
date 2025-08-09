import { useState } from "react";
import { NavLink } from "react-router-dom";
import ModalPortal from "./modal/portal";

const ProductGrid = ({ titulo, _id, precio, imagesAdded, variantes, productoTipo, categoria, isModalOpen }) => {
    const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
    const productoTipoPars = cleanPath(productoTipo).toLowerCase();
    const categoriaPars = cleanPath(categoria).toLowerCase();
    const [isModalVariantsOpen, setIsModalVariantsOpen] = useState(false);
    if (!productoTipo || !categoria) {
        console.error("Parámetros faltantes o inválidos");
        return null;
    }

    const getImageUrl = () => {
        const hasVariants = Array.isArray(variantes) && variantes.length > 0;
        const hasImages = Array.isArray(imagesAdded) && imagesAdded.length > 0;

        if (hasVariants && variantes[0]?.imagenes && imagesAdded.length === 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${variantes[0].imagenes[0]}`;
        }

        if (hasImages && variantes.length === 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${imagesAdded[0]}`;
        }

        return "https://via.placeholder.com/150";
    };
    const handleOpenVariantsModal = (e) => {
        e.preventDefault(); // evita que el click en el NavLink redirija
        setIsModalVariantsOpen(true);
    };

    const handleCloseVariantsModal = () => {
        setIsModalVariantsOpen(false);
    };
    return (
        <div className={`product__item z-0 border border-1 rounded-sm p-3`} key={_id}>
            <NavLink className="no-underline" to={`/shop/${productoTipoPars}/${categoriaPars}/${titulo}`}>
                <div className="group overflow-hidden relative  z-0">
                    <img
                        src={getImageUrl()}
                        alt={titulo}
                        className="w-full img-fluid transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                </div>
                <p className="mt-2 text-black font-semibold text-sm min-h-8 text-left font-open">{titulo.toUpperCase()}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-x-2">
                    <span className="text-xs sm:text-lg text-black text-left font-questrial">
                        ${variantes[0]?.dato_3_pre || precio}
                    </span>

                    {variantes.length > 0 && (
                        <button
                            onClick={handleOpenVariantsModal}
                            className="text-xs sm:text-sm font-questrial text-black border border-red-700 px-2 py-1 rounded-full cursor-pointer hover:bg-red-700 hover:!text-white transition-colors duration-200"
                        >
                            Ver variantes
                        </button>
                    )}
                </div>

            </NavLink>
            {isModalVariantsOpen && (
                <ModalPortal>

                    <div className="fixed p-3 sm:p-0 inset-0 min-h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white px-6 pt-6 pb-4 rounded-lg shadow-md max-w-lg w-full relative">
                            <button
                                onClick={handleCloseVariantsModal}
                                className="absolute top-5 right-5 text-gray-500 hover:text-black text-2xl font-bold"
                            >
                                &times;
                            </button>

                            <h2 className="text-xl font-semibold mb-2 text-center">Variantes</h2>
                            <p className="text-sm font-semibold mb-4 text-center">{titulo}</p>

                            <div className="flex flex-wrap gap-2 max-h-[60vh] overflow-y-auto pr-2">
                                {variantes.map((variant, index) => (
                                    <span
                                        key={index}
                                        className="text-sm text-gray-800 border border-gray-300 px-3 py-1 rounded-full"
                                    >
                                        {variant.dato_2_mul}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>
                </ModalPortal>
            )}
        </div>
    );

};

export default ProductGrid;