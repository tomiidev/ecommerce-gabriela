const ItemCart = ({ item, removeItemFromCart ,toast}) => {
    return (
        <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img src={require("../img/shopping-cart/cart-1.jpg")} alt="" />
                </div>
                <div class="product__cart__item__text">
                    <h6>{item.titulo}</h6>
                    <h5>${item.precio}</h5>
                </div>
            </td>
            <td class="quantity__item">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <input type="text" value={item.quantity} />
                    </div>
                </div>
            </td>
            <td class="cart__price">${item.quantity * item.precio}</td>
            <td class="cart__close">
                <i class="fa fa-close" onClick={() => removeItemFromCart(item._id)}></i>
            </td>
        </tr>
    )
}

export default ItemCart;