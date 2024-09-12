import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// Importa Filter solo si es necesario
const Filter = React.lazy(() => import('./Filter'))

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        if (!isMenuOpen) {
            setIsFilterOpen(false) // Cierra el filtro cuando se abre el menú
        }
    }

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen)
        if (!isFilterOpen) {
            setIsMenuOpen(false) // Cierra el menú cuando se abre el filtro
        }
    }

    // Verifica si estamos en la página de inicio
    const isHomePage = location.pathname === '/'

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 p-1 bg-slate-50 bg-opacity-70 backdrop-blur-sm w-full items-center flex flex-row justify-between z-30">
                {/* Logo */}
                <div className="flex items-center ml-[4%]">
                    <NavLink to="/">
                        <img
                            src="/src/assets/icons/Mecatmus-logo.png"
                            alt="Logo"
                            className="w-16 h-16"
                        />
                    </NavLink>
                    <h1>MeCat Museum</h1>
                </div>

                {/* Menú hamburguesa */}
                <div className="flex items-center mr-[4%]">
                    <img
                        src={
                            isMenuOpen
                                ? '/src/assets/icons/burguer-close.svg'
                                : '/src/assets/icons/burguer-open.svg'
                        }
                        alt="Menú"
                        className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
                            isMenuOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                        onClick={toggleMenu}
                    />
                </div>

                {/* Menú hamburguesa */}
                <div
                    className={`absolute right-0 w-[40%] bg-black bg-opacity-70 backdrop-blur-sm text-white shadow-lg mt-4 transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? 'opacity-100 transform translate-x-0'
                            : 'opacity-0 transform translate-x-full'
                    }`}
                    style={{
                        top: isHomePage ? '156px' : '80px', // Cambia la posición dependiendo de la página
                    }}
                >
                    <ul className="flex flex-col pr-4 p-4">
                        <li className="py-2 text-lg text-center">
                            <NavLink to="/">Añadir Meme</NavLink>
                        </li>
                        <li className="py-2 text-lg text-center">
                            <NavLink to="/">Editar Meme</NavLink>
                        </li>
                        <li className="py-2 text-lg text-center">
                            <NavLink to="/">Sobre Nosotros</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Componente Filter se renderiza debajo de la navbar */}
            {isHomePage && (
                <React.Suspense fallback={<div>Cargando filtros...</div>}>
                    <Filter
                        isFilterOpen={isFilterOpen} // Controlamos el estado desde Nav
                        toggleFilter={toggleFilter} // Función para alternar el estado
                    />
                </React.Suspense>
            )}
        </>
    )
}

export default Nav
