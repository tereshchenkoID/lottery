import { lazy } from 'react'

const Login = lazy(() => import('pages/Login'))
const Home = lazy(() => import('pages/Home'))

export const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]
