import { Link } from "react-router-dom";
import Rights from "./rights";

const Footer = () => {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="footer__widget text-left text-white">
                            {/*   <div class="footer__logo"> */}
                            <h6>Principal</h6>
                            {/*      </div> */}
                            <p>Porongos 2419, Montevideo, Uruguay.</p>
                            <p>095 187 673 - 2 205 5741</p>
                            <p>vetlacomercial@hotmail.com</p>
                            <p>Lunes a Sábado de 9:00 a 20:00hs.</p>

                        </div>
                    </div>
                    <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                        <div class="footer__widget text-left text-white">
                            <h6>Métodos de pago</h6>

                            <p>Transferencia bancaria</p>
                            <p>Mercado Pago</p>
                            <p>Efectivo</p>
                            <p>Pos en el momento</p>
                        </div>
                    </div>
                    <div class="col-lg-4 offset-lg-1 col-md-3 col-sm-6">
                        <div class="footer__widget text-left">
                            <h6>Seguínos en las redes sociales</h6>
                            <ul class="d-flex list-unstyled">
                                <li class="mr-3">
                                    <Link to="https://www.facebook.com/VeterinariaLaComercial" target="_blank" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                        </svg>
                                    </Link>
                                </li>
                                <li class="mr-3">
                                    <Link to="https://www.instagram.com/vet.la.comercial/" target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                            <path d="M16.5 7.5l0 .01"></path>
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                    <div class="footer__widget">
                        <h6>NewLetter</h6>
                        <div class="footer__newslatter">
                            <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                            <form action="#">
                                <input type="text" placeholder="Your email" />
                                <button type="submit"><span class="icon_mail_alt"></span></button>
                            </form>
                        </div>
                    </div>
                </div> */}
                </div>
                <Rights />
            </div>
        </footer>
    )
}

export default Footer;