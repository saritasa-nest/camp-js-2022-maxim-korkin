import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';
import { filmsRoutes } from 'src/features/films/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/auth/sign-in" />,
  },
  ...authRoutes,
  ...filmsRoutes,
];

export const RootRouter: React.VFC = () => useRoutes(routes);
