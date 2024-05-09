import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Menu = ({ setShow, show }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const submenu = [
    {
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

  return (
    <div className={classNames(style.block, show && style.active)}>
      <menu className={style.menu}>
        {submenu.map((el, idx) => (
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
        ))}
      </menu>
    </div>
  )
}

export default Menu
