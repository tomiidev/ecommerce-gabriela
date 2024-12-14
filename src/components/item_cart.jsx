const ItemCart = ({ item, removeItemFromCart, toast }) => {
    return (
        <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic border-2">
                    <img src={
                        item.imagen
                        && `https://productosvet.s3.us-east-1.amazonaws.com/${item?.imagen}`} className="w-10  img-fluid" alt="" />
                </div>
                <div class="product__cart__item__text">
                    <h6>{item.peso}</h6>
                    <h6>{item.titulo}</h6>
                    <h6>{item.color}</h6>
                    <h5>c/u ${item.precio}</h5>
                </div>
            </td>
            <td class="quantity__item">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <input type="text" value={item.cantidad} />
                    </div>
                </div>
            </td>
            <td class="cart__price">${item.cantidad * item.precio}</td>
            <td className="text-center">
                <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="btn btn-link p-0"
                    aria-label="Remove item"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default ItemCart;