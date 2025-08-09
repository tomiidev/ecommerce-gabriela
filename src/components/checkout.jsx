import React, { useState } from 'react';
import TopInfo from './top';
import Nav from './nav';
import Footer from './footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import SearchBar from './search_bar';
import { API_PROD, API_URL } from '../lib/apis';
import SubmitButton from './submit_button';
import CartHeader from './header_cart';
import ShoppingCartModal from './modal';
import { IconMap, IconMap2 } from '@tabler/icons-react';
import { IoLocationSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { state } = useLocation()
    console.log(state)
    const { cartItems, clearCart /* totalMonto, subtotal, discountAmount */ } = useCart();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [sandbox_init_point, setSandbox_init_point] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('envio'); // Estado para envío/retiro
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const nv = useNavigate()
    const handleGoHome = () => nv("/");
    const closeModal = () => setIsModalOpen(false);

    const paymentMethods = [
        { value: 'transferencia', label: 'Transferencia bancaria' },
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'pos', label: 'Pos' },
        { value: 'mp', label: 'Mercado Pago' },
    ];



    const renderPaymentDetails = () => {
        switch (paymentMethod) {
            case 'transferencia':
                return <p>Nombre: Juan Pérez<br />N° de cuenta: 1234567890</p>;
            case 'efectivo':
                return <p>Pagas en efectivo al momento de recibir tu compra.</p>;
            case 'pos':
                return <p>Pagas con POS en el momento de la entrega.</p>;
            case 'mp':
                return <p>Serás redirigido al checkout de Mercado Pago.</p>;
            default:
                return <p>Selecciona un método de pago para ver los detalles.</p>;
        }
    };
    const [orderData, setOrderData] = useState({
        fullName: "",
        deliveryOption: deliveryOption,
        address: "",
        street_number: "",
        apartment: "",
        postalCode: "",
        cupon_code: state.cupon_code,
        phone: "",
        email: "",
        notes: "",
       
    });

    // Manejador genérico para actualizar el estado de la compra
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData({
            ...orderData,
            [name]: value,
        });
    };

    console.log(paymentMethod)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Activar estado de carga
        const payload = {
            ...orderData,
            paymentMethod: paymentMethod,
            items: cartItems,
            totalAmount: state.totalMonto,
            subtotal: state.subtotal,
            discountAmount: state.discount,
        };
        if (!paymentMethod) {
            toast.error('Por favor, selecciona un método de pago antes de continuar.');
            setIsLoading(false);
            return;
        }

        /*  setTimeout(async () => { */
        try {

            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payload: payload }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar la orden.');
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (data?.init_point) {
                setSandbox_init_point(data.init_point);
                window.location.href = data.init_point; // Redirección directa
            } else {
                console.log("completa")
                setTimeout(() => {
                    // olver a establecer en false después de agregar al carrito
                    setIsLoading(false);
                    setIsPurchaseComplete(true);
                    openModal();
                }, 2000);  // 3000 ms = 3 segundos

            }
        } catch (error) {
            alert('Hubo un problema al enviar la orden. Por favor, inténtalo de nuevo.');
            console.error('Error al enviar la orden:', error);
        } finally {
            setIsLoading(false);

            /* clearCart(); */  // Limpia el carrito sin depender de otros estados
        }




    };

    /*     const gotomp = () => {
            window.location.href = sandbox_init_point;
        }
     */


    console.log(orderData)
    return (
        <>

            <div className="offcanvas-menu-overlay"></div>
            <CartHeader />
            <section className="checkout">
                <div className="container-fluid">
                    <div className="row justify-center">
                        {/* Primera columna: Formulario */}
                        <div className="col-lg-6 ml-auto p-3   rounded-sm bg-white text-left">
                            <h6 className="coupon__code mb-4">
                                <span className="icon_tag_alt"></span>¿Te olvidaste de ingresar un cupón?
                                <Link to="/cart" className="text-red-500 ml-2">Clickea acá</Link>
                            </h6>
                            <h6 className="checkout__title mb-4">Detalle de factura</h6>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="checkout__input mb-4">
                                        <p>Nombre completo<span>*</span></p>
                                        <input
                                            value={orderData.fullName}
                                            onChange={handleInputChange}
                                            name="fullName"
                                            type="text"
                                            placeholder="Tu nombre completo"
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="checkout__input mb-4">
                                <p>Opciones de entrega<span>*</span></p>
                                <select
                                    className="form-select"
                                    name="deliveryOption"
                                    value={deliveryOption}
                                    onChange={(e) => {
                                        setDeliveryOption(e.target.value);
                                        handleInputChange(e);
                                    }}
                                    required
                                >
                                    <option value="envio">Envío a domicilio</option>
                                    <option value="local">Retiro en el local</option>
                                </select>
                            </div>
                            {deliveryOption === "envio" && (
                                <>
                                    <div className="checkout__input mb-4">
                                        <p>Dirección<span>*</span></p>
                                        <input
                                            type="text"
                                            placeholder="Dirección: calle y esq."
                                            onChange={handleInputChange}
                                            className="form-control mb-3"
                                            name="address"
                                        />
                                        <input
                                            type="text"
                                            name="apartment"
                                            placeholder="N° de apartamento"
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="checkout__input mb-4">
                                        <p>N° de domicilio<span>*</span></p>
                                        <input
                                            type="text"
                                            placeholder="0000"
                                            onChange={handleInputChange}
                                            className="form-control"
                                            name="street_number"
                                        />
                                    </div>
                                </>
                            )}
                            {deliveryOption === "local" && (
                                <>
                                    <div className="checkout__input mb-4">

                                        <div className="flex w-full sm:w-2/5 items-center p-4 bg-white border-2 border-gray-300 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300">
                                            <div className="flex-shrink-0 bg-red-100 text-red-600 p-2 rounded-full">
                                                <IoLocationSharp className="h-4 w-4" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-poppins text-black"><strong>Montevideo</strong></h3>
                                                <p className="text-sm font-questrial text-gray-800">Porongos 2419, 11200</p>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="checkout__input mb-4">
                                <p>Código postal<span>*</span></p>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={orderData.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="Código postal"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input mb-4">
                                        <p>Teléfono<span>*</span></p>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={orderData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Teléfono"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input mb-4">
                                        <p>Email<span>*</span></p>
                                        <input
                                            type="email"
                                            name="email"
                                            value={orderData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="checkout__input">
                                <p>Nota extra que quieras que sepamos :)</p>
                                <input
                                    type="text"
                                    name="notes"
                                    value={orderData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Deja tu mensaje"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        {/* Segunda columna: Resumen checkout__order*/}
                        <div className="col-lg-4 bg-gray-100 pt-0 z-[0]">
                            <div className="p-3  lg:min-h-screen flex flex-col">
                                <h4 className=" text-left  font-poppins ">Tu orden</h4>

                                <div className="checkout__total__all list-unstyled mb-4 font-questrial text-sm">
                                    <p className="d-flex justify-content-between">
                                        Subtotal <span>$ {state.subtotal}</span>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        Descuento <span>- $ {state.discount}</span>
                                    </p>
                                    <p className="d-flex justify-content-between font-weight-bold">
                                        Total <span>$ {state.totalMonto}</span>
                                    </p>
                                </div>
                                <p className='text-left'>{renderPaymentDetails()}</p>
                                {paymentMethods.map((method) => (

                                    <div
                                        key={method.value}
                                        className={`w-full flex items-center mb-4  p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 
                                          ${paymentMethod === method.value ? 'border-red-600 ring-2 ring-red-500' : 'border-gray-300'}
                                         hover:border-gray-500 hover:ring-1 hover:ring-gray-300 focus:outline-none`}
                                        onClick={() => setPaymentMethod(method.value)}
                                    >
                                        <div className={`w-6 h-6 border-2 ${paymentMethod === method.value ? 'border-red-600 bg-red-500' : 'border-gray-300'} 
                                             rounded-full mr-4 flex items-center justify-center transition-colors duration-300`}>
                                            {paymentMethod === method.value && <div className="w-4 h-4 bg-white rounded-full"></div>}
                                        </div>
                                        <span className="text-sm sm:text-lg text-gray-800 font-questrial">{method.label}</span>
                                    </div>
                                ))}
                                <SubmitButton
                                    orderData={orderData}
                                    cartItems={cartItems}
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                />
                                <p className="mt-3  font-questrial text-left">
                                    <strong>¡IMPORTANTE!</strong>- Al hacer click en el "¡LISTO!" tu compra quedará registrada en el sistema.
                                </p>
                                {/*   {sandbox_init_point && (
                                    <button
                                        disabled={sandbox_init_point === ""}
                                        type="button"
                                        className={`btn btn-danger btn-block ${sandbox_init_point === "" ? 'disabled' : ''}`}
                                        onClick={gotomp}
                                    >
                                        Ir a Mercado Pago
                                    </button>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ShoppingCartModal closeModal={closeModal} isModalOpen={isModalOpen} isPurchaseComplete={isPurchaseComplete} handleGoHome={handleGoHome} />
        </>
    );
};

export default Checkout;
