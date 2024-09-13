import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav' // Importa la barra de navegación

const Layout = () => {
    return (
        <>
            <Nav /> {/* Aquí se incluye la barra de navegación que creamos */}
            <Outlet />
            <footer>Mi footer</footer>
        </>
    )
}

export default Layout;
