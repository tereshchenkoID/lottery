import { lazy } from 'react'
import { Navigate } from 'react-router-dom';

import { NAVIGATION, ROUTES_CASHBOX, ROUTES_USER, USER_TYPE } from 'constant/config'

import ProtectedRoute from 'router/ProtectedRoute'

const Login = lazy(() => import('pages/Login'))
const Home = lazy(() => import('pages/Home'))
const Game = lazy(() => import('pages/Game'))
const Settings = lazy(() => import('pages/Settings'))
const CheckTickets = lazy(() => import('pages/CheckTickets'))

const UserAccount = lazy(() => import('pages/User/Account'))
const UseTickets = lazy(() => import('pages/User/Account/Tickets'))
const UseWallet = lazy(() => import('pages/User/Account/Wallet'))
const UseBonuses = lazy(() => import('pages/User/Account/Bonuses'))

const CashboxAccount = lazy(() => import('pages/Cashbox/Account'))
const CashboxReports = lazy(() => import('pages/Cashbox/Account/Reports'))

export const generateRoutes = (accountType) => {
  const userType = accountType?.userType;
  let accountPath = '/';
  let accountRoutes = [];
  let accountElement = null;

  if (userType === USER_TYPE.user) {
    accountPath = '/account';
    accountRoutes = [
      {
        path: ROUTES_USER.tickets.link,
        element: <UseTickets />,
      },
      {
        path: ROUTES_USER.wallet.link,
        element: <UseWallet />,
      },
      {
        path: ROUTES_USER.bonuses.link,
        element: <UseBonuses />,
      },
    ]

    accountElement = <UserAccount />
  }
  else if (userType === USER_TYPE.cashbox) {
    accountPath = '/cashbox';
    accountRoutes = [
      {
        path: ROUTES_CASHBOX.reports.link,
        element: <CashboxReports />,
      },
    ]

    accountElement = <CashboxAccount />
  }
  else {
    accountElement = <Home />
  }

  return [
    {
      path: NAVIGATION.home.link,
      element: <Home />,
    },
    {
      path: NAVIGATION.login.link,
      element: <Login />,
    },
    {
      path: NAVIGATION.settings.link,
      element: <Settings />,
    },
    {
      path: NAVIGATION.check_ticket.link,
      element: <CheckTickets />,
    },
    {
      path: '/game/:gameId',
      element: <Game />,
    },
    {
      path: accountPath,
      element: (
        <ProtectedRoute>
          {accountElement}
        </ProtectedRoute>
      ),
      children: accountRoutes,
    },
    {
      path: '*',
      element: <Navigate to={NAVIGATION.home.link} />,
    },
  ]
}