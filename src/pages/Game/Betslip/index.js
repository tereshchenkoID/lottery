import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ticketType } from 'constant/config'

import { calculateMultiplier } from 'helpers/calculateMultiplier'
import { calculatePercent } from 'helpers/calculatePercent'
import { setBetslip } from 'store/actions/betslipAction'

import classNames from 'classnames'

import Tooltip from 'components/Tooltip'
import Reference from 'components/Reference'
import Control from 'components/Control'
import Button from 'components/Button'

import style from './index.module.scss'

const Betslip = ({ auth, betslip, game, active, show, setShow }) => {
  const EXCEPTION = [1]
  const RULES = {
    factor: {
      text: 'rules.1',
      placeholder: 'tooltip.1',
    },
    draw: {
      text: 'rules.2',
      placeholder: 'tooltip.2',
    },
  }
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isNotEmpty = betslip.odds?.length > 0 || betslip.tickets?.length > 0
  const isSingle = active === ticketType.single

  const handleStakeChange = (index, newValue) => {
    const updatedOptions = betslip.bet?.[ticketType.single]
    updatedOptions.options[index].value = newValue
    updatedOptions.amount =
      calculateMultiplier(updatedOptions.options) *
      game.betCost *
      betslip.tickets?.length
    updatedOptions.bonuses = calculatePercent(
      betslip.bonusAmount,
      updatedOptions.amount,
    )

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          ...betslip.bet,
          [ticketType.single]: updatedOptions,
        },
      }),
    )
  }

  const handleLoadTicket = idx => {
    dispatch(
      setBetslip({
        ...betslip,
        activeTicket: betslip.activeTicket === idx ? null : idx,
      }),
    )
    setShow(false)
  }

  const handleDeleteTicket = idx => {
    const updatedTickets = [...betslip.tickets]
    updatedTickets.splice(idx, 1)

    dispatch(
      setBetslip({
        ...betslip,
        tickets: updatedTickets,
        activeTicket: null,
      }),
    )
  }

  const handleAmount = () => {
    const amounts = [
      game.betCost *
        betslip.tickets.length *
        (betslip.bet[ticketType.single]?.options.length > 0
          ? calculateMultiplier(betslip.bet[ticketType.single].options)
          : 1),
      game.betCost *
        betslip.bet?.[ticketType.multi]?.options[0].value *
        calculateMultiplier(betslip.bet[ticketType.multi].options),
    ]

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          [ticketType.single]: {
            ...betslip.bet[ticketType.single],
            amount: amounts[0],
            bonuses: calculatePercent(betslip.bonusAmount, amounts[0]),
          },
          [ticketType.multi]: {
            ...betslip.bet[ticketType.multi],
            amount: amounts[1],
            bonuses: calculatePercent(betslip.bonusAmount, amounts[1]),
          },
        },
      }),
    )

    if (betslip.tickets.length === 0) {
      setShow(false)
    }
  }

  useEffect(() => {
    handleAmount()
  }, [active, betslip.tickets])

  return (
    <div className={classNames(style.block, show && style.active)}>
      <button
        type={'button'}
        className={style.toggle}
        onClick={() => setShow(!show)}
      />

      <div className={style.wrapper}>
        {/*<pre>{JSON.stringify(betslip, null, 2)}</pre>*/}

        {isSingle && (
          <>
            {isNotEmpty ? (
              <>
                {betslip.bet?.[ticketType.single]?.options.length > 0 && (
                  <div className={style.container}>
                    <div className={style.ticket}>
                      {betslip.bet?.[ticketType.single]?.options?.map(
                        (el, idx) => (
                          <div key={idx} className={style.row}>
                            <Tooltip
                              text={t(RULES[el.name]?.text)}
                              placeholder={t(RULES[el.name]?.placeholder)}
                            />
                            <Control
                              data={el}
                              index={idx}
                              onChange={handleStakeChange}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={style.container}>
                <div className={style.icon}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </div>
                <p>{t('place_bet')}</p>
              </div>
            )}
          </>
        )}

        {(isNotEmpty || active === ticketType.multi) && (
          <div className={style.container}>
            <div className={style.ticket}>
              <div className={style.row}>
                <p>{t('amount')}</p>
                <span className={style.dots} />
                <h6>
                  {betslip.bet?.[active]?.amount} {auth.account.currency.symbol}
                </h6>
              </div>
              <div className={style.row}>
                <p>{t('tickets')}</p>
                <span className={style.dots} />
                <p>
                  <strong>
                    {active === ticketType.single
                      ? betslip.tickets.length
                      : betslip.bet?.[active]?.options[0].value}
                  </strong>
                </p>
              </div>
              <div className={style.row}>
                <p>{t('add_bonus')}</p>
                <span className={style.dots} />
                <p>
                  <strong>{betslip.bet?.[active]?.bonuses}</strong>
                </p>
              </div>
              <div className={style.row}>
                {auth.id !== null ? (
                  <Button
                    placeholder={t('placebet')}
                    styles={{ width: '100%' }}
                  />
                ) : (
                  <Reference
                    link={'/login'}
                    placeholder={t('menu_2')}
                    styles={{ width: '100%' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {EXCEPTION.indexOf(game.id) === -1 &&
          isSingle &&
          betslip.tickets?.length > 0 && (
            <div className={style.tickets}>
              {betslip.tickets.map((el, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    style.stake,
                    betslip.activeTicket === idx && style.active,
                  )}
                >
                  <button
                    className={style.preview}
                    onClick={() => handleLoadTicket(idx)}
                  >
                    {t('ticket')} #{el.id}
                  </button>
                  <button
                    className={style.button}
                    onClick={() => handleDeleteTicket(idx)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default Betslip
