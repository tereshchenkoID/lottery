import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NAVIGATION, ROUTES_CASHBOX } from 'constant/config'

import classNames from 'classnames'

import Container from 'components/Container'
import Tab from 'modules/Tab'

import style from './index.module.scss'

const Account = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { auth } = useSelector(state => state.auth)
  const isAccountRoot = location.pathname === ROUTES_CASHBOX.account.link

  return (
    <div className={style.block}>
      {
        isAccountRoot
          ?
            <div className={style.wrapper}>
              <div className={style.content}>
                <h4>{auth.account.balance} {auth.account.currency.symbol}</h4>
              </div>
              <Link
                to={ROUTES_CASHBOX.tickets.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_CASHBOX.tickets.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_CASHBOX.tickets.text)}</h5>
                </div>
              </Link>
              <Link
                to={ROUTES_CASHBOX.players.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_CASHBOX.players.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_CASHBOX.players.text)}</h5>
                </div>
              </Link>
              <Link
                to={ROUTES_CASHBOX.profile.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_CASHBOX.profile.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_CASHBOX.profile.text)}</h5>
                </div>
              </Link>
              <Link
                to={ROUTES_CASHBOX.reports.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_CASHBOX.reports.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_CASHBOX.reports.text)}</h5>
                </div>
              </Link>
              <Link
                to={ROUTES_CASHBOX.voucher.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_CASHBOX.voucher.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_CASHBOX.voucher.text)}</h5>
                </div>
              </Link>
              <Link
                to={NAVIGATION.settings.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={NAVIGATION.settings.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(NAVIGATION.settings.text)}</h5>
                </div>
              </Link>
            </div>
          :
            <>
              <Tab data={ROUTES_CASHBOX} />
              <Container classes={style.container}>
                <Outlet />
              </Container>
            </>
      }
    </div>
  )
}

export default Account
