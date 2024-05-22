import { useTranslation } from 'react-i18next'

import { sports_lotto_factors } from 'constant/config'

import style from './index.module.scss'

const Table = ({ game, auth }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.row}>
        <p className={style.cell}>{t(`games.${game.id}.rules.2`)}</p>
        <p className={style.cell}>{t(`games.${game.id}.rules.3`)}</p>
        <p className={style.cell}>
          {t(`games.${game.id}.rules.4`)}, {auth.account.currency.symbol}
        </p>
      </div>
      {sports_lotto_factors.map((el, idx) => (
        <div key={idx} className={style.row}>
          <p className={style.cell}>{el.count}</p>
          <p className={style.cell}>x {el.factor}</p>
          <p className={style.cell}>{game.betCost * el.factor}</p>
        </div>
      ))}
    </div>
  )
}

export default Table
