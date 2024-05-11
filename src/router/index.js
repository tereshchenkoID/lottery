import { lazy } from 'react'

const Login = lazy(() => import('pages/Login'))
const Home = lazy(() => import('pages/Home'))
const Account = lazy(() => import('pages/Account'))
const Game = lazy(() => import('pages/Game'))

export const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/account',
    element: <Account />,
  },
  {
    path: '/game/:gameId',
    element: <Game />,
  },
]
