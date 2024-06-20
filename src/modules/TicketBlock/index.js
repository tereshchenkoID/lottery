import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { STATUS_TYPE } from 'constant/config'

import classNames from 'classnames'

import Loader from 'components/Loader'

import { getDate } from 'helpers/getDate'

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
    <div
      className={
        classNames(
          style.block,
          (ticket.time < new Date().getTime() && ticket.win === 0) && style.disabled,
          active?.id === ticket.id && style.active
        )
      }
      onClick={() => {
        setActive(ticket)
      }}
    >
      <div className={style.wrapper}>
        {
          loading ? (
            <Loader type={'inline'} classes={style.loader} />
          ) : (
            <>
              <div className={style.info}>
                <h6 className={style.title}>{t(`games.${ticket.gameId}.title`)}</h6>
                <strong className={classNames(style.status, style[`type-${ticket.status}`])}>
                  {t(`ticket_status.${STATUS_TYPE[ticket.status]}`)}
                </strong>
                <div className={style.meta}>
                  {
                    ( ticket.win > 0)
                      ?
                        <h6>{ticket.win} {auth.account.currency.symbol}</h6>
                      :
                        <p className={style.date}>{getDate(ticket.time, 3)}</p>
                  }
                </div>
              </div>
              <div className={style.logo}>
                <img src={ticket.image} alt={t(`games.${ticket.id}.title`)} loading="lazy"/>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default TicketBlock
