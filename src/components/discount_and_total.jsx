const DiscountAndTotal = ({
    subtotal,
    discountAmount,
    totalMonto,
    applyDiscount,
    discountCode,
    setDiscountCode,
    isDiscountApplied,
    showCouponInput,
    cartItems
}) => {
    console.log(isDiscountApplied, discountCode)
    return (
        <>
            <div className="cart__discount">
                <h6 className="text-lg font-semibold ">Código de descuento</h6>
                <div className='items-center flex justify-center gap-2'>
                    <input
                        type="text"
                        placeholder="Ingresa el código"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        disabled={cartItems.length === 0 || isDiscountApplied === true}
                        onClick={applyDiscount}
                        type="button"
                        className={`sm:mt-0 text-white py-2 px-4 rounded-sm transition font-questrial ${isDiscountApplied === false || cartItems.length === 0
                            ? "bg-gray-400"
                            : "bg-red-700 hover:bg-red-800"
                            }`}
                    >
                        {isDiscountApplied === true ? "Aplicado" : "Agregar"}
                    </button>
                </div>
            </div>

            <div className="cart__total w-full  bg-white rounded border space-y-4 mt-8 flex flex-col justify-between">
                <div className="border-b border-gray-300 flex items-center justify-between ">
                    <h6 className="text-sm font-semibold font-poppins">Resumen</h6>
                    <h6 className="text-sm font-semibold font-poppins">{cartItems.length} items</h6>
                </div>
                <div className="space-y-4 flex flex-col font-questrial">
                    <p className="flex justify-between">
                        Subtotal <span className="text-black">$ {subtotal}</span>
                    </p>
                    <p className="flex justify-between">
                        Descuento <span className="text-black">- $ {discountAmount}</span>
                    </p>
                    <p className="flex justify-between  text-sm">
                        Total <span className="text-black">$ {totalMonto}</span>
                    </p>
                </div>
            </div>
        </>
    );
}
export default DiscountAndTotal