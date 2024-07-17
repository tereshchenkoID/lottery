import { lazy } from 'react'
import { Navigate } from 'react-router-dom';

import { NAVIGATION, ROUTES_CASHBOX, ROUTES_USER, USER_TYPE } from 'constant/config'

import ProtectedRoute from 'router/ProtectedRoute'

const Home = lazy(() => import('pages/Home'))
const Game = lazy(() => import('pages/Game'))
const Settings = lazy(() => import('pages/Settings'))
const CheckTickets = lazy(() => import('pages/CheckTickets'))

const Broadcast = lazy(() => import('pages/Broadcast'))
const News = lazy(() => import('pages/News'))
const About = lazy(() => import('pages/About'))
const Contacts = lazy(() => import('pages/Contacts'))
const Faq = lazy(() => import('pages/Faq'))
const Support = lazy(() => import('pages/Support'))

const Login = lazy(() => import('pages/Login'))
const Registration = lazy(() => import('pages/Registration'))
const PasswordRecovery = lazy(() => import('pages/PasswordRecovery'))

const UserAccount = lazy(() => import('pages/User/Account'))
const UseTickets = lazy(() => import('pages/User/Account/Tickets'))
const UseWallet = lazy(() => import('pages/User/Account/Wallet'))
const UseBonuses = lazy(() => import('pages/User/Account/Bonuses'))
const UsePromocodes = lazy(() => import('pages/User/Account/Promocodes'))
const UserProfile = lazy(() => import('pages/User/Account/Profile'))
const UserFriends = lazy(() => import('pages/User/Account/Friends'))
const UserSubscriptions = lazy(() => import('pages/User/Account/Subscriptions'))
const UserStocks = lazy(() => import('pages/User/Account/Stocks'))

const CashboxAccount = lazy(() => import('pages/Cashbox/Account'))
const CashboxReports = lazy(() => import('pages/Cashbox/Account/Reports'))
const CashboxTickets = lazy(() => import('pages/Cashbox/Account/Tickets'))
const CashboxProfile = lazy(() => import('pages/Cashbox/Account/Profile'))
const CashboxPlayers = lazy(() => import('pages/Cashbox/Account/Players'))
const CashboxPlayer = lazy(() => import('pages/Cashbox/Account/Player'))
const CashboxVoucher = lazy(() => import('pages/Cashbox/Account/Voucher'))

export const generateRoutes = (auth) => {
  const userType = auth?.userType;
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
      {
        path: ROUTES_USER.promocodes.link,
        element: <UsePromocodes />,
      },
      {
        path: ROUTES_USER.profile.link,
        element: <UserProfile />,
      },
      {
        path: ROUTES_USER.friends.link,
        element: <UserFriends />,
      },
      {
        path: ROUTES_USER.subscriptions.link,
        element: <UserSubscriptions />,
      },
      {
        path: ROUTES_USER.stocks.link,
        element: <UserStocks />,
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
      {
        path: ROUTES_CASHBOX.tickets.link,
        element: <CashboxTickets />,
      },
      {
        path: ROUTES_CASHBOX.profile.link,
        element: <CashboxProfile />,
      },
      {
        path: ROUTES_CASHBOX.players.link,
        element: <CashboxPlayers />,
      },
      {
        path: `${ROUTES_CASHBOX.players.link}/:id/:token`,
        element: <CashboxPlayer />,
      },
      {
        path: ROUTES_CASHBOX.voucher.link,
        element: <CashboxVoucher />,
      },
    ]

    accountElement = <CashboxAccount />
  }
  else {
    accountElement = <Home />
  }

  const publicRoutes = [
    {
      path: NAVIGATION.home.link,
      element: <Home />,
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
      path: NAVIGATION.news.link,
      element: <News />,
    },
    {
      path: NAVIGATION.broadcast.link,
      element: <Broadcast />,
    },
    {
      path: NAVIGATION.about.link,
      element: <About />,
    },
    {
      path: NAVIGATION.contacts.link,
      element: <Contacts />,
    },
    {
      path: NAVIGATION.faq.link,
      element: <Faq />,
    },
    {
      path: NAVIGATION.support.link,
      element: <Support />,
    },
    {
      path: '/game/:gameId',
      element: <Game />,
    },
    {
      path: '*',
      element: <Navigate to={NAVIGATION.home.link} />,
    },
  ];

  if (!auth?.id) {
    publicRoutes.push(
      {
        path: NAVIGATION.login.link,
        element: <Login />,
      },
      {
        path: NAVIGATION.registration.link,
        element: <Registration />,
      },
      {
        path: NAVIGATION.password_recovery.link,
        element: <PasswordRecovery />,
      }
    );
  }

  return [
    ...publicRoutes,
    {
      path: accountPath,
      element: (
        <ProtectedRoute>
          {accountElement}
        </ProtectedRoute>
      ),
      children: accountRoutes,
    },
  ]
}