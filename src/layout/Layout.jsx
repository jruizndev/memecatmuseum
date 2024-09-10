import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav' // Importa la barra de navegación

const Layout = () => {
    return (
        <>
            <Nav /> {/* Aquí se incluye la barra de navegación que creamos */}
            <Outlet />
            <footer className="bg-gray-100 text-center py-4 mt-8 shadow-inner">
                Mi footer
            </footer>
        </>
    )
}

export default Layout
