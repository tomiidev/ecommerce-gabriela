import { NavLink } from "react-router-dom";

const ProductGrid = ({ titulo, _id, precio, imagesAdded, variantes, productoTipo, categoria, stock }) => {
    const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
    const productoTipoPars = cleanPath(productoTipo).toLowerCase();
    const categoriaPars = cleanPath(categoria).toLowerCase();

    if (!productoTipo || !categoria) {
        console.error("Parámetros faltantes o inválidos");
        return null;
    }

    const getImageUrl = () => {
        const hasVariants = Array.isArray(variantes) && variantes.length > 0;
        const hasImages = Array.isArray(imagesAdded) && imagesAdded.length > 0;

        if (hasVariants && variantes[0]?.imagenes && imagesAdded.length === 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${variantes[0].imagenes[0]}`;
        }

        if (hasImages && variantes.length === 0) {
            return `https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${imagesAdded[0]}`;
        }

        return "https://via.placeholder.com/150";
    };

    return (
        <div className={`product__item z-0 border border-1 rounded-sm p-3`} key={_id}>
            <NavLink className="no-underline" to={`/shop/${productoTipoPars}/${categoriaPars}/${_id}`}>
                {/* product__item__pic set-bg group */}
                <div className="group overflow-hidden relative  z-0">
                    <img
                        src={getImageUrl()}
                        alt={titulo}
                        className=" w-full img-fluid transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                </div>
                <p className="mt-2 text-black font-semibold text-sm min-h-8  text-left font-open">{titulo.toUpperCase()}</p>
                <div className="flex justify-between items-center">
                    {/* Precio */}
                    <span className="text-lg text-black text-left font-questrial">
                        ${variantes[0]?.dato_3_pre || precio}
                    </span>
                    {/* Opciones de variantes */}
                    <div className="flex space-x-2">
                        {variantes.dato_2_mul !== "" ? variantes.map((variant, index) => (
                            <span
                                key={index}
                                className="text-sm font-questrial text-black border bg-transparent px-2 py-1 rounded-sm cursor-pointer "
                            /*  onClick={(e) => {
                                 e.preventDefault();
                                 // Acción para seleccionar la variante (puedes personalizar esto)
                                 console.log("Seleccionada variante:", variant.dato_1_col);
                             }} */
                            >
                                {variant.dato_2_mul}
                            </span>
                        )) : variantes.map((variant, index) => (
                            <span
                                key={index}
                                className="text-sm font-questrial text-black border bg-transparent px-2 py-1 rounded-sm cursor-pointer "
                            /*    onClick={(e) => {
                                   e.preventDefault();
                                   // Acción para seleccionar la variante (puedes personalizar esto)
                                   console.log("Seleccionada variante:", variant.dato_1_col);
                               }} */
                            >
                                {variant.dato_1_col}
                            </span>
                        ))
                        }
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default ProductGrid;
