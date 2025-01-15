import { useEffect, useRef, useState } from "react";
import { useSearch } from "../context/search";
import { useMediaQuery } from "react-responsive";
import { Transition } from "@headlessui/react";
import { API_URL } from "../lib/apis";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { openSearch, setOpenSearch } = useSearch();
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Estado para sugerencias
    const ignoreClickAway = useRef(false);
    const nv = useNavigate()
    useEffect(() => {
        if (openSearch) {
            ignoreClickAway.current = true;
            const timer = setTimeout(() => {
                ignoreClickAway.current = false;
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [openSearch]);

    const handleClickAway = () => {
        if (!ignoreClickAway.current && openSearch) {
            setOpenSearch(false);
        }
    };

    const fetchSuggestions = async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/registersearch?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.statusText}`);
            }

            const data = await response.json();
            setSuggestions(data.data); // Supone que el endpoint devuelve un array de sugerencias

        } catch (error) {
            console.error("Error al obtener sugerencias:", error);
            setSuggestions([]);
        }
    };

    const handleChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        fetchSuggestions(query); // Obtener sugerencias al cambiar el input
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const parsear = (productoTipo, categoria) => {
        const cleanPath = (path) => (path ? path.replace(/%20|\s+/g, "") : "default");
        const productoTipoPars = cleanPath(productoTipo).toLowerCase();
        const categoriaPars = cleanPath(categoria).toLowerCase();

        return { productoTipoPars, categoriaPars };
    }
    /*     const handleSuggestionClick = (suggestion) => {
            setSearchTerm(suggestion._id); // Asigna el título seleccionado como valor de búsqueda
            setSuggestions([]); // Limpia las sugerencias después de seleccionar una
        
        }; */

    // Función para limpiar las rutas y parámetros

    return (
        <div onClick={handleClickAway} style={{ position: "relative" }}>
            <Transition
                show={openSearch}
                enter="transition-transform duration-300"
                enterFrom="-translate-y-full"
                enterTo="translate-y-0"
                leave="transition-transform duration-300"
                leaveFrom="translate-y-0"
                leaveTo="-translate-y-full"
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 50,
                        width: "100%",
                        height: isMobile ? "64px" : "92px",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        padding: "16px",
                    }}
                >
                    <input
                        autoFocus
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        className="font-questrial"
                        placeholder="Busca por nombre"
                        style={{
                            flex: 1,
                            backgroundColor: "transparent",
                            color: "black",
                            border: "none",
                            outline: "none",
                            paddingLeft: "8px",
                        }}
                        onClick={stopPropagation}
                    />
                    {suggestions.length > 0 && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                width: "100%",
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                zIndex: 100,
                                listStyle: "none",
                                margin: 0,
                                padding: "8px 0",
                            }}
                        >
                            {suggestions.map((suggestion, index) => {
                                const { productoTipoPars, categoriaPars } = parsear(suggestion.productoTipo, suggestion.categoria);

                                // Verifica si el producto tiene variantes
                                const imagen = suggestion.productoConVariantes === "no"
                                    ? suggestion.variantes[0]?.imagenes[0] // Toma la primera imagen de la primera variante
                                    : suggestion.imagesAdded[0]; // Si no tiene variantes, toma la imagen principal

                                return (
                                    <li
                                        key={index}
                                        onClick={() => nv(`/shop/${productoTipoPars}/${categoriaPars}/${suggestion.titulo}`)} //}
                                        className="py-2 px-5 border-b flex items-center text-black cursor-pointer text-left hover:bg-gray-200 gap-2 font-questrial"
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
                                    >
                                        {imagen && (
                                            <img
                                                className="w-12 h-12 img-fluid"
                                                src={`https://productosvet.s3.us-east-1.amazonaws.com/${productoTipoPars}/${categoriaPars}/${imagen}`}
                                                alt={suggestion.titulo.toUpperCase()}
                                            /* style={{ width: '50px', height: '50px', objectFit: 'cover' }} */
                                            />
                                        )}
                                        {suggestion.titulo.toUpperCase()}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </Transition>
        </div>
    );
};

export default SearchBar;
