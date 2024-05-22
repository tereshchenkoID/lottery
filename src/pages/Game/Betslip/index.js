import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ticketType } from 'constant/config'

import { calculateTotalFactorFromNumber } from 'helpers/calculateTotalFactorFromNumber'
import { calculateTotalFactor } from 'helpers/calculateTotalFactor'
import { calculateMultiplier } from 'helpers/calculateMultiplier'
import { calculatePercent } from 'helpers/calculatePercent'
import { setBetslip } from 'store/actions/betslipAction'
import { getFactors } from 'helpers/getFactors'

import classNames from 'classnames'

import Reference from 'components/Reference'
import Button from 'components/Button'
import Singlebet from '../Singlebet'

import style from './index.module.scss'
import GameButton from '../../../modules/GameButton'

const EXCEPTION = [1]

const Betslip = ({ auth, betslip, game, active, show, setShow }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isSingle = active === ticketType.single
  const isNotEmpty = betslip.odds?.length > 0 || betslip.tickets?.length > 0
  const isCombination = betslip.bet[ticketType.multi].options.find(
    el => el.name === 'combinations',
  )

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
    const combinations = [1, 1]

    if (isCombination) {
      combinations[0] = calculateTotalFactor(
        betslip.tickets,
        getFactors(game.id),
      )
      combinations[1] =
        calculateTotalFactorFromNumber(isCombination.value, getFactors(game.id))
          ?.factor || 1
    }

    const amounts = [
      game.betCost *
        (isCombination ? 1 : betslip.tickets.length) *
        calculateMultiplier(betslip.bet[ticketType.single].options) *
        combinations[0],
      game.betCost *
        betslip.bet?.[ticketType.multi]?.options[0].value *
        calculateMultiplier(betslip.bet[ticketType.multi].options) *
        combinations[1],
    ]

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          [ticketType.single]: {
            ...betslip.bet[ticketType.single],
            amount: amounts[0],
            combinations: combinations[0],
            bonuses: calculatePercent(betslip.bonusAmount, amounts[0]),
          },
          [ticketType.multi]: {
            ...betslip.bet[ticketType.multi],
            amount: amounts[1],
            combinations: combinations[1],
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
                  <Singlebet
                    betslip={betslip}
                    game={game}
                    isCombination={isCombination}
                  />
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
              {isCombination && (
                <div className={style.row}>
                  <p>{t('combinations')}</p>
                  <span className={style.dots} />
                  <p>
                    <strong>{betslip.bet?.[active]?.combinations}</strong>
                  </p>
                </div>
              )}
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
                  <GameButton
                    classes={style.button}
                    onChange={() => handleDeleteTicket}
                    icon={'fa-solid fa-xmark'}
                  />
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default Betslip
