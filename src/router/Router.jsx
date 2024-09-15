import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import CreateMeme from '../pages/CreateMeme';
import EditMeme from '../pages/EditMeme';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'newmeme',
        element: <CreateMeme />,
      },
      {
        path: '/editmeme/:id',
        element: <EditMeme />,
      },
    ],
  },
]);

