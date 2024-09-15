import React from 'react'
import Select from 'react-select'

const categories = [
    { label: 'Todas', value: 'Todas' },
    { label: 'Gatos siendo gatos', value: 'Gatos siendo gatos' },
    { label: 'Gatos siendo humanos', value: 'Gatos siendo humanos' },
    { label: 'Gatos enfadados', value: 'Gatos enfadados' },
    { label: 'Me dijiste', value: 'Me dijiste' },
]

const popularity = [
    { label: 'Más populares', value: 'Más populares' },
    { label: 'Menos populares', value: 'Menos populares' },
]

const date = [
    { label: 'Más recientes', value: 'Más recientes' },
    { label: 'Más viejunos', value: 'Más viejunos' },
]

const Filter = ({ isFilterOpen, toggleFilter, handleSelectChange }) => {
    return (
        <div
            className={`fixed top-[72px] left-0 right-0 bg-slate-40 bg-opacity-70 backdrop-blur-sm z-20 transition-all duration-500 ease-in-out transform ${
                isFilterOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0'
            }`}
        >
            <div className="w-full bg-slate-50 bg-opacity-70 backdrop-blur-sm shadow-md z-10 p-4 flex flex-col transition-all duration-300 ease-in-out">
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
