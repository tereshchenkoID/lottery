import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import Logout from 'modules/Logout'

import style from './index.module.scss'

const Menu = ({ setShow, show, buttonRef }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { auth } = useSelector(state => state.auth)
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
      hide: isLogin,
      submenu: [
        {
          link: '/login',
          icon: 'fa-user',
          text: 'menu_2',
        },
      ],
    },
    {
      submenu: [
        {
          link: '/translation',
          icon: 'fa-tv',
          text: 'menu_3',
        },
        {
          link: '/check-ticket',
          icon: 'fa-ticket',
          text: 'menu_4',
        },
        {
          link: '/archive',
          icon: 'fa-clock-rotate-left',
          text: 'menu_5',
        },
      ],
    },
    {
      submenu: [
        {
          link: '/send-ticket',
          icon: 'fa-gift',
          text: 'menu_6',
        },
        {
          link: '/lottery-city',
          icon: 'fa-shop',
          text: 'menu_7',
        },
        {
          link: '/faq',
          icon: 'fa-message',
          text: 'menu_8',
        },
      ],
    },
    {
      submenu: [
        {
          link: '/news',
          icon: 'fa-newspaper',
          text: 'menu_9',
        },
        {
          link: '/about',
          icon: 'fa-circle-info',
          text: 'menu_10',
        },
        {
          link: '/contacts',
          icon: 'fa-phone',
          text: 'menu_11',
        },
      ],
    },
  ]

  const SUBMENU = [
    {
      submenu: [
        {
          link: '/',
          icon: 'fa-dice',
          text: 'all_games',
        },
      ],
    },
    {
      submenu: [
        {
          link: '/account',
          icon: 'fa-user',
          nickname: auth.username,
        },
      ],
    },
    {
      submenu: [
        {
          link: '/account/wallet',
          icon: 'fa-wallet',
          text: 'wallet',
          value: auth.account.balance,
        },
        {
          link: '/account/bonuses',
          icon: 'fa-money-bill',
          text: 'bonuses',
          value: auth.account.bonus,
        },
      ],
    },
  ]

  return (
    <div
      ref={blockRef}
      className={classNames(
        style.block,
        show && style.active,
        isLogin && style.auth,
      )}
    >
      <menu className={style.menu}>
        {isLogin &&
          SUBMENU.map((el, idx) => (
            <div key={idx} className={style.column}>
              {el.submenu.map((s_el, s_idx) => (
                <Link
                  to={s_el.link}
                  rel="noreferrer"
                  key={s_idx}
                  onClick={() => setShow(false)}
                  className={style.link}
                >
                  <span className={style.text}>
                    <FontAwesomeIcon
                      icon={`fa-solid ${s_el.icon}`}
                      className={style.icon}
                    />
                    {s_el.nickname && s_el.nickname}
                    {s_el.text && t(s_el.text)}
                    {s_el.value && (
                      <span>
                        {s_el.value}{' '}
                        <strong>{auth.account.currency.symbol}</strong>
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          ))}

        {MENU.map(
          (el, idx) =>
            !el.hide && (
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
                      <FontAwesomeIcon
                        icon={`fa-solid ${s_el.icon}`}
                        className={style.icon}
                      />
                      {t(s_el.text)}
                    </span>
                  </Link>
                ))}
              </div>
            ),
        )}
        {isLogin && (
          <div className={classNames(style.column, style.alt)}>
            <Logout onChange={() => setShow(false)} classes={style.logout} />
          </div>
        )}
      </menu>
    </div>
  )
}

export default Menu
