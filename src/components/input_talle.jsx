const InputTalle = ({ variant, handleVariantChange }) => {
    console.log(variant)
    return (
        <label>{variant.peso} - ${variant.precio}
            <input
                type="radio"
                id={variant._id}
                name="variant"
                onClick={() => handleVariantChange(variant)} // Llamamos a la función pasando la variante completa
            />
        </label>
    );
};

export default InputTalle;
