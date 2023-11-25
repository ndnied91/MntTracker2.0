import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout } from './components';

import { loader as mountainLoader } from './pages/Landing';

import { Landing, Error } from './pages';
import { useEffect } from 'react';
import customFetch from './utils/customFetch';
import { useGlobalContext } from './context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: mountainLoader,
      },
    ],
  },
]);

const App = () => {
  const { setContextUser } = useGlobalContext();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await customFetch.get('/users/current-user');
        setContextUser(data.user);
      } catch (e) {}
    };
    getUser();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
