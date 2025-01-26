import React from "react";
import { IoMdCheckmark } from "react-icons/io";
export function CartDrawer({
  subtotal,
  discountAmount,
  cartItems,
  totalMonto,
  validCodes,
  isDiscountApplied,
  onCheckout,
  discountCode,
  applyDiscount,
  setDiscountCode,
  objetoCompra,
  showCouponInput,
  setShowCouponInput,
}) {
  const [open, setOpen] = React.useState(true);

  // Mostrar el input del cupón
  const handleShowCouponInput = () => setShowCouponInput(true);

  // Ocultar el input del cupón
  const handleHideCouponInput = () => setShowCouponInput(false);


  return (
    <React.Fragment>

      {/* Drawer Component */}
      <div
        id="drawer-form"
        className={`fixed border-t border-gray-300 bottom-0 left-0 z-40 w-full p-4 overflow-y-auto transition-transform duration-300 ease-in-out ${open ? "translate-y-0" : "translate-y-full"
          } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-form-label"
      >
        {/* Nueva sección para agregar cupón */}
        {!showCouponInput ? (
          <div className="flex justify-between items-center mb-4">
            {/* Icono y texto de la pregunta */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-tags"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2z" />
                <path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592" />
                <path d="M7 10h-.01" />
              </svg>
              <span className="text-sm font-semibold font-poppins text-xs">
                ¿Tenes un cupón?
              </span>
            </div>

            {/* Botón de agregar cupón o mensaje si el cupón es válido */}
            <button
              disabled={isDiscountApplied}
              onClick={handleShowCouponInput}
              className="flex items-center text-gray-400 font-questrial hover:text-gray-600 transition"
            >
              <span className="text-xs">
                {
                  isDiscountApplied
                    ? "Agregado"
                    : "Agregar cupón"
                }
              </span>
              {
                isDiscountApplied ? ""
                  : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>}
            </button>
          </div>
        ) : (
          <div className="relative flex flex-col gap-2 mb-4">
            {/* Botón de cerrar */}
            <button
              onClick={handleHideCouponInput}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-xs font-bold"
            >
              ×
            </button>
            <h6 className="text-sm font-semibold">Código de descuento</h6>
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled={cartItems.length === 0}
                placeholder="Ingresa el código"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className={`w-3/4 p-1 border  border-gray-300 rounded font-questrial`}
              />
              <button
                disabled={cartItems.length === 0 || !validCodes.includes(discountCode.toUpperCase())}
                onClick={applyDiscount}
                type="button"
                className={`w-1/4 font-questrial ${cartItems.length === 0 ? "bg-gray-400" : "bg-red-700 hover:bg-red-800"} my-1  text-white p-1 text-sm rounded-sm  transition`}
              >
                Aplicar
              </button>
            </div>
          </div>
        )}

        <div className=" text-sm text-gray-500 dark:text-gray-400 gap-2 mt-3 border-t pt-2">
          <div className="flex justify-between">
            <span className="text-left text-xs font-poppins text-black"><strong>Subtotal</strong></span>
            <span className="text-left text-xs font-questrial  text-black">${subtotal}</span>
          </div>
          <div className="justify-between flex">
            <span className="text-left text-xs text-black font-poppins"><strong>Total</strong></span>
            <span className="text-left text-xs font-questrial text-black">${totalMonto}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-2 mt-3 border-t pt-2">
          {/*  <div className="flex flex-col w-2/4">
            <span className="text-left text-xs font-poppins">Total</span>
            <span className="text-left text-xl font-questrial text-green-500">${totalMonto}</span>
          </div> */}
          <button
            disabled={cartItems.length === 0}
            onClick={onCheckout}
            className={`block text-center w-full p-3  text-white rounded-sm no-underline  ${cartItems.length === 0 ? "bg-gray-400" : "bg-red-700 hover:bg-red-800"} transition font-questrial`}
          >
            Ir al checkout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
