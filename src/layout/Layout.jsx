import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav'; // Importa la barra de navegación
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <>
            <Nav /> {/* Aquí se incluye la barra de navegación que creamos */}
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout;
