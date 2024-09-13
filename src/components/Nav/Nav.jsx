// Nav.js
import React, { useState, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Filter from './Filter' // Importa el componente Filter

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const location = useLocation()
    const menuRef = useRef(null)

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

    const handleSelectChange = (selectedOption) => {
        console.log('Selected option:', selectedOption)
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

                {/* Barra de búsqueda y menú hamburguesa */}
                <div className="flex items-center justify-end mr-[4%] space-x-4">
                    {/* Barra de búsqueda */}
                    {isHomePage && (
                        <div className="relative w-[80%] max-w-[600px]">
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="w-full p-2 pr-10 pl-4 border rounded-md focus:outline-none"
                                onClick={() => {
                                    if (!isFilterOpen) {
                                        toggleFilter() // Solo abre el filtro si no está abierto
                                    }
                                }}
                            />
                            <img
                                src="/src/assets/icons/search.svg"
                                alt="Buscar"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5"
                            />
                        </div>
                    )}

                    {/* Menú hamburguesa */}
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
            </nav>

            {/* Componente Filter integrado en el Nav */}
            {isHomePage && (
                <Filter
                    isFilterOpen={isFilterOpen}
                    toggleFilter={toggleFilter}
                    handleSelectChange={handleSelectChange}
                />
            )}

            {/* Menú desplegable */}
            {isMenuOpen && (
                <div
                    className={`fixed right-0 top-[72px] w-[40%] bg-black bg-opacity-70 backdrop-blur-sm text-white shadow-lg transition-all duration-300 ease-in-out z-40`}
                    ref={menuRef}
                >
                    <ul className="flex flex-col p-4">
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
            )}
        </>
    )
}

export default Nav
