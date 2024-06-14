import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NAVIGATION, ROUTES_USER } from 'constant/config'

import classNames from 'classnames'

import Reference from 'components/Reference'
import Tab from 'modules/Tab'

import style from './index.module.scss'

const Account = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const isAccountRoot = location.pathname === ROUTES_USER.account.link

  return (
    <div className={style.block}>
      {
        isAccountRoot
          ?
            <div className={style.wrapper}>
              <div className={style.content}>
                <h4>{auth.account.balance} {auth.account.currency.symbol}</h4>
                <Reference
                  link={ROUTES_USER.wallet.link}
                  placeholder={t(ROUTES_USER.wallet.text)}
                />
              </div>
              <div className={style.content}>
                <h4>{auth.account.bonus}</h4>
                <Reference
                  link={ROUTES_USER.bonuses.link}
                  placeholder={t(ROUTES_USER.wallet.text)}
                />
              </div>
              <div className={style.content}>
                <h4>{auth.account.promocode}</h4>
                <Reference
                  link={ROUTES_USER.promocodes.link}
                  placeholder={t(ROUTES_USER.promocodes.text)}
                />
              </div>
              <Link
                to={ROUTES_USER.tickets.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_USER.tickets.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_USER.tickets.text)}</h5>
                  <span className={style.description}>{t(`${ROUTES_USER.tickets.text}_description`)}</span>
                </div>
              </Link>
              <Link
                to={ROUTES_USER.friends.link}
                className={classNames(style.link, style.top)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_USER.friends.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_USER.friends.text)}</h5>
                  <span className={style.description}>{t(`${ROUTES_USER.friends.text}_description`)}</span>
                </div>
              </Link>
              <Link
                to={ROUTES_USER.profile.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_USER.profile.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_USER.profile.text)}</h5>
                  <span className={style.description}>{t(`${ROUTES_USER.profile.text}_description`)}</span>
                </div>
              </Link>
              <Link
                to={ROUTES_USER.subscriptions.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_USER.subscriptions.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_USER.subscriptions.text)}</h5>
                  <span className={style.description}>{t(`${ROUTES_USER.subscriptions.text}_description`)}</span>
                </div>
              </Link>
              <Link
                to={ROUTES_USER.stocks.link}
                className={classNames(style.link, style.right)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon={ROUTES_USER.stocks.icon} />
                </span>
                <div className={style.info}>
                  <h5 className={style.title}>{t(ROUTES_USER.stocks.text)}</h5>
                  <span className={style.description}>{t(`${ROUTES_USER.stocks.text}_description`)}</span>
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
              <Tab data={ROUTES_USER} />
              <div className={style.wrap}>
                <Outlet />
              </div>
            </>
      }
    </div>
  )
}

export default Account
