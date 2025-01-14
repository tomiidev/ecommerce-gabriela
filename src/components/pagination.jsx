import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex mx-auto items-center w-full justify-center space-x-3 mt-6 z-0">
            {/* Botón de "Anterior" */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-2 bg-red-500 text-white rounded-sm font-semibold   hover:bg-red-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <span className="material-icons">chevron_left</span>

            </button>

            {/* Botones de números de página */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-lg font-medium font-questrial rounded-full transition-all transform ${page === currentPage
                            ? 'bg-red-700 text-white  scale-105 hover:bg-red-700'  // Cuando es la página actual
                            : 'bg-red-400 text-white border border-red-600 hover:bg-red-700 hover:text-white'  // Cuando no es la página actual
                        }`}
                >
                    {page}
                </button>

            ))}

            {/* Botón de "Siguiente" */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-2 bg-red-500 text-white font-semibold rounded-sm   hover:bg-red-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >

                <span className="material-icons">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
