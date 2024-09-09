import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    const closeFilters = () => {
        setShowFilters(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 p-4 bg-slate-50 bg-opacity-70  backdrop-blur-sm  w-full  items-center flex justify-between">
            {/* Menú hamburguesa */}
            <div className="flex items-center ml-[4%]">
                <img
                    src="/src/assets/icons/burguer-open.svg"
                    alt="Menú"
                    className="w-6 h-6 cursor-pointer"
                    onClick={toggleMenu}
                />
            </div>

            {/* Barra de búsqueda */}
            <div className="relative flex-grow mx-4">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full p-2 pr-10 pl-4 border rounded-md focus:outline-none"
                    onClick={toggleFilters}
                />
                <img
                    src="/src/assets/icons/search.svg"
                    alt="Buscar"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5"
                />
            </div>

            {/* Logo */}
            <div className="flex items-center mr-[4%]">
                <NavLink to="/">
                    <img
                        src="/src/assets/icons/Mecatmus-logo.png"
                        alt="Logo"
                        className="w-16 h-16"
                    />
                </NavLink>
            </div>

            {/* Desplegable del menú hamburguesa */}
            {isOpen && (
                <div className="absolute left-0 w-[40%] top-[64px] bg-black text-white shadow-lg mt-8">
                    <ul className="flex flex-col ml-[8%] p-4">
                        <li className="py-2 text-lg">
                            <NavLink to="/">Añadir Meme</NavLink>
                        </li>
                        <li className="py-2 text-lg">
                            <NavLink to="/">Editar Meme</NavLink>
                        </li>
                        <li className="py-2 text-lg">
                            <NavLink to="/">Sobre Nosotros</NavLink>
                        </li>
                    </ul>
                </div>
            )}

            {/* Filtros */}
            {showFilters && (
                <div className="absolute top-full left-0 w-full bg-slate-50 bg-opacity-70  backdrop-blur-sm shadow-md z-10 p-4 flex flex-col items-center">
                    <div className="w-[92%] flex items-center justify-between mb-4">
                        <img
                            src="/src/assets/icons/filter.svg"
                            alt="Filter"
                            className="w-6 h-6"
                        />
                        <img
                            src="/src/assets/icons/close.svg"
                            alt="Cerrar filtros"
                            className="w-6 h-6 cursor-pointer"
                            onClick={closeFilters}
                        />
                    </div>

                    <div className="w-[92%] flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex flex-col w-full sm:w-1/3">
                            <label className="text-lg font-medium mb-2 text-left">
                                Categoría
                            </label>
                            <select className="border border-gray-300 rounded p-3 text-lg w-full text-center">
                                <option>Todas</option>
                                <option>Gatos siendo gatos</option>
                                <option>Gatos enfadados</option>
                                <option>Gatos siendo humanos</option>
                                <option>Me dijiste</option>
                                <option>Popurri</option>
                            </select>
                        </div>

                        <div className="flex flex-col w-full sm:w-1/3">
                            <label className="text-lg font-medium mb-2 text-left">
                                Popularidad
                            </label>
                            <select className="border border-gray-300 rounded p-3 text-lg w-full text-center">
                                <option>Más populares</option>
                                <option>Menos populares</option>
                            </select>
                        </div>

                        <div className="flex flex-col w-full sm:w-1/3">
                            <label className="text-lg font-medium mb-2 text-left">
                                Fecha
                            </label>
                            <select className="border border-gray-300 rounded p-3 text-lg w-full text-center">
                                <option>Más recientes</option>
                                <option>Más antiguos</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Nav
