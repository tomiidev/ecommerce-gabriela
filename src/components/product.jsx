import { NavLink } from "react-router-dom";

const ProductGrid = ({ titulo, _id, precio, imagesAdded, variantes, productoTipo, categoria }) => {
    // Asegurarte de tomar la primera imagen de las variantes, si existen.
    const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
    const productoTipoPars = cleanPath(productoTipo).toLowerCase();
    const categoriaPars = cleanPath(categoria).toLowerCase()
    // Verifica si los parámetros son válidos
    if (!productoTipo || !categoria) {
        console.error("Parámetros faltantes o inválidos");
        return null; // Salta este producto
    }
    console.log(productoTipoPars, categoriaPars)
    const getImageUrl = () => {
        const hasVariants = Array.isArray(variantes) && variantes.length > 0

        // Validar que imagenes sea un array antes de usar .length
        const hasImages = Array.isArray(imagesAdded) && imagesAdded.length > 0
        // Si hay variantes con imágenes, usa la imagen de la primera variante
        if (hasVariants && variantes[0]?.imagen && imagesAdded.length === 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${variantes[0].imagen}`;
        }

        // Si no hay variantes pero hay imágenes, usa la primera imagen general
        if (hasImages && variantes.length === 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${imagesAdded[0].nombre}`;
        }

        // Imagen de respaldo si ambos están vacíos.
        return "https://via.placeholder.com/150"; // Cambia esto por la URL de tu imagen genérica.
    };


    return (
        <div className="product__item no-underline " key={_id}>
            <NavLink className="no-underline" to={`/shop/${productoTipo}/${categoria}/${_id}`}>
                {/*  <div
                    className="product__item__pic set-bg border border-1"
                    style={{
                        backgroundImage: `url(${getImageUrl()})`,
                    }}
                ></div> */}
                <div
                    className="product__item__pic set-bg"
                >
                    <img
                        src={getImageUrl()}
                        alt={titulo}
                        className="h-full w-full object-cover"
                    />
                </div>
                <p className="mt-2 text-gray-600 no-underline text-md text-left">{titulo}</p>
                <div className="product__item__text">
                    <h5 className="mt-2 text-gray-600 no-underline text-md text-left">
                        ${variantes[0]?.dato_3_pre || precio}
                    </h5>

                </div>
            </NavLink>
        </div>
    );
};

export default ProductGrid;
