import { Navigate, useRoutes } from 'react-router-dom';
import About from '../Pages/About';
import GenericNotFound from '../Pages/GenericNotFound';
import { Home } from '../Pages/Home';
import Login from '../Pages/Login';
import Main from '../Pages/Main';
import Profile from '../Pages/Profile';
import { Signup } from '../Pages/Signup';
import Protected from '../utils/Protected';

import Notes from '../Pages/Note/Notes';

let isAuth = localStorage.getItem('accessToken');

export default function Router() {
  let element = useRoutes([
    ...[
      // Protected Routes
      {
        element: <Protected />,
        children: PROTECTED_ROUTES,
      },
    ],
    ...PUBLIC_ROUTES,
  ]);
  return element;
}

const PROTECTED_ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/profile', element: <Profile /> },
  { path: '/notes', element: <Notes /> },
];

const PUBLIC_ROUTES = [
  {
    path: '/main',
    element: isAuth ? <Navigate to='/' /> : <Main />,
  },
  {
    path: '/about',
    element: isAuth ? <Navigate to='/' /> : <About />,
  },
  {
    path: '/login',
    element: isAuth ? <Navigate to='/' /> : <Login />,
  },
  {
    path: '/signup',
    element: isAuth ? <Navigate to='/' /> : <Signup />,
  },
  { path: '*', element: <GenericNotFound /> },
];
