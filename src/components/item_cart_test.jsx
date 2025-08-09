import { useState } from "react";
import QuantitySelector from "./quantity_selector";
import { useCart } from "../context/cart";
import QuantitySelectorMobile from "./selector__mobile";

const ItemCartTest = ({ item, cantidad, removeItemFromCart, product }) => {
    // Función para manejar el cambio de cantidad
    const [q, setQ] = useState(1)

    const { cambiarCantidad } = useCart()

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border-b border-gray-200 py-2">
            {/* Contenedor de imagen y título */}
            <div className="flex items-start w-full sm:w-full sm:flex-row sm:items-center">
                <img
                    src={`https://productosvet.s3.us-east-1.amazonaws.com/${item?.productoTipo}/${item?.categoria}/${item.imagen}`}
                    alt={item.titulo}
                    className="h-32 w-32 rounded img-fluid border p-1"
                />
                <div className="ml-4 flex-1 text-left sm:w-full">
                    <h3 className="text-sm font-medium font-poppins text-gray-900 dark:text-white">
                        {item.titulo}
                    </h3>
                  {/*   <p className="text-xs font-questrial text-gray-500 dark:text-gray-400">
                        <strong>Código: </strong>{item.id}
                    </p> */}
                    {item.color && <p className="text-xs font-questrial text-gray-500 dark:text-gray-400">
                        <strong>Color: </strong>{item.color}
                    </p>}
                    {item.peso && <p className="text-xs font-questrial text-gray-500 dark:text-gray-400">
                        <strong>Peso: </strong>{item.peso}
                    </p>}
                </div>
            </div>

            {/* Contenedor principal para precio, contador y botón de eliminar */}
            <div className="flex items-center  justify-between  sm:gap-8 w-full  sm:w-full mt-1 sm:mt-0">
                {/* Contenedor para el contador */}
                <div className="flex items-center justify-center space-x-2">

                    <QuantitySelectorMobile q={cantidad} setQ={setQ} cambiarCantidad={cambiarCantidad} product={product} />
                </div>

                {/* Contenedor para el precio y el botón de eliminar */}
                <div className="flex items-center gap-4">
                    {/* Precio */}
                    <span className="text-sm font-bold font-questrial text-gray-900 dark:text-white">
                        ${item.cantidad * item.precio}
                    </span>

                    {/* Botón de eliminar */}
                    <button
                        type="button"
                        onClick={() => removeItemFromCart(item)}
                        className="text-sm text-red-600 hover:underline dark:text-red-50 bg-gray-100 rounded-full p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCartTest;
