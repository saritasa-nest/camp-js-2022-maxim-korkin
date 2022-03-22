import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { SignedInOnlyGuard } from 'src/routes/guards/SignedInOnlyGuard';

const FilmsPage = lazy(() => import('./pages/FilmsPage').then(module => ({ default: module.FilmsPage })));

export const filmsRoutes: RouteObject[] = [
  {
    element: <SignedInOnlyGuard />,
    children: [
      {
        path: 'films',
        element: <FilmsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="films" />,
  },
];
