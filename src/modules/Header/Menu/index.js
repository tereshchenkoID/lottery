import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { useAuth } from 'context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
  NAVIGATION, 
  ROUTES_CASHBOX,
  ROUTES_USER 
} from 'constant/config'

import classNames from 'classnames'

import Logout from 'modules/Logout'

import style from './index.module.scss'

const Menu = ({ setShow, show, buttonRef }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { auth } = useSelector(state => state.auth)
  const { isCashbox } = useAuth()
  const isLogin = auth.id

  const blockRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => {
      setShow(false)
    },
    {
      buttonRef: buttonRef,
    },
  )

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show])

  const MENU = [
    {
      submenu: [
        !isLogin && NAVIGATION.login,
        !isLogin && NAVIGATION.all_games,
        NAVIGATION.check_ticket,
        NAVIGATION.settings,
        {
          ...NAVIGATION.broadcast,
          link: `${NAVIGATION.broadcast.link}/0`,
        },
        NAVIGATION.news,
      ].filter(item => item),
    },
    {
      submenu: [
        NAVIGATION.about,
        NAVIGATION.contacts,
        NAVIGATION.faq,
        NAVIGATION.support
      ],
    },
  ]

  const SUBMENU = [
    {
      submenu: [
        NAVIGATION.all_games,
        ...Object.values(isCashbox ? ROUTES_CASHBOX : ROUTES_USER).map(route => ({
          link: route.link,
          icon: route.icon,
          text: route.text
        }))
      ]
    }
  ]

  return (
    <div
      ref={blockRef}
      className={
        classNames(
          style.block,
          show && style.active,
          isLogin && style.auth,
        )
      }
    >
      <menu className={style.menu}>
        {
          isLogin &&
          SUBMENU.map((el, idx) =>
            <div key={idx} className={style.column}>
              {el.submenu.map((s_el, s_idx) => (
                <Link
                  to={s_el.link}
                  rel="noreferrer"
                  key={s_idx}
                  onClick={() => setShow(false)}
                  className={classNames(
                    style.link,
                    pathname === s_el.link && style.active,
                  )}
                >
                  <span className={style.text}>
                    {
                      s_el.icon &&
                      <FontAwesomeIcon
                        icon={s_el.icon}
                        className={style.icon}
                      />
                    }
                    {
                      s_el.text.indexOf('main') !== -1 
                      ? 
                        <>
                          { auth.username }
                          {
                            isCashbox &&
                            <span className={style.value}>
                              <strong>{auth.account.balance}</strong> {auth.account.currency.symbol}
                            </span>
                          }
                        </>
                      : 
                        t(s_el.text)
                    }
                    {
                      s_el.text.indexOf('wallet') !== -1 &&
                      <span className={style.value}>
                        <strong>{auth.account.balance}</strong> {auth.account.currency.symbol}
                      </span>
                    }
                    {
                      s_el.text.indexOf('bonus') !== -1 &&
                      <span className={style.value}>
                        <strong>{auth.account.bonus}</strong>
                      </span>
                    }
                  </span>
                </Link>
              ))}
            </div>
          )
        }
        {
          MENU.map((el, idx) =>
            <div key={idx} className={style.column}>
              {el.submenu.map((s_el, s_idx) => (
                <Link
                  to={s_el.link}
                  rel="noreferrer"
                  key={s_idx}
                  onClick={() => setShow(false)}
                  className={classNames(
                    style.link,
                    pathname === s_el.link && style.active,
                  )}
                >
                  <span className={style.text}>
                    {
                      s_el.icon &&
                      <FontAwesomeIcon
                        icon={s_el.icon}
                        className={style.icon}
                      />
                    }
                    {t(s_el.text)}
                  </span>
                </Link>
              ))}
            </div>
          )
        }
        {
          isLogin &&
          <div className={classNames(style.column, style.alt)}>
            <Logout onChange={() => setShow(false)} classes={[style.logout]} />
          </div>
        }
      </menu>
    </div>
  )
}

export default Menu
