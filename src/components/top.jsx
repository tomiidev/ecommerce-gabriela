const TopInfo = () => {
    return (
        <div className="p-2 bg-red-700 d-block">
            <div className="container">
                <div className="row text-white">
                    <div className="col-lg-12 col-md-12">
                        <div className="d-flex justify-content-center align-items-center">
                            {/* Ícono y texto de Envíos a domicilio */}
                            <div className="d-flex align-items-center mr-4 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                                </svg>
                                <p className="mb-0">Envíos a domicilio</p>
                            </div>
                            {/* Ícono y texto del número de teléfono */}
                            <div className="d-flex align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                    <path d="M20 4l-2 2"></path>
                                    <path d="M22 10.5l-2.5 -.5"></path>
                                    <path d="M13.5 2l.5 2.5"></path>
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2"></path>
                                </svg>
                                <p className="mb-0 mr-3">095 187 673</p>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopInfo;
