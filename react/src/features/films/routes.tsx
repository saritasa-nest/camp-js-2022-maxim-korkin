import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { SignedInOnlyGuard } from 'src/routes/guards/SignedInOnlyGuard';
import { FilmDetails } from './components/FilmDetails/FilmDetails';

const FilmsPage = lazy(() => import('./pages/FilmsPage').then(module => ({ default: module.FilmsPage })));

export const filmsRoutes: RouteObject[] = [
  {
    element: <SignedInOnlyGuard />,
    children: [
      {
        path: 'films',
        element: <FilmsPage />,
        children: [
          {
            path: 'film/:filmId',
            element: <FilmDetails />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="films" />,
      },
    ],
  },
];
