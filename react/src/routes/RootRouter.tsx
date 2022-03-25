import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { AuthStateProvider } from 'src/components/AuthStateProvider/AuthStateProvider';
import { authRoutes } from 'src/features/auth/routes';
import { filmsRoutes } from 'src/features/films/routes';

const routes: RouteObject[] = [
  {
    element: <AuthStateProvider />,
    children: [
      ...authRoutes,
      ...filmsRoutes,
      {
        path: '*',
        element: <Navigate to="/auth/sign-in" />,
      },
    ],
  },
];

export const RootRouter: React.VFC = () => useRoutes(routes);
