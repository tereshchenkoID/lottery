import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getValueFormatted } from 'helpers/getValueFormatted'

import style from './index.module.scss'

const Game = ({ data }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <Link to={`/game/${data.id}`} rel="noreferrer" className={style.block}>
      <div className={style.header}>
        <div className={style.picture}>
          <img
            src={data.image}
            alt={t(`games.${data.id}.alt`)}
            className={style.img}
            loading={'lazy'}
          />
        </div>
        <p className={style.price}>
          {data.betCost} {auth.account.currency.symbol}
        </p>
      </div>
      {data.jackpots && (
        <div className={style.content}>
          <p className={style.title}>{t('prize')}</p>
          <h6 className={style.prize}>
            {getValueFormatted(data.jackpots)}
            {auth.account.currency.symbol}
          </h6>
        </div>
      )}
      <div className={style.action}>
        <span>{t('play')}</span>
      </div>
    </Link>
  )
}

export default Game
