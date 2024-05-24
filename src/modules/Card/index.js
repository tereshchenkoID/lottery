import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getDifferent } from 'helpers/getDifferent'
import { getValueFormatted } from 'helpers/getValueFormatted'

import style from './index.module.scss'

const Card = ({ data }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <a
      href={`/game/${data.id}`}
      className={style.block}
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
            {getValueFormatted(data.jackpots)}
            {auth.account.currency.symbol}
          </h4>
        </div>
      )}
      {data.time && (
        <div className={style.time}>
          <FontAwesomeIcon icon="fa-solid fa-clock" />
          <span>{getDifferent(data.time, t)}</span>
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
