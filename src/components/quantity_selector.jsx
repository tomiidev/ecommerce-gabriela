import React from "react";

const QuantitySelector = ({ q, setQ, minQuantity = 1, maxQuantity = 10 }) => {

    const handleAdd = () => {
        if (q < maxQuantity) {
            setQ(q + 1);
        }
    };

    const handleRemove = () => {
        if (q > minQuantity) {
            setQ(q - 1);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }} >
            <div

                onClick={handleRemove}
                disabled={q <= minQuantity}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-minus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M9 12l6 0" />
                </svg>
            </div>

            <p style={{ margin: 5 }}>
                {q}
            </p>

            <div
            
                onClick={handleAdd}
                disabled={q >= maxQuantity}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                </svg>
            </div>
        </div>
    );
};

export default QuantitySelector;
