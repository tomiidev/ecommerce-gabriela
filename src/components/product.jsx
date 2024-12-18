import { NavLink } from "react-router-dom";

const ProductGrid = ({ titulo, _id, precio, imagenes, variantes, productoTipo, categoria }) => {
    // Asegurarte de tomar la primera imagen de las variantes, si existen.
    console.log(imagenes, variantes)
    const getImageUrl = () => {
        const hasVariants = Array.isArray(variantes) && variantes.length > 0;

        // Validar que imagenes sea un array antes de usar .length
        const hasImages = Array.isArray(imagenes) && imagenes.length > 0;
        // Si hay variantes con imágenes, usa la imagen de la primera variante
        if (hasVariants && variantes[0]?.imagen) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${variantes[0].imagen}`;
        }

        // Si no hay variantes pero hay imágenes, usa la primera imagen general
        if (hasImages) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipo}/${imagenes[0]}`;
        }

        // Imagen de respaldo si ambos están vacíos.
        return "https://via.placeholder.com/150"; // Cambia esto por la URL de tu imagen genérica.
    };


    return (
        <div className="product__item no-underline" key={_id}>
            <NavLink className="no-underline" to={`/shop/${productoTipo}/${categoria}/${_id}`}>
                <div
                    className="product__item__pic set-bg border border-1"
                    style={{
                        backgroundImage: `url(${getImageUrl()})`,
                    }}
                ></div>
                <p className="mt-2 text-gray-600 no-underline text-md text-left">{titulo}</p>
                <div className="product__item__text">
                    <h5 className="mt-2 text-gray-600 no-underline text-md text-left">
                        ${variantes[0].dato_3_pre}
                    </h5>

                </div>
            </NavLink>
        </div>
    );
};

export default ProductGrid;
