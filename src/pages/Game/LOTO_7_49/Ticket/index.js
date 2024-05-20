import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { setBetslip } from 'store/actions/betslipAction'

import classNames from 'classnames'

import style from './index.module.scss'

const Ticket = ({ betslip, game, active, show, setShow }) => {
  const COUNT = {
    min: 7,
    max: 19,
    numbers: 49,
  }
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [selectedCount, setSelectedCount] = useState(0)
  const [numbers, setNumbers] = useState(
    Array.from({ length: COUNT.numbers }, (_, idx) => ({
      number: idx + 1,
      active: false,
    })),
  )

  const isActive = selectedCount >= 7

  const updateBetslip = numbers => {
    dispatch(
      setBetslip({
        ...betslip,
        odds: numbers,
      }),
    )
  }

  const activeNumbers = num => num.filter(el => el.active).map(el => el.number)

  const handleLoadNumbers = idx => {
    const n = betslip?.tickets[idx]?.numbers || 0

    if (n.length === 1 && n[0] > COUNT.numbers) {
      resetState()
    } else {
      const numbersSet = new Set(betslip?.tickets[idx]?.numbers)
      const numbersArray = Array.from({ length: 49 }, (_, idx) => ({
        number: idx + 1,
        active: numbersSet.has(idx + 1),
      }))

      setNumbers(numbersArray)
      setSelectedCount(betslip?.tickets[idx]?.numbers.length || 0)
    }
  }

  const handleNumberClick = numberIndex => {
    const updatedNumbers = [...numbers]
    if (updatedNumbers[numberIndex].active) {
      updatedNumbers[numberIndex].active = false
      setSelectedCount(prevCount => prevCount - 1)
    } else if (selectedCount < COUNT.max) {
      updatedNumbers[numberIndex].active = true
      setSelectedCount(prevCount => prevCount + 1)
    }
    setNumbers(updatedNumbers)
    updateBetslip(activeNumbers(updatedNumbers))
  }

  const handleRandomClick = () => {
    const updatedNumbers = [...numbers].map(num => ({ ...num, active: false }))
    const randomNumbers = updatedNumbers.filter(num => !num.active)
    const randomIndexes = []
    while (randomIndexes.length < COUNT.min) {
      const randomIndex = Math.floor(Math.random() * randomNumbers.length)
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex)
      }
    }
    randomIndexes.forEach(idx => {
      updatedNumbers[randomNumbers[idx].number - 1].active = true
    })
    setNumbers(updatedNumbers)
    setSelectedCount(COUNT.min)
    updateBetslip(activeNumbers(updatedNumbers))
  }

  const resetState = () => {
    setNumbers(numbers.map(num => ({ ...num, active: false })))
    setSelectedCount(0)
  }

  const handlePlaceBet = () => {
    let updatedTickets

    if (betslip.activeTicket !== null) {
      updatedTickets = [...betslip.tickets]
      updatedTickets[betslip.activeTicket] = {
        ...updatedTickets[betslip.activeTicket],
        numbers: betslip.odds,
      }
    } else {
      const newId = (betslip.tickets[betslip.tickets.length - 1]?.id || 0) + 1
      updatedTickets = [
        ...betslip.tickets,
        {
          id: newId,
          numbers: betslip.odds,
        },
      ]
    }

    dispatch(
      setBetslip({
        ...betslip,
        tickets: updatedTickets,
        activeTicket: null,
        odds: [],
      }),
    )
    resetState()
  }

  const handleResetClick = () => {
    resetState()
  }

  const handleCloseTicket = () => {
    dispatch(
      setBetslip({
        ...betslip,
        activeTicket: null,
      }),
    )
  }

  useEffect(() => {
    handleLoadNumbers(betslip.activeTicket)
  }, [betslip.activeTicket])

  return (
    <div className={classNames(style.block, isActive && style.active)}>
      <div className={style.meta}>
        <h6>
          {t('ticket')}
          {betslip.activeTicket !== null &&
            ` #${betslip.tickets[betslip.activeTicket].id}`}
        </h6>
        {betslip.activeTicket !== null && (
          <button className={style.button} onClick={() => handleCloseTicket()}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        )}
      </div>

      {isActive ? (
        <>
          <p>{t(`games.${game.id}.tooltip.1`)}</p>
          <div className={style.notification}>
            <strong>{t(`games.${game.id}.rules.1`)}</strong>
            <span className={classNames(style.icon, style.accent)}>
              <FontAwesomeIcon icon="fa-solid fa-check" />
            </span>
          </div>
        </>
      ) : (
        <div className={style.scale}>
          {Array.from({ length: COUNT.min }, (_, idx) => (
            <div
              key={idx}
              className={classNames(
                style.value,
                idx < selectedCount && style.active,
              )}
            />
          ))}
        </div>
      )}
      <div className={style.numbers}>
        {numbers.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <button
              type={'button'}
              className={classNames(
                style.button,
                style.wide,
                el.active && style.active,
                selectedCount === COUNT.max && !el.active && style.disabled,
              )}
              onClick={() => handleNumberClick(idx)}
            >
              {el.number}
            </button>
          </div>
        ))}
      </div>
      <button
        type={'button'}
        className={classNames(style.button, style.wide)}
        onClick={handleRandomClick}
      >
        <FontAwesomeIcon icon="fa-solid fa-cube" className={style.icon} />
        <span>{t('random')}</span>
      </button>
      <div className={style.actions}>
        <button
          type={'button'}
          className={classNames(style.button, style.wide)}
          onClick={handleResetClick}
        >
          <span>{t('reset')}</span>
        </button>
        <button
          type={'button'}
          className={classNames(
            style.button,
            style.wide,
            !isActive && style.disabled,
          )}
          onClick={() => handlePlaceBet()}
        >
          <span>
            {betslip.activeTicket !== null ? t('save') : t('add_stake')}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Ticket
