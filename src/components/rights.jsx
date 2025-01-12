import { Link } from "react-router-dom";

const Rights = () => {
    return (
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="footer__copyright__text bg-white">

                    <p className="font-questrial text-black text-xs sm:text-sm">Copyright ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script>2024
                        Todos los derechos reservados | Desarrollado<i class="fa fa-heart-o"
                            aria-hidden="true"></i> por <Link to="https://keplan.vercel.app" target="_blank" rel="noreferrer" className="font-poppins no-underline">Keplan</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Rights;