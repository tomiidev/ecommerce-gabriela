import { Link } from "react-router-dom";

const Product = ({item}) => {

    return (
        <Link to={`/shop/${item}`}>
            <div class="product__item">
                <div class="product__item__pic set-bg" style={{ backgroundImage: require("../img/product/product-2.jpg") ? `url(${require("../img/product/product-2.jpg")})` : "none" }}>

                </div>
                <div class="product__item__text">
                     <h6>{item}</h6> 
                    <a href="/" class="add-cart">+ Agregar al carrito</a>
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
        </Link>

    )
}

export default Product;