import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Account = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.id) {
      navigate('/', { replace: true })
    }
  }, [auth.id, navigate])

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <h4>{auth.account.balance} {auth.account.currency.symbol}</h4>
          <Reference
            link={'/'}
            placeholder={t('wallet')}
          />
        </div>
        <div className={style.content}>
          <h4>{auth.account.bonus} {auth.account.currency.symbol}</h4>
          <Reference
            link={'/'}
            placeholder={t('bonuses')}
          />
        </div>
        <div className={style.content}>
          <h4>0</h4>
          <Reference
            link={'/'}
            placeholder={t('promocodes')}
          />
        </div>
        <a href="#" aria-label="" className={classNames(style.link, style.right)}>
          <span className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-ticket" />
          </span>
          <div className={style.info}>
            <h5 className={style.title}>{t('account.tickets')}</h5>
            <span className={style.description}>{t('account.tickets_description')}</span>
          </div>
        </a>
        <a href="#" aria-label="" className={classNames(style.link, style.top)}>
          <span className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-people-group" />
          </span>
          <div className={style.info}>
            <h5 className={style.title}>{t('account.bring_friend')}</h5>
            <span className={style.description}>{t('account.bring_friend_description')}</span>
          </div>
        </a>
        <a href="#" aria-label="" className={style.link}>
          <span className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </span>
          <div className={style.info}>
            <h5 className={style.title}>{t('account.profile')}</h5>
            <span className={style.description}>{t('account.profile_description')}</span>
          </div>
        </a>
        <a href="#" aria-label="" className={style.link}>
          <span className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-bell" />
          </span>
          <div className={style.info}>
            <h5 className={style.title}>{t('account.subscriptions')}</h5>
            <span className={style.description}>{t('account.subscriptions_description')}</span>
          </div>
        </a>
        <a href="#" aria-label="" className={classNames(style.link, style.right)}>
          <span className={style.icon}>
            <FontAwesomeIcon icon="fa-solid fa-percent" />
          </span>
          <div className={style.info}>
            <h5 className={style.title}>{t('account.stocks')}</h5>
            <span className={style.description}>{t('account.stocks_description')}</span>
          </div>
        </a>
      </div> 
    </div>
  )
}

export default Account
