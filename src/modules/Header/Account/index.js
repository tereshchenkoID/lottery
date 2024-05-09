import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { getData } from 'helpers/api'
import { setAuth } from 'store/actions/authAction'

import style from './index.module.scss'

import Button from 'components/Button'
import Currency from './Currency'

const Account = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const [active, setActive] = useState(false)
  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => {
      setActive(false)
    },
    {
      buttonRef: buttonRef,
    },
  )

  const handleLogout = () => {
    getData('logout/').then(json => {
      dispatch(setAuth(json))
      setActive(false)
    })
  }

  return (
    <div className={style.block}>
      {auth.id ? (
        <>
          <Currency />
          <div
            ref={blockRef}
            className={classNames(style.wrapper, active && style.active)}
          >
            <div
              className={style.toggle}
              ref={buttonRef}
              onClick={() => {
                setActive(!active)
              }}
            >
              <div className={style.avatar}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                className={style.arrow}
              />
            </div>
            <div className={style.dropdown}>
              <div className={style.top}>
                <div className={style.avatar}>
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </div>
                <div>
                  <Link to={'/'} rel="noreferrer" className={style.title}>
                    <span>{t('personal_area')}</span>
                    <FontAwesomeIcon
                      icon="fa-solid fa-angle-right"
                      className={style.icon}
                    />
                  </Link>
                  <div className={style.nickname}>{auth.username}</div>
                </div>
              </div>
              <div className={style.body}>
                <div className={style.content}>
                  <Link to={'/'} rel="noreferrer" className={style.subtitle}>
                    <span>{t('wallet')}:</span>
                    <h6>{auth.account.balance}</h6>
                    <span>{auth.account.currency.symbol}</span>
                    <FontAwesomeIcon
                      icon="fa-solid fa-angle-right"
                      className={style.icon}
                    />
                  </Link>
                  <Link to={'/'} rel="noreferrer" className={style.link}>
                    {t('top_up_account')}
                  </Link>
                </div>
                <div className={style.content}>
                  <Link to={'/'} rel="noreferrer" className={style.subtitle}>
                    <span>{t('bonuses')}:</span>
                    <h6>{auth.account.bonus}</h6>
                    <span>{auth.account.currency.symbol}</span>
                    <FontAwesomeIcon
                      icon="fa-solid fa-angle-right"
                      className={style.icon}
                    />
                  </Link>
                </div>
                <ul className={style.list}>
                  <li className={style.item}>
                    <Link to={'/'} rel="noreferrer">
                      {t('menu_12')}
                    </Link>
                  </li>
                  <li className={style.item}>
                    <Link to={'/'} rel="noreferrer">
                      {t('menu_13')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={style.bottom}>
                <Button placeholder={t('logout')} onChange={handleLogout} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Link to={'/login'} rel="noreferrer" className={style.link}>
          {t('menu_2')}
        </Link>
      )}
    </div>
  )
}

export default Account
