import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import Menu from './Menu'
// import Toggle from './Toggle'
import Account from './Account'
import Language from './Language'

import style from './index.module.scss'

const Header = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const buttonRef = useRef(null)

  return (
    <header className={style.block}>
      {/*<Toggle active={show} action={setShow} buttonRef={buttonRef} />*/}
      <Link
        to={`/`}
        rel="noreferrer"
        className={style.logo}
        onClick={() => {
          setShow(false)
        }}
      />
      <div
        className={style.button}
        ref={buttonRef}
        onClick={() => setShow(!show)}
      >
        <button
          type={'button'}
          className={classNames(style.toggle, show && style.active)}
        >
          <span className={style.line} />
          <span className={style.line} />
          <span className={style.line} />
        </button>

        <button className={classNames(style.link, show && style.active)}>
          <span className={style.text}>
            {t('menu_1')}{' '}
            <FontAwesomeIcon
              icon="fa-solid fa-angle-down"
              className={style.icon}
            />
          </span>
        </button>
      </div>
      <Menu setShow={setShow} show={show} buttonRef={buttonRef} />
      <Account />
      <Language />
    </header>
  )
}

export default Header
