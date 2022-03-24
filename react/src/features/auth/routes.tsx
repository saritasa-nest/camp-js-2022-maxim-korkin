import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { SignedOutOnlyGuard } from 'src/routes/guards/SignedOutOnlyGuard';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));
const SignInForm = lazy(() => import('./components/signInForm/SignInForm')
  .then(module => ({ default: module.SignInForm })));
const SignUpForm = lazy(() => import('./components/signUpForm/SignUpForm')
  .then(module => ({ default: module.SignUpForm })));

export const authRoutes: RouteObject[] = [
  {
    element: <SignedOutOnlyGuard />,
    children: [
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
    ],
  },
  {
    path: '*',
    element: <Navigate to="auth/sign-in" />,
  },
];
