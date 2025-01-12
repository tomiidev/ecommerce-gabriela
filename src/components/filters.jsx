import React from "react";
import { Link } from "react-router-dom";

export function FiltersDrawer({ setIsAccordionOpen, isAccordionOpen, open, setOpen, handlePriceChange, clearFilters, applyFilters }) {
  // Cerrar el Drawer
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50 flex flex-col`}
      >
        {/* Contenido del Drawer */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-800">Filtros</h2>
          <button
            onClick={closeDrawer}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="shop__sidebar__accordion">
            <div className="accordion border-b border-gray-300" id="accordionExample">
              <div className="card p-4">
                <div
                  className="card-heading flex items-center justify-between cursor-pointer"
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                  <p className="text-black font-light  text-left font-poppins">
                   PRECIO
                  </p>
                  {/* Flecha que rota dependiendo del estado */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transform transition-transform duration-300 ${isAccordionOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Contenido del acordeón con transición */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${isAccordionOpen ? "max-h-screen" : "max-h-0"
                    }`}
                >
                  <div className="card-body">
                    <div className="shop__sidebar__price">
                      <div className="text-left text-gray-600">
                        <div>
                          <p
                            to="#"
                            className="text-gray-600 no-underline"
                            onClick={(e) => handlePriceChange(0, 500)}
                          >
                            $0.00 - $500.00
                          </p>
                        </div>
                        <div>
                          <p
                            to="#"
                            className="text-gray-600 no-underline"
                            onClick={(e) => handlePriceChange(501, 1000)}
                          >
                            $501.00 - $1,000.00
                          </p>
                        </div>
                        <div>
                          <p
                            to="#"
                            className="text-gray-600 no-underline"
                            onClick={(e) => handlePriceChange(501, 1000)}
                          >
                            $1001.00 - $1,500.00
                          </p>
                        </div>
                        {/* Otros filtros */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones en la parte inferior de la pantalla */}
       {/*  <div className="p-2 fixed bottom-4 left-0 w-80 bg-white flex justify-between gap-2">
          <button
            onClick={clearFilters}
            className="w-1/2 bg-transaprent boder border-1 border-gray-500 text-gray-700 p-3 text-sm rounded-sm hover:bg-gray-300 transition duration-2000"
          >
            Limpiar filtros
          </button>
          <button
            onClick={applyFilters}
            className="w-1/2 bg-red-700 text-white p-3 text-sm rounded-sm hover:bg-red-800 transition duration-2000"
          >
            Aplicar filtros
          </button>
        </div> */}
      </div>

      {/* Fondo oscuro al abrir el drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}
    </div>
  );
}
