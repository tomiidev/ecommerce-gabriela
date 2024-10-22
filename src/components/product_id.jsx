import p4 from "../img/shop-details/product-big-4.png"
import thumb1 from "../img/shop-details/thumb-1.png"
import thumb2 from "../img/shop-details/thumb-2.png"
import thumb3 from "../img/shop-details/thumb-3.png"
import thumb4 from "../img/shop-details/thumb-4.png"
import TopInfo from "./top"
import Nav from "./nav"
import Product from "./product"
import OwlCarousel from "react-owl-carousel";
import Footer from "./footer"
import { useMediaQuery } from "react-responsive"
import { useCart } from "../context/cart"
import { useState } from "react"
import QuantitySelector from "./quantity_selector"
const ProductID = () => {
    const [q, setQ] = useState(1)
    const { addItemToCart } = useCart(); // Usa el contexto del carrito
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const options = {
        nav: true,
        autoplay: true,
        items: isMobile ? 1 : 4,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
    };
    const addToCart = () => {
        // Aquí podrías agregar detalles adicionales del producto
        addItemToCart({});
        /*   setAdded({ open: true, vertical: 'bottom', horizontal: 'right' }); */
    };
    return (
        <>

            <div class="offcanvas-menu-overlay"></div>
            <TopInfo />

            <header class="header">

                <Nav />
            </header>

            <section class="shop-details">
                <div class="product__details__pic">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__details__breadcrumb">
                                    <a href="./index.html">Inicio</a>
                                    <a href="./shop.html">Explorar</a>
                                    <span>Detalle</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-3">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                                            <div class="product__thumb__pic set-bg" style={{ backgroundImage: thumb1 ? `url(${thumb1})` : "none" }}>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                                            <div class="product__thumb__pic set-bg" style={{ backgroundImage: thumb1 ? `url(${thumb2})` : "none" }}>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                                            <div class="product__thumb__pic set-bg" style={{ backgroundImage: thumb1 ? `url(${thumb3})` : "none" }}>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                                            <div class="product__thumb__pic set-bg" style={{ backgroundImage: thumb4 ? `url(${thumb4})` : "none" }}>
                                                <i class="fa fa-play"></i>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-6 col-md-9">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div class="product__details__pic__item">
                                            <img src={require("../img/shop-details/product-big-2.png")} alt="" />
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                                        <div class="product__details__pic__item">
                                            <img src={require("../img/shop-details/product-big-3.png")} alt="" />
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-3" role="tabpanel">
                                        <div class="product__details__pic__item">
                                            <img src={p4} alt="" />
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-4" role="tabpanel">
                                        <div class="product__details__pic__item">
                                            <img src={require("../img/shop-details/product-big-4.png")} alt="" />
                                            <a href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1" class="video-popup"><i class="fa fa-play"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product__details__content">
                    <div class="container">
                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-8">
                                <div class="product__details__text">
                                    <h4>Hooded thermal anorak</h4>
                                    <div class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star-o"></i>
                                        <span> - 5 Reviews</span>
                                    </div>
                                    <h3>$270.00 <span>70.00</span></h3>
                                    <p>Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable
                                        cuff tabs, adjustable asymmetric hem with elastic side tabs and a front zip fastening
                                        with placket.</p>
                                    <div class="product__details__option">
                                        <div class="product__details__option__size">
                                      
                                            <label for="xxl">xxl
                                                <input type="radio" id="xxl" />
                                            </label>
                                            <label class="active" for="xl">xl
                                                <input type="radio" id="xl" />
                                            </label>
                                            <label for="l">l
                                                <input type="radio" id="l" />
                                            </label>
                                            <label for="sm">s
                                                <input type="radio" id="sm" />
                                            </label>
                                        </div>
                                        <div class="product__details__option__color">
                                           
                                            <label class="c-1" for="sp-1">
                                                <input type="radio" id="sp-1" />
                                            </label>
                                            <label class="c-2" for="sp-2">
                                                <input type="radio" id="sp-2" />
                                            </label>
                                            <label class="c-3" for="sp-3">
                                                <input type="radio" id="sp-3" />
                                            </label>
                                            <label class="c-4" for="sp-4">
                                                <input type="radio" id="sp-4" />
                                            </label>
                                            <label class="c-9" for="sp-9">
                                                <input type="radio" id="sp-9" />
                                            </label>
                                        </div>
                                    </div>
                                    <div class="product__details__cart__option">
                                        <div class="quantity">
                                          
                                            <QuantitySelector q={q} setQ={setQ} />
                                        
                                        </div>
                                        <button
                                            onClick={addToCart}
                                            style={{
                                                color: "#fff",
                                                borderRadius: 0.5,
                                                fontWeight: "lighter",
                                                fontFamily: "questrial",
                                                letterSpacing: 1,
                                                backgroundColor: "#af1010",
                                                '&:hover': {
                                                    backgroundColor: "#af1010",
                                                },
                                            }}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>

                                    <div class="product__details__last__option">
                                        <h5><span>Otro</span></h5>
                                        <img src="img/shop-details/details-payment.png" alt="" />
                                        <ul>
                                            <li><span>SKU:</span> 3812912</li>
                                            <li><span>Categoria:</span> Clothes</li>
                                            <li><span>Etiquetas:</span> Clothes, Skin, Body</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__details__tab">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#tabs-5"
                                                role="tab">Descripción</a>
                                        </li>
                                        {/*  <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Customer
                                                Previews(5)</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#tabs-7" role="tab">Additional
                                                information</a>
                                        </li> */}
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                            <div class="product__details__tab__content">
                                                <p class="note">Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                                    solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis
                                                    ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo
                                                    pharetras loremos.</p>
                                                <div class="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p>
                                                </div>
                                                <div class="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                                        from synthetic materials, not natural like wool. Polyester suits become
                                                        creased easily and are known for not being breathable. Polyester suits
                                                        tend to have a shine to them compared to wool and cotton suits, this can
                                                        make the suit look cheap. The texture of velvet is luxurious and
                                                        breathable. Velvet is a great choice for dinner party jacket and can be
                                                        worn all year round.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tabs-6" role="tabpanel">
                                            <div class="product__details__tab__content">
                                                <div class="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p>
                                                </div>
                                                <div class="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                                        from synthetic materials, not natural like wool. Polyester suits become
                                                        creased easily and are known for not being breathable. Polyester suits
                                                        tend to have a shine to them compared to wool and cotton suits, this can
                                                        make the suit look cheap. The texture of velvet is luxurious and
                                                        breathable. Velvet is a great choice for dinner party jacket and can be
                                                        worn all year round.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tabs-7" role="tabpanel">
                                            <div class="product__details__tab__content">
                                                <p class="note">Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                                    solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis
                                                    ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo
                                                    pharetras loremos.</p>
                                                <div class="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p>
                                                </div>
                                                <div class="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                                        from synthetic materials, not natural like wool. Polyester suits become
                                                        creased easily and are known for not being breathable. Polyester suits
                                                        tend to have a shine to them compared to wool and cotton suits, this can
                                                        make the suit look cheap. The texture of velvet is luxurious and
                                                        breathable. Velvet is a great choice for dinner party jacket and can be
                                                        worn all year round.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="related spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3 class="related-title">Productos relacionados</h3>
                        </div>
                    </div>
                    <div class="row">
                        <OwlCarousel className="hero__slider" {...options}>
                            {
                                Array.from({ length: 5 }).map((_, index) => {
                                    return (
                                        <div class="col-lg-12">
                                            <Product key={index} />
                                        </div>
                                    );
                                })
                            }

                        </OwlCarousel>
                    </div>
                </div>
            </section>
            <Footer />

            <div class="search-model">
                <div class="h-100 d-flex align-items-center justify-content-center">
                    <div class="search-close-switch">+</div>
                    <form class="search-model-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductID;