import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { setBetslip } from 'store/actions/betslipAction'

import Button from 'components/Button'

import style from './index.module.scss'

const BINGO = ({ auth, betslip, game }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isTicketExist = id => {
    return betslip.tickets.findIndex(ticket => ticket.id === id)
  }

  const handleClick = id => {
    const find = isTicketExist(id)

    if (find !== -1) {
      const updatedTickets = [...betslip.tickets]
      updatedTickets.splice(find, 1)

      dispatch(
        setBetslip({
          ...betslip,
          tickets: updatedTickets,
          activeTicket: null,
        }),
      )
    } else {
      dispatch(
        setBetslip({
          ...betslip,
          tickets: [
            ...betslip.tickets,
            {
              id: id,
              numbers: game.odds.tickets[id],
            },
          ],
        }),
      )
    }
  }

  return (
    <div className={style.block}>
      <h6 className={style.title}>
        {t('ticket_price')} - {game.betCost} {auth.account.currency.symbol}
      </h6>
      <div className={style.container}>
        <div className={style.wrapper}>
          {Object.keys(game.odds.tickets).map((el, idx) => (
            <div
              key={idx}
              className={classNames(
                style.ticket,
                isTicketExist(el) !== -1 && style.active,
              )}
              onClick={() => handleClick(el)}
            >
              <div className={style.head}>
                <span>
                  {t('ticket')} #{el}
                </span>
                <span className={style.check}>
                  <FontAwesomeIcon icon="fa-solid fa-check" />
                </span>
              </div>
              <div className={style.table}>
                {game.odds.tickets[el].map((el_c, idx_c) => (
                  <div key={idx_c} className={style.cell}>
                    {el_c !== 0 && <div className={style.button}>{el_c}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.container}>
        <Button
          placeholder={t('load_more')}
          classes={style.more}
          onChange={() => {}}
        />
      </div>
    </div>
  )
}

export default BINGO
