import React from 'react';

const SubmitButton = ({ cartItems, handleSubmit, isLoading, orderData }) => {
    /*  const isDisabled = cartItems.length === 0  || isLoading === true || orderData.paymentMethod === "" ; */
    const isDisabled = true;
    return (
        <button
            disabled={isDisabled}
            type="button"
            className={`flex items-center justify-center gap-2 w-full p-2 rounded-sm transition-all duration-200 ${isDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 cursor-pointer'
                }`}
            onClick={handleSubmit}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    <span className="text-white text-sm font-questrial">Procesando...</span>
                </div>
            ) : (
                <span className="text-white text-sm sm:text-lg font-questrial">¡Comprar!</span>
            )}
        </button>
    );
};

export default SubmitButton;
