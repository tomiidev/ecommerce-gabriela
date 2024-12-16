import '../App.css';
import Footer from './footer';
import { Link } from 'react-router-dom';
import Navbar from './nav';
import TopInfo from './top';

const VistaServicios = () => {
    return (
        <div>

            <TopInfo />
                    <Navbar />
          



            {/*  <h2 className="titulo-servicios text-left">Servicios</h2> */}

            <div className="container my-5">
                {/*    <div className="row"> */}

                <div className="col-12 col-lg-12" style={{ fontFamily: 'Roboto' }}>

                    <h3 className="item">Consultas veterinarias</h3>
                    <div className="row">
                        <div className="col-12 col-lg-9 mt-2">
                            <span>
                                <p>
                                    Trabajamos de 9 a 20 hs de lunes a sábados, podes tener consultas veterinarias en ese horario con agenda previa (a medida de lo posible, siempre agendar antes).
                                    Contamos con:{' '}
                                </p>
                            </span>
                            <ul className="lista">
                                <li> Controles médicos.</li>
                                <li> Cirugías.</li>
                                <li> Ecografías.</li>
                                <li> Radiologías.</li>
                                <li> Exámenes de laboratorio.</li>
                            </ul>
                        </div>
                        <div className="col-lg-3">

                            <img
                                src={require('../img/consulta servicio.jpg')}
                                className="img-servicio-consulta col-8 col-lg-12"
                                alt=""
                            />
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-12 col-lg-12" style={{ fontFamily: 'Roboto' }}>
                        <h3 className="item">Urgencias</h3>
                        <span>
                            <p className='col-12'>
                                Estamos las 24 hs comunicarse al 095 187 673.
                            </p>
                        </span>
                    </div>
                </div>

                <div className="row justify-content-center seg mt-2">

                    <div className="col-12 col-lg-12">

                        <h3 className="item">Peluqueria</h3>
                        <div className="row mt-5">

                            <div className="col-12 col-lg-3">

                                <img
                                    src={require('../img/baño perro.jpg')}
                                    className="img-servicio-consulta col-12 col-lg-12"

                                    alt=""
                                />
                            </div>

                            <div
                                className="col-4 col-lg-3"
                                style={{ fontFamily: 'Roboto' }}
                            >
                                <span>
                                    <p style={{ textDecoration: 'underline' }}>
                                        Baños
                                    </p>
                                </span>
                                <p>Hasta 10 kg $500</p>
                                <p>De 10 a 40 kg $600</p>
                                <p>Mas de 40 kg $700</p>
                            </div>

                            <div
                                className="col-4 col-lg-3"
                                style={{ fontFamily: 'Roboto' }}
                            >

                                <span>
                                    <p style={{ textDecoration: 'underline' }}>
                                        Esquilas y baño
                                    </p>
                                </span>
                                <p>Hasta 10 kg $800</p>
                                <p>De 10 a 40 kg $900</p>
                                <p>Mas de 40 kg $1000</p>
                            </div>
                            <div className="col-4 col-lg-3">

                                <span>
                                    <p style={{ textDecoration: 'underline' }}>
                                        Deslanados y baño
                                    </p>
                                </span>
                                <p>Hasta 10 kg $600</p>
                                <p>De 10 a 40 kg $650</p>
                                <p>Mas de 40 kg $700</p>
                            </div>

                        </div>
                        <div
                            className="col-12 col-lg-12 mb-5 mt-5"
                            style={{ fontFamily: 'Roboto' }}
                        >

                            <h3 className="item">Envíos</h3>
                            <span>
                                <p className='mt-4'>
                                    Realizamos envíos a todo Montevideo, con compras mayores a $2.000 el envío es gratuito, con compras menores, el costo del envío es $200.
                                    También realizamos envíos al interior a través de encomiendas con costo a cargo del comprador.

                                </p>
                                <p>
                                    Luego de realizar la compra por la web nosotros nos comunicaremos con usted para coordinar el envío.
                                </p>
                            </span>

                        </div>
                    </div>
                </div>


            </div>

            <div className="row">

                <Footer />
            </div>
        </div>
    );
};

export default VistaServicios;
