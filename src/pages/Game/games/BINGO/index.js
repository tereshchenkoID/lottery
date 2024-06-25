import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { setBetslip } from 'store/actions/betslipAction'
import { getData } from 'helpers/api'

import Button from 'components/Button'
import Loader from 'components/Loader'

import style from './index.module.scss'

const BINGO = ({ auth, betslip, game, setGame }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [tickets, setTickets] = useState({})
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setTickets(game.odds?.tickets || {})
  }, [game])

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
              numbers: tickets[id],
            },
          ],
        }),
      )
    }
  }

  const selectElements = (obj, n) => {
    const keys = Object.keys(obj.tickets).slice(0, n)
    return keys.reduce((result, key) => {
      result[key] = obj.tickets[key]
      return result
    }, {})
  }

  const convertToIdObject = array => {
    return array.reduce((acc, curr) => {
      acc[curr.id] = curr.numbers
      return acc
    }, {})
  }

  const handleLoad = () => {
    setUpdate(true)
    getData(`game/${game.id}`).then(json => {
      setGame(prevState => ({
        ...prevState,
        odds: {
          tickets: {
            ...convertToIdObject(betslip.tickets),
            ...selectElements(json.odds, 10 - betslip.tickets.length),
          },
        },
      }))

      setTickets({
        ...convertToIdObject(betslip.tickets),
        ...selectElements(json.odds, 10 - betslip.tickets.length),
      })
      setTimeout(() => {
        setUpdate(false)
      }, 500)
    })
  }

  return (
    <div className={style.block}>
      <h6 className={style.title}>
        {t('ticket_price')} - {game.betCost} {auth.account.currency.symbol}
      </h6>
      <div className={style.container}>
        <div className={style.wrapper}>
          {Object.keys(tickets).map((el, idx) => (
            <div
              key={idx}
              className={classNames(
                style.ticket,
                isTicketExist(el) !== -1 && style.active,
              )}
              onClick={() => handleClick(el)}
            >
              {isTicketExist(el) === -1 && update && (
                <Loader
                  type={'inline'}
                  theme={{
                    backgroundColor: 'var(--game_container_color)',
                  }}
                />
              )}
              <div className={style.head}>
                <span>
                  {t('ticket')} #{el}
                </span>
                <span className={style.check}>
                  <FontAwesomeIcon icon="fa-solid fa-check" />
                </span>
              </div>
              <div className={style.table}>
                {tickets[el].map((el_c, idx_c) => (
                  <div key={idx_c} className={style.cell}>
                    {el_c !== 0 && (
                      <Button 
                        classes={['game', 'wide', style.button]} 
                        placeholder={el_c} 
                      />
                    )}
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
          classes={['primary', 'wide']}
          onChange={() => handleLoad()}
          isDisabled={betslip.tickets?.length >= 10}
        />
      </div>
    </div>
  )
}

export default BINGO
