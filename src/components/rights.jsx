const Rights = () => {
    return (
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="footer__copyright__text">

                    <p>Copyright ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script>2024
                        Todos los derechos reservados | Desarrollado <i class="fa fa-heart-o"
                            aria-hidden="true"></i> por <a href="https://keplan.vercel.app" target="_blank" rel="noreferrer">Keplan</a>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Rights;