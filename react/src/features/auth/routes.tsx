import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const SignInPage = lazy(() => import('./pages/SignInPage').then(module => ({ default: module.SignInPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'SignIn',
    element: <SignInPage />,
  },
  {
    path: '*',
    element: <Navigate to="SignInPage" />,
  },
];
