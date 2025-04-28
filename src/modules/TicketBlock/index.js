import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { STATUS_TYPE } from 'constant/config'
import { getDate } from 'helpers/getDate'

import classNames from 'classnames'

import Loader from 'components/Loader'

import style from './index.module.scss'

const TicketBlock = ({ data, active, setActive }) => {
  const { t } = useTranslation()
  const { games } = useSelector(state => state.games)
  const { auth } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)

  const game = useMemo(() => games.find(game => game.id === data.gameId), [games, data.gameId])

  const ticket = useMemo(() => {
    setLoading(false)
    return { ...data, image: game?.image }
  }, [data, game])

  return (
    <div className={style.block}>
      <button
        className={
          classNames(
            style.button,
            (ticket.time < new Date().getTime() && Number(ticket.win) === 0) && style.disabled,
            active?.id === ticket.id && style.active
          )
        }
        onClick={() => {
          setActive(ticket)
        }}
        type="button"
      >
          {
            loading 
              ?
                <Loader type={'inline'} classes={style.loader} />
              :
                <span className={style.content}>
                  <span className={style.info}>
                    <span className={style.name}>{t(`games.${ticket.gameId}.title`)}</span>
                    <span className={classNames(style.status, style[`type-${ticket.status}`])}>
                      {t(`ticket_status.${STATUS_TYPE[ticket.status]}`)}
                    </span>
                    {
                      (ticket.win > 0)
                        ?
                          <strong className={style.amount}>{ticket.win} {auth.account.currency.symbol}</strong>
                        :
                          <span className={style.date}>{getDate(ticket.time, 3)}</span>
                    }
                  </span>
                  <img className={style.logo} src={ticket.image} alt={t(`games.${ticket.id}.title`)} loading="lazy"/>
                </span>
          }
      </button>
    </div>
  )
}

export default TicketBlock
