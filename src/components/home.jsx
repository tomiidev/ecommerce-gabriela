import TopInfo from "./top"
import Nav from "./nav"
import heroImage from "../img/portada.png";
/* import OwlCarousel from "react-owl-carousel"; */
import Footer from "./footer"
import SearchBar from "./search_bar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Home = () => {

    // Configuración del slider
    const options = {
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        items: 1, // Mostrar un solo elemento por vez
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
    };

    return (

        <>

            <div class="offcanvas-menu-overlay"></div>
            <TopInfo />

            <SearchBar />

            <header class="header">
                <Nav />
            </header>

            <section className="hero">


                <Carousel className="hero__slider" /* {...options} */>
                    <img src={require("../img/1.png")} alt="marca1" />
                    <img src={require("../img/2.png")} alt="marca1" />
                    <img src={require("../img/3.png")} alt="marca1" />
                    <img src={require("../img/4.png")} alt="marca1" />

                </Carousel>

            </section>

            {/*   <section class="banner spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7 offset-lg-4">
                            <div class="banner__item">
                                <div class="banner__item__pic">
                                    <img src={require("../img/banner/banner-1.jpg")} alt="" />
                                </div>
                                <div class="banner__item__text">
                                    <h2>Clothing Collections 2030</h2>
                                    <a href="/">Shop now</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="banner__item banner__item--middle">
                                <div class="banner__item__pic">
                                    <img src={require("../img/banner/banner-2.jpg")} alt="" />
                                </div>
                                <div class="banner__item__text">
                                    <h2>Accessories</h2>
                                    <a href="/">Shop now</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="banner__item banner__item--last">
                                <div class="banner__item__pic">
                                    <img src={require("../img/banner/banner-3.jpg")} alt="" />
                                </div>
                                <div class="banner__item__text">
                                    <h2>Shoes Spring 2030</h2>
                                    <a href="/">Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="row">
                <h4>Nuestras marcas</h4>
                <Carousel className="hero__slider" /* {...options} */>
                    <img src={require("../img/m1.png")} alt="marca1" />
                    <img src={require("../img/m2.png")} alt="marca1" />
                    <img src={require("../img/m3.png")} alt="marca1" />

                </Carousel>
            </section>
            <section className="row">

                <Carousel className="hero__slider" /* {...options} */>
                    <img src={require("../img/portada1.png")} alt="marca1" />
                    <img src={require("../img/portada2.png")} alt="marca1" />
                    <img src={require("../img/portada3.png")} alt="marca1" />
                    <img src={require("../img/portada4.png")} alt="marca1" />
                    <img src={require("../img/portada5.png")} alt="marca1" />
                    <img src={require("../img/portada6.png")} alt="marca1" />
                    <img src={require("../img/portada7.png")} alt="marca1" />
                </Carousel>
            </section>
            {/*   <section class="product spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="filter__controls">
                              
                                <li data-filter=".new-arrivals">Recién llegados</li>
                                <li data-filter=".hot-sales">Más vendidos</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row product__filter">
                        <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                            <div class="product__item">
                                <div class="product__item__pic set-bg" style={{ backgroundImage: require("../img/product/product-1.jpg") ? `url(${require("../img/product/product-1.jpg")})` : "none" }}>
                                    <span class="label">New</span>
                                    <ul class="product__hover">
                                        <li><a href="/"><img src={require("../img/icon/heart.png")} alt="" /></a></li>
                                        <li><a href="/"><img src={require("../img/icon/compare.png")} alt="" /> <span>Compare</span></a></li>
                                        <li><a href="/"><img src={require("../img/icon/search.png")} alt="" /></a></li>
                                    </ul>
                                </div>
                                <div class="product__item__text">
                                    <h6>Piqué Biker Jacket</h6>
                                    <a href="/" class="add-cart">+ Add To Cart</a>
                                    <div class="rating">
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                    <h5>$67.24</h5>
                                    <div class="product__color__select">
                                        <label for="pc-1">
                                            <input type="radio" id="pc-1" />
                                        </label>
                                        <label class="active black" for="pc-2">
                                            <input type="radio" id="pc-2" />
                                        </label>
                                        <label class="grey" for="pc-3">
                                            <input type="radio" id="pc-3" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                            <div class="product__item">
                                <div class="product__item__pic set-bg" style={{ backgroundImage: require("../img/product/product-2.jpg") ? `url(${require("../img/product/product-2.jpg")})` : "none" }}>
                                    <ul class="product__hover">
                                        <li><a href="/"><img src={require("../img/icon/heart.png")} alt="" /></a></li>

                                        <li><a href="/"><img src={require("../img/icon/search.png")} alt="" /></a></li>
                                    </ul>
                                </div>
                                <div class="product__item__text">
                                    <h6>Piqué Biker Jacket</h6>
                                    <a href="/" class="add-cart">+ Add To Cart</a>
                                    <div class="rating">
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                    <h5>$67.24</h5>
                                    <div class="product__color__select">
                                        <label for="pc-4">
                                            <input type="radio" id="pc-4" />
                                        </label>
                                        <label class="active black" for="pc-5">
                                            <input type="radio" id="pc-5" />
                                        </label>
                                        <label class="grey" for="pc-6">
                                            <input type="radio" id="pc-6" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>






                    </div>
                </div>
            </section>
 */}
            {/*  <section class="categories spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="categories__text">
                                <h2>Clothings Hot <br /> <span>Shoe Collection</span> <br /> Accessories</h2>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="categories__hot__deal">
                                <img src={require("../img/product-sale.png")} alt="" />
                                <div class="hot__deal__sticker">
                                    <span>Sale Of</span>
                                    <h5>$29.99</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 offset-lg-1">
                            <div class="categories__deal__countdown">
                                <span>Deal Of The Week</span>
                                <h2>Multi-pocket Chest Bag Black</h2>
                                <div class="categories__deal__countdown__timer" id="countdown">
                                    <div class="cd-item">
                                        <span>3</span>
                                        <p>Days</p>
                                    </div>
                                    <div class="cd-item">
                                        <span>1</span>
                                        <p>Hours</p>
                                    </div>
                                    <div class="cd-item">
                                        <span>50</span>
                                        <p>Minutes</p>
                                    </div>
                                    <div class="cd-item">
                                        <span>18</span>
                                        <p>Seconds</p>
                                    </div>
                                </div>
                                <a href="/" class="primary-btn">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 */}
            {/*  <section class="instagram spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="instagram__pic">
                                <div class="instagram__pic__item set-bg" data-setbg={require("../img/instagram/instagram-1.jpg")}></div>
                                <div class="instagram__pic__item set-bg" data-setbg={require("../img/instagram/instagram-2.jpg")}></div>
                                <div class="instagram__pic__item set-bg" data-setbg={require("../img/instagram/instagram-3.jpg")}></div>
                                <div class="instagram__pic__item set-bg" data-setbg={require("../img/instagram/instagram-4.jpg")}></div>
                                <div class="instagram__pic__item set-bg" data-setbg={require("../img/instagram/instagram-5.jpg")}></div>
                                <div class="instagram__pic__item set-bg" data-setbg={require("../img/instagram/instagram-6.jpg")}></div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="instagram__text">
                                <h2>Instagram</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua.</p>
                                <h3>#Male_Fashion</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


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

export default Home