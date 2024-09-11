import React, { useState } from 'react'
import Select from 'react-select'

const Filter = ({ isFilterOpen, toggleFilter }) => {
    const [searchText, setSearchText] = useState('') // Estado para almacenar el texto de búsqueda

    // Función para manejar el cambio en el texto de búsqueda
    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const categories = [
        { label: 'Todas', value: 'Todas' },
        { label: 'Gatos siendo gatos', value: 'Gatos siendo gatos' },
        { label: 'Gatos siendo humanos', value: 'Gatos siendo humanos' },
        { label: 'Gatos enfadados', value: 'Gatos enfadados' },
        { label: 'Me dijiste', value: 'Me dijiste' },
        { label: 'Popurri', value: 'Popurri' },
    ]

    const popularity = [
        { label: 'Más populares', value: 'Más populares' },
        { label: 'Menos populares', value: 'Menos populares' },
    ]

    const date = [
        { label: 'Más recientes', value: 'Más recientes' },
        { label: 'Más viejunos', value: 'Más viejunos' },
    ]

    const handleSelectChange = (event) => {}

    return (
        <div className="fixed w-full flex justify-end items-end bg-slate-50 bg-opacity-70 backdrop-blur-sm">
            {/* Barra de búsqueda */}
            <div className="relative mr-[5%] w-[20%] max-w-[500px] mx-4 mt-[100px] mb-[30px]">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full p-2 pr-10 pl-4 border rounded-md focus:outline-none"
                    value={searchText}
                    onChange={handleSearchChange} // Almacena el texto escrito
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

            {/* Filtros */}
            <div
                className={`absolute top-full left-0 w-full bg-slate-50 bg-opacity-70 backdrop-blur-sm shadow-md z-10 p-4 flex flex-col transition-all duration-300 ease-in-out ${
                    isFilterOpen
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform -translate-y-10'
                }`}
                style={{ display: isFilterOpen ? 'block' : 'none' }}
            >
                <div className="w-[92%] mb-[30px] flex items-center justify-between mx-auto">
                    <img
                        src="/src/assets/icons/filter.svg"
                        alt="Filter"
                        className="w-6 h-6"
                    />
                    <img
                        src="/src/assets/icons/close.svg"
                        alt="Cerrar filtros"
                        className="w-6 h-6 cursor-pointer"
                        onClick={toggleFilter} // Cierra el filtro
                    />
                </div>

                <div className="w-[92%] flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mx-auto">
                    <div className="flex flex-col w-full sm:w-1/3">
                        <Select
                            defaultValue={{
                                label: 'Categoría',
                                value: 'empty',
                            }}
                            options={categories}
                            onChange={handleSelectChange}
                        />
                    </div>

                    <div className="flex flex-col w-full sm:w-1/3">
                        <Select
                            defaultValue={{
                                label: 'Popularidad',
                                value: 'empty',
                            }}
                            options={popularity}
                            onChange={handleSelectChange}
                        />
                    </div>

                    <div className="flex flex-col w-full sm:w-1/3">
                        <Select
                            defaultValue={{
                                label: 'Fecha',
                                value: 'empty',
                            }}
                            options={date}
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter
