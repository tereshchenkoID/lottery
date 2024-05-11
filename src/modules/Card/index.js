import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Card = ({ data, classes = null }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <a
      href={`/game/${data.id}`}
      className={classNames(style.block, classes)}
      style={{
        backgroundColor: data.color,
        color: data.font_color,
      }}
    >
      <div className={style.picture}>
        <img
          src={data.image}
          alt={t(`games.${data.id}.alt`)}
          className={style.img}
          loading={'lazy'}
        />
      </div>
      {data.jackpots && (
        <div className={style.content}>
          <div className={style.title}>{t('prize')}</div>
          <h4 className={style.prize}>
            {data.jackpots}
            {auth.account.currency.symbol}
          </h4>
        </div>
      )}
      {data.time && (
        <div className={style.time}>
          <FontAwesomeIcon icon="fa-solid fa-clock" />
          <span>{data.time}</span>
        </div>
      )}
      <div className={style.description}>
        {t(`games.${data.id}.description`)}
      </div>
      <div className={style.action}>
        <span>{t('play')}</span>
        <span className={style.price}>
          {data.betCost} {auth.account.currency.symbol}
        </span>
      </div>
    </a>
  )
}

export default Card
