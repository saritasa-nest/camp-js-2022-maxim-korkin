import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { SignInForm } from './components/signIn/SignInForm';
import { SignUpForm } from './components/signUp/SignUpForm';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));

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
