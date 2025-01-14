import React from "react";

const QuantitySelectorMobile = ({ q, setQ, minQuantity = 1, maxQuantity = 10, cambiarCantidad, product }) => {

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
            setQ(newQuantity);
            cambiarCantidad(product, newQuantity);
        }
    };

    return (
        /*     <div className="relative"> */
        <select
            value={q}
            onChange={handleQuantityChange}
            className="block w-full  py-3 text-black font-questrial bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm appearance-none"
        >
            {Array.from({ length: maxQuantity - minQuantity + 1 }, (_, i) => i + minQuantity).map((num) => (
                <option key={num} value={num}>
                    {num}
                </option>
            ))}
        </select>

        /*   </div> */
    );
};

export default QuantitySelectorMobile;
