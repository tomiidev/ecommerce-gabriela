const ShoppingCartModal = ({ isModalOpen, closeModal, continueShopping, viewCart,isPurchaseComplete, handleGoHome }) => {
    if (!isModalOpen) return null;
    console.log(isModalOpen)
    return (
        <div className={`fixed p-4 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isModalOpen ? 'block' : 'hidden'}`}>
            <div className="relative bg-white p-8 rounded-sm max-w-lg w-full shadow-lg">
                {/* Close Button (cruz fuera del contenedor pero alineada) */}
                <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 -mt-3 -mr-3 text-gray-600 hover:text-red-600 z-20 bg-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="24"
                        height="24"
                        strokeWidth="2"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="text-center">
                {isPurchaseComplete ? (
                        <>
                            <h2 className="text-sm sm:text-2xl mb-4 font-poppins">¡Compra completada con éxito!</h2>
                            <p className="text-sm sm:text-lg text-gray-600 mb-6 font-questrial">
                                Tu compra ha sido procesada correctamente. Gracias por tu compra.
                            </p>

                            {/* Button to go home */}
                            <button
                                onClick={handleGoHome}
                                className="text-sm sm:text-md p-3 bg-green-600 text-white rounded-sm hover:bg-green-700 transition duration-300 font-questrial"
                            >
                                Volver al inicio
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-sm sm:text-2xl mb-4 font-poppins">Producto agregado al carrito</h2>
                            <p className="text-sm sm:text-lg text-gray-600 mb-6 font-questrial">
                                ¿Qué deseas hacer a continuación?
                            </p>

                            {/* Buttons for continuing shopping or viewing the cart */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    onClick={continueShopping}
                                    className="text-sm sm:text-md p-3 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition duration-300 font-questrial"
                                >
                                    Seguir comprando
                                </button>
                                <button
                                    onClick={viewCart}
                                    className="text-sm sm:text-md p-3 bg-red-600 text-white rounded-sm hover:bg-red-700 transition duration-300 font-questrial"
                                >
                                    Ver carrito
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartModal;
