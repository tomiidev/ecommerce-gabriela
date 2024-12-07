import { Link, NavLink } from "react-router-dom"
import Nav from "./nav"
import TopInfo from "./top"
import SearchBar from "./search_bar"
import { useCategories } from "../context/notifications"
import { useEffect, useState } from "react"
import ProductGrid from "./product"
import Pagination from "./pagination"

const Shop = () => {
    const { categories, getData, products, loading } = useCategories()

    const [isAccordionOpen, setIsAccordionOpen] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 1; // Número de productos por página

    // Total de páginas (basado en la cantidad total de productos)
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Calcular el índice inicial y final de los productos para la página actual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    console.log(currentProducts)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    if (loading) {
        return <div>Cargando...</div>;
    }


    return (
        <>
            <div class="offcanvas-menu-overlay"></div>
            <TopInfo />
            <SearchBar />

            <header class="header">
                <Nav />
            </header>

            <section class="breadcrumb-option">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb__text">
                                <h4>Explorar</h4>
                                <div class="breadcrumb__links">
                                    <Link to={"/"}>Inicio</Link>
                                    <span>Explorar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="shop spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="shop__sidebar">
                                <div class="shop__sidebar__search">
                                    <form action="#">
                                        <input type="text" placeholder="Search..." />
                                        <button type="submit"><span class="icon_search"></span></button>
                                    </form>
                                </div>
                                <div class="shop__sidebar__accordion">
                                    <div class="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-heading">
                                                <Link class="card-heading" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
                                                    Categorías
                                                </Link>
                                            </div>
                                            {isAccordionOpen && (
                                                <div className="card-body">
                                                    <div class="shop__sidebar__price">
                                                        {loading ? (
                                                            <p>Cargando categorías...</p>
                                                        ) : (
                                                            <ul>
                                                                {categories.map((category) => (
                                                                    <li key={category._id}>
                                                                        <Link to={`/shop/${category}`} onClick={() => getData(category)}>
                                                                            {category}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div class="card">
                                            <div class="card-heading">
                                                <a data-toggle="collapse" href="/" data-target="#collapseThree">Precio</a>
                                            </div>
                                            <div id="collapseThree" class="collapse show" data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <div class="shop__sidebar__price">
                                                        <ul>
                                                            <li><a href="/">$0.00 - $50.00</a></li>
                                                            <li><a href="/">$50.00 - $100.00</a></li>
                                                            <li><a href="/">$100.00 - $150.00</a></li>
                                                            <li><a href="/">$150.00 - $200.00</a></li>
                                                            <li><a href="/">$200.00 - $250.00</a></li>
                                                            <li><a href="/">250.00+</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-heading">
                                                <a data-toggle="collapse" href="/" data-target="#collapseFour">Tamaño</a>
                                            </div>
                                            <div id="collapseFour" class="collapse show" data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <div class="shop__sidebar__size">
                                                        <label for="xs">xs
                                                            <input type="radio" id="xs" />
                                                        </label>
                                                        <label for="sm">s
                                                            <input type="radio" id="sm" />
                                                        </label>
                                                        <label for="md">m
                                                            <input type="radio" id="md" />
                                                        </label>
                                                        <label for="xl">xl
                                                            <input type="radio" id="xl" />
                                                        </label>
                                                        <label for="2xl">2xl
                                                            <input type="radio" id="2xl" />
                                                        </label>
                                                        <label for="xxl">xxl
                                                            <input type="radio" id="xxl" />
                                                        </label>
                                                        <label for="3xl">3xl
                                                            <input type="radio" id="3xl" />
                                                        </label>
                                                        <label for="4xl">4xl
                                                            <input type="radio" id="4xl" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-heading">
                                                <a data-toggle="collapse" href="/" data-target="#collapseFive">Color</a>
                                            </div>
                                            <div id="collapseFive" class="collapse show" data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <div class="shop__sidebar__color">
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
                                                        <label class="c-5" for="sp-5">
                                                            <input type="radio" id="sp-5" />
                                                        </label>
                                                        <label class="c-6" for="sp-6">
                                                            <input type="radio" id="sp-6" />
                                                        </label>
                                                        <label class="c-7" for="sp-7">
                                                            <input type="radio" id="sp-7" />
                                                        </label>
                                                        <label class="c-8" for="sp-8">
                                                            <input type="radio" id="sp-8" />
                                                        </label>
                                                        <label class="c-9" for="sp-9">
                                                            <input type="radio" id="sp-9" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="card">
                                            <div class="card-heading">
                                                <a data-toggle="collapse" href="/" data-target="#collapseSix">Etiquetas</a>
                                            </div>
                                            <div id="collapseSix" class="collapse show" data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <div class="shop__sidebar__tags">
                                                        <a href="/">Product</a>
                                                        <a href="/">Bags</a>
                                                        <a href="/">Shoes</a>
                                                        <a href="/">Fashio</a>
                                                        <a href="/">Clothing</a>
                                                        <a href="/">Hats</a>
                                                        <a href="/">Accessories</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="shop__product__option">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <div class="shop__product__option__left">
                                            <p>Mostrando 1–12 of 126 resultados</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <div class="shop__product__option__right">
                                            <p>Precio:</p>
                                            <select>
                                                <option value="">Menor a mayor</option>
                                                <option value="">$0 - $55</option>
                                                <option value="">$55 - $100</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                {
                                    currentProducts.map((p, index) => {
                                        return (
                                            <div class="col-lg-4 col-md-6 col-sm-6">
                                                <NavLink to={`/shop/${p._id}`}>
                                                    <ProductGrid key={index} {...p} />
                                                </NavLink>
                                            </div>
                                        );
                                    })
                                }

                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="footer__about">
                                <div class="footer__logo">
                                    <a href="/"><img src="img/footer-logo.png" alt="" /></a>
                                </div>
                                <p>The customer is at the heart of our unique business model, which includes design.</p>
                                <a href="/"><img src="img/payment.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                            <div class="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li><a href="/">Clothing Store</a></li>
                                    <li><a href="/">Trending Shoes</a></li>
                                    <li><a href="/">Accessories</a></li>
                                    <li><a href="/">Sale</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-6">
                            <div class="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li><a href="/">Contact Us</a></li>
                                    <li><a href="/">Payment Methods</a></li>
                                    <li><a href="/">Delivary</a></li>
                                    <li><a href="/">Return & Exchanges</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
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
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <div class="footer__copyright__text">

                                <p>Copyright ©
                                    <script>
                                        document.write(new Date().getFullYear());
                                    </script>2020
                                    All rights reserved | This template is made with <i class="fa fa-heart-o"
                                        aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>

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

export default Shop