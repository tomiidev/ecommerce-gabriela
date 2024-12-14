import React, { useState } from 'react';
import TopInfo from './top';
import Nav from './nav';
import Footer from './footer';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/cart';
import SearchBar from './search_bar';
import { API_PROD } from '../lib/apis';

const Checkout = () => {
    const { state } = useLocation()
    console.log(state)
    const { cartItems, /* totalMonto, subtotal, discountAmount */ } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('envio'); // Estado para envío/retiro
    const paymentMethods = [
        { value: 'transferencia', label: 'Transferencia bancaria' },
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'pos', label: 'Pos' },
    ];

    const renderPaymentMethods = () => {
        return paymentMethods.map(method => (
            <div className="checkout__input__checkbox" key={method.value}>
                <label htmlFor={method.value}>
                    {method.label}
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        id={method.value}
                        onChange={(e) => {
                            setPaymentMethod(method.value);
                            handleInputChange(e);
                        }}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
        ));
    };

    const renderPaymentDetails = () => {
        switch (paymentMethod) {
            case 'transferencia':
                return <p>Nombre: Juan Pérez<br />N° de cuenta: 1234567890</p>;
            case 'efectivo':
                return <p>Pagas en efectivo al momento de recibir tu compra.</p>;
            case 'pos':
                return <p>Pagas con POS en el momento de la entrega.</p>;
            default:
                return <p>Selecciona un método de pago para ver los detalles.</p>;
        }
    };
    const [orderData, setOrderData] = useState({
        fullName: "",
        deliveryOption: deliveryOption,
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
        notes: "",
        paymentMethod: paymentMethod,
    });

    // Manejador genérico para actualizar el estado de la compra
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData({
            ...orderData,
            [name]: value,
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(orderData)

        // Validación de los campos obligatorios
      /*   if (orderData.fullName === "") {
            alert('Por favor ingresa tu nombre completo');

        } */
        /*  if (orderData.fullName === "" ||
             orderData.city.trim() === "" ||
             orderData.postalCode.trim() === "" ||
             orderData.phone.trim() === "" ||
             orderData.email.trim() === "" ||
             orderData.notes === "" ||
             orderData.paymentMethod === "") {
             console.log(orderData)
             alert('Todos los campos son obligatorios');
 
         } */

        // Validación de formato de correo electrónico
       /*  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(orderData.email)) {
            alert('Por favor ingresa un correo electrónico válido');

        } */

        // Validación de formato de teléfono (solo números y longitud mínima de 10 caracteres)
     /*    const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(orderData.phone)) {
            alert('Por favor ingresa un número de teléfono válido (al menos 10 dígitos)');
            return;
        }
 */
        // Validación de código postal (asegurarse de que es numérico y tiene una longitud mínima de 4 caracteres)
     /*    const postalCodeRegex = /^[0-9]{4,}$/;
        if (!postalCodeRegex.test(orderData.postalCode)) {
            alert('Por favor ingresa un código postal válido');
            return */;
       /*  } */
        const payload = {
            ...orderData,
            items: cartItems,
            totalAmount: state.totalMonto,
            subtotal: state.subtotal,
            discountAmount: state.discount,
        };

        // Aquí puedes enviar el payload al backend con una petición fetch o axios
        console.log('Datos enviados al backend:', payload);
        // Ejemplo usando fetch:
         fetch(`${API_PROD}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({payload: payload}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Respuesta del servidor:', data);
                // Aquí podrías redirigir al usuario o mostrar un mensaje de confirmación
            })
            .catch((error) => {
                console.error('Error al enviar la orden:', error);
            }); 
    };






    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            <TopInfo />
            {/*    <SearchBar/> */}
            {/*    <header className="header">
                <Nav />
            </header> */}

            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Check Out</h4>
                                <div className="breadcrumb__links">
                                    <Link to="/">Inicio</Link>
                                    <Link to="/shop">Explorar</Link>
                                    <span>Check Out</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout spad">
                <div className="container">
                    <div className="checkout__form">
                        <div className="row text-left">

                            <div className="col-lg-8 col-md-6">
                                <h6 className="coupon__code">
                                    <span className="icon_tag_alt"></span>¿Te olvidaste de ingresar un cupón?
                                    <Link to="/cart">Clickea acá</Link> para ingresarlo
                                </h6>
                                <h6 className="checkout__title">Detalle de factura</h6>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="checkout__input">
                                            <p>Nombre completo<span>*</span></p>
                                            <input
                                                value={orderData.fullName} // Vincula el valor al estado
                                                onChange={handleInputChange} name="fullName" type="text" placeholder="Tu nombre completo" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout__input">
                                    <p>Opciones de entrega<span>*</span></p>
                                    <select

                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-500"
                                        name='deliveryOption'
                                        value={deliveryOption}
                                        onChange={(e) => {

                                            setDeliveryOption(e.target.value); // Actualiza el estado con el valor seleccionado
                                            handleInputChange(e); // Asegúrate de actualizar el estado del objeto orderData
                                        }}
                                        required
                                    >
                                        <option value="envio">Envío a domicilio</option>
                                        <option value="local">Retiro en el local</option>
                                    </select>

                                </div>
                                {
                                    deliveryOption === "envio" ? (
                                        <div className="checkout__input">
                                            <p>Dirección<span>*</span></p>
                                            <input type="text" placeholder="Dirección: calle y esq."
                                                onChange={handleInputChange} className="checkout__input__add" name="address" />
                                            <input type="text" name="apartment" placeholder="Apartmento, suite, etc (opcional)" />
                                        </div>
                                    ) : <></>
                                }
                                <div className="checkout__input mt-5">
                                    <p>Ciudad<span>*</span></p>
                                    <input type="text" name="city"
                                        value={orderData.city}
                                        onChange={handleInputChange}
                                        placeholder="Ciudad" required />
                                </div>

                                <div className="checkout__input">
                                    <p>Código postal<span>*</span></p>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={orderData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="Código postal"
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>Teléfono<span>*</span></p>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={orderData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Teléfono"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>Email<span>*</span></p>
                                            <input
                                                type="email"
                                                name="email"
                                                value={orderData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="checkout__input">
                                    <p>Nota extra que quieras que sepamos :)<span></span></p>
                                    <input
                                        type="text"
                                        name="notes"
                                        value={orderData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Deja tu mensaje"
                                    />


                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="checkout__order">
                                    <h4 className="order__title">Tu orden</h4>
                                    <div className="checkout__order__products">Producto(s) <span>Total</span></div>
                                    <ul className="checkout__total__products">
                                        {
                                            cartItems.map((product) => (
                                                <li key={product.id}>{product.titulo} <span>{product.precio * product.cantidad}</span></li>
                                            ))
                                        }
                                    </ul>
                                    <ul className="checkout__total__all ">
                                        <li className="flex justify-between">
                                            Subtotal <div>$ {state.subtotal}</div>
                                        </li>
                                        <hr />
                                        <li className="flex justify-between">
                                            Descuento <div>- $ {state.discount}</div>
                                        </li>
                                        <hr />
                                        <li className="flex justify-between font-semibold text-gray-600">
                                            Total <div>$ {state.totalMonto}</div>
                                        </li>
                                    </ul>

                                    {renderPaymentMethods()}

                                    <p>{renderPaymentDetails()}</p>
                                    <button
                                        type='button'
                                        className='site-btn'
                                        style={{
                                            color: "#fff",
                                            borderRadius: "2px",
                                            fontWeight: "lighter",
                                            fontFamily: "questrial, sans-serif",
                                            letterSpacing: "1px",
                                            backgroundColor: "#af1010",
                                            border: "none",
                                            padding: "10px 20px",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onClick={(e) => {
                                            handleSubmit(e);  // Llama a handleSubmit manualmente
                                        }}
                                    >
                                        ¡Listo!
                                    </button>
                                    <p className='mt-2'>*¡IMPORTANTE! Al hacer click en el "¡LISTO!" tu compra quedará registrada en el sistema.</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </section>

            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">+</div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
