import { useTranslation } from 'react-i18next'

import Ticket from './Ticket'
import Table from './Table'

import style from './index.module.scss'

const LOTO_7_49 = ({ auth, betslip, game }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <h6 className={style.title}>
        {t('ticket_price')} - {game.betCost} {auth.account.currency.symbol}
      </h6>
      <div className={style.wrapper}>
        <Ticket game={game} betslip={betslip} />
        <Table game={game} auth={auth} />
      </div>
    </div>
  )
}

export default LOTO_7_49
