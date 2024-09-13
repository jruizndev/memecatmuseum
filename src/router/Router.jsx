<<<<<<< HEAD
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import CreateMeme from '../pages/CreateMeme'
import EditMeme from '../pages/EditMeme'
import NotFound from '../pages/NotFound'
import Footer from '../components/Footer';
=======
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import CreateMeme from "../pages/CreateMeme";
import EditMeme from "../pages/EditMeme";
import NotFound from "../pages/NotFound";
>>>>>>> f8406cc344f22d71836eef286008da46c4c08156

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "newmeme",
        element: <CreateMeme />,
      },
      {
        path: "/editmeme/:id",
        element: <EditMeme />,
      },
    ],
  },
]);
