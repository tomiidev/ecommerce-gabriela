import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            {/* Botón de "Anterior" */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <span className="material-icons">chevron_left</span>

            </button>

            {/* Botones de números de página */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-lg font-medium rounded-full transition-all transform ${page === currentPage
                            ? 'bg-red-600 text-white shadow-lg scale-105 hover:bg-red-700'  // Cuando es la página actual
                            : 'bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:text-white'  // Cuando no es la página actual
                        }`}
                >
                    {page}
                </button>

            ))}

            {/* Botón de "Siguiente" */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >

                <span className="material-icons">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
