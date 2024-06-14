import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import Menu from './Menu'
import Account from './Account'

import style from './index.module.scss'

const Header = () => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)
  const [show, setShow] = useState(false)
  const buttonRef = useRef(null)

  return (
    <header className={style.block}>
      <Link
        to={`/`}
        rel="noreferrer"
        className={style.logo}
        aria-label="Logo"
        onClick={() => {
          setShow(false)
        }}
      >
        <img src={settings.logo} alt="logo" loading="lazy"/>
      </Link>
      <div
        className={style.button}
        ref={buttonRef}
        onClick={() => setShow(!show)}
      >
        <button
          className={classNames(style.toggle, show && style.active)}
          type={'button'}
          aria-label="Toggle"
        >
          <span className={style.line} />
          <span className={style.line} />
          <span className={style.line} />
        </button>

        <button 
          className={classNames(style.link, show && style.active)}
          type={'button'}
          aria-label="Toggle"
        >
          <span className={style.text}>
            {t('navigation.menu')}{' '}
            <FontAwesomeIcon
              icon="fa-solid fa-angle-down"
              className={style.icon}
            />
          </span>
        </button>
      </div>
      <Menu setShow={setShow} show={show} buttonRef={buttonRef} />
      <Account />
    </header>
  )
}

export default Header
