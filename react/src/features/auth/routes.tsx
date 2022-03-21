import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));
const SignInForm = lazy(() => import('./components/signIn/SignInForm')
  .then(module => ({ default: module.SignInForm })));
const SignUpForm = lazy(() => import('./components/signUp/SignUpForm')
  .then(module => ({ default: module.SignUpForm })));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthPage />,
    children: [
      {
        path: 'sign-in',
        element: <SignInForm />,
      },
      {
        path: 'sign-up',
        element: <SignUpForm />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="auth/sign-in" />,
  },
];
