import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from 'context/AuthContext'
import { useWindowWidth } from 'context/WindowWidthContext'

import { BREAKPOINTS } from 'constant/config'

import classNames from 'classnames'

import Picture from 'components/Picture'
import Button from 'components/Button'
import Logo from 'components/Logo'
import Menu from './Menu'
import Account from './Account'
import Currency from './Account/Currency'

import style from './index.module.scss'

const Header = () => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)
  const { isCashbox } = useAuth()
  const { windowWidth } = useWindowWidth()

  const [show, setShow] = useState(false)
  const buttonRef = useRef(null)
  const isMobile = windowWidth <= BREAKPOINTS.lg

  return (
    <header className={style.block}>
      {
        (isCashbox && !isMobile)
          ?
          <Logo setShow={setShow} />
          :
          (!isCashbox && <Logo setShow={setShow} />)
      }

      <div
        className={style.button}
        ref={buttonRef}
        onClick={() => setShow(!show)}
      >
        {
          isMobile
            ?
            <button
              type={'button'}
              className={classNames(style.toggle, show && style.active)}
              aria-label="Toggle"
            >
              {
                (isCashbox && isMobile)
                  ?
                  <Picture
                    src={settings.assets.logo_icon}
                    alt={"Logo"}
                  />
                  :
                  <>
                    <span className={style.line} />
                    <span className={style.line} />
                    <span className={style.line} />
                  </>
              }
            </button>
            :
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
        }
      </div>
      <Menu setShow={setShow} show={show} buttonRef={buttonRef} />
      <Account />
      {
        (isCashbox && isMobile) &&
        <>
          <Currency />
          <Button
            classes={['alt', style.scan]}
            icon={'fa-solid fa-barcode'}
          />
        </>
      }
    </header>
  )
}

export default Header
