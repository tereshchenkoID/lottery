import React, { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import style from './index.module.scss'

import Reference from 'components/Reference'
import Logout from 'modules/Logout'

const Profile = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const { games } = useSelector(state => state.games)
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

  const bonuses = useMemo(() => games.filter(el => el.bonus), [games])

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
                to={'/account'}
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
              <Link
                to={'/wallet'}
                rel="noreferrer"
                className={style.subtitle}
                onClick={() => {
                  setActive(!active)
                }}
              >
                <span>{t('wallet')}:</span>
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
            </div>
            <div className={style.content}>
              <Link
                to={'/bonuses'}
                rel="noreferrer"
                className={style.subtitle}
                onClick={() => {
                  setActive(!active)
                }}
              >
                <span>{t('bonuses')}:</span>
                <h6>{auth.account.bonus}</h6>
                <span>{auth.account.currency.symbol}</span>
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
            <ul className={style.list}>
              <li className={style.item}>
                <Link
                  to={'/'}
                  rel="noreferrer"
                  onClick={() => {
                    setActive(!active)
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-percent"
                    className={style.icon}
                  />
                  {t('menu_12')}
                </Link>
              </li>
              <li className={style.item}>
                <Link
                  to={'/'}
                  rel="noreferrer"
                  onClick={() => {
                    setActive(!active)
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-receipt"
                    className={style.icon}
                  />
                  {t('menu_13')}
                </Link>
              </li>
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
