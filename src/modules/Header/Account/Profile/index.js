import React, { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { USER_TYPE, ROUTES_USER, ROUTES_CASHBOX, NAVIGATION } from 'constant/config'

import classNames from 'classnames'

import Reference from 'components/Reference'
import Logout from 'modules/Logout'

import style from './index.module.scss'

const Profile = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const { games } = useSelector(state => state.games)
  const { pathname } = useLocation()
  const [active, setActive] = useState(false)
  const blockRef = useRef(null)
  const buttonRef = useRef(null)
  const isCashbox = auth?.userType === USER_TYPE.cashbox

  useOutsideClick(
    blockRef,
    () => {
      setActive(false)
    },
    {
      buttonRef: buttonRef,
    },
  )

  const bonuses = useMemo(() => games.filter(el => el.bonus), [games])

  const submenu = isCashbox
    ?
      [
        ROUTES_CASHBOX.tickets,
        ROUTES_CASHBOX.players,
        NAVIGATION.check_ticket,
        ROUTES_CASHBOX.reports
      ]
    :
      [
        NAVIGATION.check_ticket,
        ROUTES_USER.stocks,
        ROUTES_USER.promocodes,
      ]


  return (
    <div className={style.block}>
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
              <Link
                to={isCashbox ? ROUTES_CASHBOX.account?.link : ROUTES_USER.account?.link}
                rel="noreferrer"
                className={style.title}
                onClick={() => {
                  setActive(!active)
                }}
              >
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
              {
                isCashbox
                  ?
                    <p className={classNames(style.subtitle, style.alt)}>
                      <h6>{auth.account.balance}</h6>
                      <span>{auth.account.currency.symbol}</span>
                    </p>
                  :
                    <>
                      <Link
                        to={ROUTES_USER.wallet.link}
                        rel="noreferrer"
                        className={style.subtitle}
                        onClick={() => {
                          setActive(!active)
                        }}
                      >
                        <span>{t(ROUTES_USER.wallet.text)}:</span>
                        <h6>{auth.account.balance}</h6>
                        <span>{auth.account.currency.symbol}</span>
                        <FontAwesomeIcon
                          icon="fa-solid fa-angle-right"
                          className={style.icon}
                        />
                      </Link>
                      <Reference
                        link={'/'}
                        placeholder={t('top_up_account')}
                        onClick={() => {
                          setActive(!active)
                        }}
                      />
                    </>
              }
            </div>

            {
              !isCashbox &&
                <div className={style.content}>
                  <Link
                    to={ROUTES_USER.bonuses.link}
                    rel="noreferrer"
                    className={style.subtitle}
                    onClick={() => {
                      setActive(!active)
                    }}
                  >
                    <span>{t(ROUTES_USER.bonuses.text)}:</span>
                    <h6>{auth.account.bonus}</h6>
                    <FontAwesomeIcon
                      icon="fa-solid fa-angle-right"
                      className={style.icon}
                    />
                  </Link>
                  <Link
                    to={'/'}
                    rel="noreferrer"
                    className={style.all}
                    onClick={() => {
                      setActive(!active)
                    }}
                  >
                    {t('bonus_game')}
                  </Link>
                  {bonuses.length > 0 && (
                    <div className={style.games}>
                      {bonuses.map((el, idx) => (
                        <Link
                          key={idx}
                          to={`/game/${el.id}`}
                          rel="noreferrer"
                          className={style.game}
                          onClick={() => {
                            setActive(!active)
                          }}
                        >
                          <img src={el.image} alt={el.alt} className={style.img} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
            }

            <ul className={style.list}>
              {
                submenu.map((el, idx) =>
                  <li 
                    key={idx}
                    className={style.item}
                  >
                    <Link
                      to={el.link}
                      rel="noreferrer"
                      className={classNames(
                        style.link,
                        pathname === el.link && style.active,
                      )}
                      onClick={() => {
                        setActive(!active)
                      }}
                    >
                      <FontAwesomeIcon
                        icon={el.icon}
                        className={style.icon}
                      />
                      {t(el.text)}
                    </Link>
                  </li>
                )
              }
            </ul>
          </div>
          <div className={style.bottom}>
            <Logout onChange={() => setActive(false)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
