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

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/buscar?query=${encodeURIComponent(searchTerm.trim())}`);
            setOpenSearch(false);
            setSearchTerm(''); // Limpiar el término de búsqueda después de enviar
        }
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
                            marginLeft: '8px',
                            padding: '8px 16px',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: '14px',
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
