import { useTranslation } from 'react-i18next'

import Ticket from './Ticket'
import Table from './Table'

import style from './index.module.scss'

const LOTO_7_49 = ({ auth, betslip, game }) => {
  const { t } = useTranslation()
  const ODDS = [
    { count: 7, factor: 1 },
    { count: 8, factor: 8 },
    { count: 9, factor: 36 },
    { count: 10, factor: 120 },
    { count: 11, factor: 330 },
    { count: 12, factor: 792 },
    { count: 13, factor: 1716 },
    { count: 14, factor: 3432 },
    { count: 15, factor: 6435 },
    { count: 16, factor: 11440 },
    { count: 17, factor: 19448 },
    { count: 18, factor: 31824 },
    { count: 19, factor: 58564 },
  ]

  return (
    <div className={style.block}>
      <h6 className={style.title}>
        {t('ticket_price')} - {game.betCost} {auth.account.currency.symbol}
      </h6>
      <div className={style.container}>
        <div className={style.wrapper}>
          <Ticket betslip={betslip} game={game} />
          <Table numbers={ODDS} />
        </div>
      </div>
    </div>
  )
}

export default LOTO_7_49
