const ModalWithVariants = ({ isModalOpen,variantes, handleCloseVariantsModal, titulo }) => {
    return (
        <>
            {isModalOpen && (
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
            )}
        </>

    )
}

export default ModalWithVariants