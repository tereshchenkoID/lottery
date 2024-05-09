import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Account from 'modules/Header/Account'
import Menu from 'modules/Header/Menu'
import Toggle from 'modules/Header/Toggle'

import style from './index.module.scss'
import classNames from 'classnames'

const Header = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  return (
    <header className={style.block}>
      <Toggle active={show} action={setShow} />
      <Link
        to={`/`}
        rel="noreferrer"
        className={style.logo}
        onClick={() => {
          setShow(false)
        }}
      />
      <div
        className={classNames(style.link, show && style.active)}
        onClick={() => setShow(!show)}
      >
        <span className={style.text}>
          {t('menu_1')}{' '}
          <FontAwesomeIcon
            icon="fa-solid fa-angle-down"
            className={style.icon}
          />
        </span>
      </div>
      <Menu show={show} />
      <Account />
    </header>
  )
}

export default Header
