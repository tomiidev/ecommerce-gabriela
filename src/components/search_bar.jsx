import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/search'; // Asegúrate de ajustar la ruta al archivo de contexto
import { useMediaQuery } from 'react-responsive';
import { Transition } from '@headlessui/react';

const SearchBar = () => {
    const { openSearch, setOpenSearch } = useSearch();
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
        
    const ignoreClickAway = useRef(false);

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

    const handleSearch = async () => {
        navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`);
        setOpenSearch(false);
        setSearchTerm(""); // Limpiar el término de búsqueda después de enviar
       /*  if (searchTerm && searchTerm.length > 0 && searchTerm !== "") {
            try {
                // Realizar el fetch POST para enviar el término de búsqueda
                const response = await fetch("http://localhost:3001/api/registersearch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: searchTerm }),
                });
    
                if (!response.ok) {
                    throw new Error(`Error en el servidor: ${response.statusText}`);
                }
    
                // Si todo va bien, redirigir al usuario a los resultados de búsqueda
                navigate(`/buscar?query=${encodeURIComponent(searchTerm)}`);
                setOpenSearch(false);
                setSearchTerm(""); // Limpiar el término de búsqueda después de enviar
            } catch (error) {
                console.error("Error al registrar la búsqueda:", error);
                // Aquí puedes agregar manejo de errores adicional, como mostrar un mensaje al usuario
            }
        } */
    };
    

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Evitar que el clic en el input o botón cierre el buscador
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleClickAway} style={{ position: 'relative' }}>

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
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 50,
                        width: '100%',
                        height: isMobile ? '64px' : '92px',
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px',
                    }}

                >
                    <input
                        autoFocus
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Busca lo que quieras"
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            color: 'black',
                            border: 'none',
                            outline: 'none',
                            paddingLeft: '8px',
                        }}
                        onClick={stopPropagation} // Evita que el clic en el input cierre el buscador
                    />
                    <button
                        onClick={(e) => {

                            handleSearch();
                        }}
                        style={{
                            color: "#fff",
                            borderRadius: "2px",
                            fontWeight: "lighter",
                            fontFamily: "questrial, sans-serif",
                            letterSpacing: "1px",
                            backgroundColor: "#af1010", // Cambia el color según el estado de hover
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease", // Animación suave para el cambio de color
                        }}
                    >
                        Buscar
                    </button>
                </div>
            </Transition>
        </div>
    );
}
export default SearchBar;
