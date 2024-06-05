import { lazy } from 'react'

import ProtectedRoute from 'router/ProtectedRoute'

const Login = lazy(() => import('pages/Login'))
const Home = lazy(() => import('pages/Home'))
const Game = lazy(() => import('pages/Game'))

const Account = lazy(() => import('pages/Account'))
const Tickets = lazy(() => import('pages/Account/Tickets'))
const Bonuses = lazy(() => import('pages/Account/Bonuses'))

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
    path: '/game/:gameId',
    element: <Game />,
  },
  {
    path: '/account',
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'tickets',
        element: <Tickets />,
      },
      {
        path: 'bonuses',
        element: <Bonuses />,
      },
    ],
  },
]
