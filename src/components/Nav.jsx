import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 p-4 shadow-md w-full bg-white items-center flex justify-between">
            {/* Menú hamburguesa */}
            <div className="flex items-center ml-[4%]">
                <img
                    src="/src/assets/images/hamburguer-menu.png"
                    alt="Menú"
                    className="w-6 h-6 cursor-pointer"
                    onClick={toggleMenu}
                />
            </div>

            {/* Barra de búsqueda*/}
            <div className="relative flex-grow mx-4">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full p-2 pr-10 pl-4 border rounded-md focus:outline-none"
                />
                <img
                    src="/src/assets/images/mingcute_search.png"
                    alt="Buscar"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5"
                />
            </div>

            {/* Logo*/}
            <div className="flex items-center mr-[4%]">
                <NavLink to="/">
                    <img
                        src="/src/assets/images/Mecatmus-logo.png"
                        alt="Logo"
                        className="w-16 h-16"
                    />
                </NavLink>
            </div>

            {/*Desplegable*/}
            {isOpen && (
                <div className="absolute top-full left-0 w-[40%] bg-black text-white shadow-lg rounded-md z-2">
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
        </nav>
    )
}

export default Nav
