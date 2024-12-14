import { Link } from "react-router-dom";

const ProductGrid = ({ titulo, _id, precio, variantes }) => {
    // Asegurarte de tomar la primera imagen de las variantes, si existen.
    const getImageUrl = () => {
        if (variantes && variantes.length > 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${variantes[0].imagen}`;
        }
        // Imagen de respaldo en caso de que no haya variantes
      
    };

    return (
        <div className="product__item no-underline" key={_id}>
            <div
                className="product__item__pic set-bg border border-1"
                style={{
                    backgroundImage: `url(${getImageUrl()})`,
                }}
            ></div>
            <p className="mt-2 text-gray-600 no-underline text-md text-left">{titulo}</p>
            <div className="product__item__text">
                <h5 className="mt-2 text-gray-600 no-underline text-md text-left">
                    ${precio}
                </h5>
                <div className="product__color__select">
                    <label htmlFor="pc-4">
                        <input type="radio" id="pc-4" />
                    </label>
                    <label className="active black" htmlFor="pc-5">
                        <input type="radio" id="pc-5" />
                    </label>
                    <label className="grey" htmlFor="pc-6">
                        <input type="radio" id="pc-6" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
