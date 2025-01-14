import QuantitySelector from "./quantity_selector";
import QuantitySelectorMobile from "./selector__mobile";

const AddCartMobileComponent = ({ q, setQ, addToCart, addingToCart }) => {
    return (
        <div
            className="sm:hidden fixed bottom-0 left-0 w-full p-4 bg-white shadow-lg md:static md:p-0 flex items-center gap-4"
            style={{ zIndex: 1000 }}
        >
            {/* Selector de cantidad */}
            <div className="w-1/4">
                <QuantitySelectorMobile q={q} setQ={setQ} />
            </div>

            {/* Botón de agregar al carrito */}
            <div className="w-3/4">
                <button
                    className="w-full bg-red-700 text-white py-3 rounded-sm hover:bg-red-500 transition font-questrial"
                    onClick={addToCart}
                >
                    {addingToCart ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        "AGREGAR AL CARRITO"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddCartMobileComponent
