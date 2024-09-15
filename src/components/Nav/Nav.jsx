import React, { useState, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Filter from './Filter'
import FilterContext from '../../layout/FilterContext.jsx'

const Nav = () => {
    const { handleSelectChange } = useContext(FilterContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        if (!isMenuOpen) {
            setIsFilterOpen(false)
        }
    }

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen)
        if (!isFilterOpen) {
            setIsMenuOpen(false)
        }
    }

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
                    <h1 className="font-jaro text-2xl">MeCat Museum</h1>
                </div>

                {/* Barra de búsqueda y menú hamburguesa */}
                <div className="flex items-center justify-end mr-[4%] space-x-4">
                    {/* Ícono de búsqueda */}
                    {isHomePage && (
                        <div className="relative">
                            <img
                                src="/src/assets/icons/search.svg"
                                alt="Buscar"
                                className="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-125 hover:rotate-12 hover:opacity-90 hover:animate-pulse"
                                onClick={() => {
                                    if (!isFilterOpen) {
                                        toggleFilter()
                                    }
                                }}
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

            {/* Menú hamburguesa desde la derecha con altura limitada */}
            <div
                className={`fixed right-0 top-[72px] w-[40%] h-auto bg-black bg-opacity-70 backdrop-blur-sm text-white shadow-lg z-40 transition-all duration-500 ease-in-out transform ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <ul className="flex flex-col p-4">
                    <li className="py-2 text-lg text-center">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="py-2 text-lg text-center">
                        <NavLink to="/">About Us</NavLink>
                    </li>
                    <li className="py-2 text-lg text-center">
                        <NavLink to="/">Contacto</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Nav
