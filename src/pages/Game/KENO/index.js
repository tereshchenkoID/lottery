import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { betType } from 'constant/config'

import { setBetslip } from 'store/actions/betslipAction'

import Tooltip from 'components/Tooltip'

import style from './index.module.scss'

const KENO = ({ game }) => {
  const COUNT = 8
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const { betslip } = useSelector(state => state.betslip)
  const [selectedType, setSelectedType] = useState(0)
  const [selectedCount, setSelectedCount] = useState(0)
  const [numbers, setNumbers] = useState(
    Array.from({ length: 80 }, (_, idx) => ({
      number: idx + 1,
      active: false,
    })),
  )

  const updateBetslip = numbers => {
    dispatch(
      setBetslip({
        ...betslip,
        odds: numbers,
      }),
    )
  }

  const handleNumberClick = numberIndex => {
    const updatedNumbers = [...numbers]
    if (updatedNumbers[numberIndex].active) {
      updatedNumbers[numberIndex].active = false
      setSelectedCount(prevCount => prevCount - 1)
    } else if (selectedCount < COUNT) {
      updatedNumbers[numberIndex].active = true
      setSelectedCount(prevCount => prevCount + 1)
    }
    setNumbers(updatedNumbers)
    setSelectedType(0)
    updateBetslip(activeNumbers(updatedNumbers))
  }

  const handleRandomClick = () => {
    const updatedNumbers = [...numbers].map(num => ({ ...num, active: false }))
    const randomNumbers = updatedNumbers.filter(num => !num.active)
    const randomIndexes = []
    while (randomIndexes.length < COUNT) {
      const randomIndex = Math.floor(Math.random() * randomNumbers.length)
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex)
      }
    }
    randomIndexes.forEach(idx => {
      updatedNumbers[randomNumbers[idx].number - 1].active = true
    })
    setNumbers(updatedNumbers)
    setSelectedCount(COUNT)
    setSelectedType(0)
    updateBetslip(activeNumbers(updatedNumbers))
  }

  const handleColumnClick = columnNumber => {
    const updatedNumbers = [...numbers].map(num => ({ ...num, active: false }))
    for (let i = columnNumber - 1; i < updatedNumbers.length; i += 10) {
      updatedNumbers[i].active = true
    }
    setNumbers(updatedNumbers)
    setSelectedCount(COUNT)
    setSelectedType(0)
    updateBetslip(activeNumbers(updatedNumbers))
  }

  const handleTypeClick = id => {
    const t = selectedType === id ? 0 : id
    setNumbers(numbers.map(num => ({ ...num, active: false })))
    setSelectedCount(0)
    setSelectedType(t)
    updateBetslip(t === 0 ? [] : [betType[id]])
  }

  const handleResetClick = () => {
    setNumbers(numbers.map(num => ({ ...num, active: false })))
    setSelectedCount(0)
    setSelectedType(0)
    updateBetslip([])
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
    setNumbers(numbers.map(num => ({ ...num, active: false })))
    setSelectedCount(0)
    setSelectedType(0)
  }

  const activeTips = useMemo(
    () =>
      game.odds.numbers
        .filter(market => Number(market.a[0]) === selectedCount)
        .sort((a, b) => b.b - a.b),
    [game, selectedCount],
  )

  const activeNumbers = num => num.filter(el => el.active).map(el => el.number)

  const handleLoadNumbers = idx => {
    const n = betslip?.tickets[idx]?.numbers
    let a = [...numbers]
    let r = []

    if (n) {
      if (n.length > 1) {
        const s = new Set(n)
        r = a.map(num => ({ ...num, active: s.has(idx + 1) }))
      } else {
        const s = () => {
          const key = Object.keys(betType).find(
            key => betType[key] === Number(betslip?.tickets[idx]?.numbers),
          )
          return key ? { key: [key], value: betType[key] } : undefined
        }
        r = s().value

        setSelectedType(s().key)
      }

      setNumbers(r)
    }
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
    <div
      className={classNames(
        style.block,
        (selectedCount === COUNT || selectedType !== 0) && style.active,
      )}
    >
      {betslip.activeTicket !== null && (
        <div className={style.meta}>
          <p>Ticket #{betslip.tickets[betslip.activeTicket].id}</p>
          <button onClick={() => handleCloseTicket()}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        </div>
      )}
      <h6 className={style.title}>
        {t('ticket_price')} - {game.betCost} {auth.account.currency.symbol}
      </h6>
      <div className={style.container}>
        <div className={style.left}>
          <Tooltip
            text={t(`games.${game.id}.rules.1`)}
            placeholder={t(`games.${game.id}.tooltip.1`)}
          />
          <p>{t(`games.${game.id}.rules.8`)}</p>
        </div>
        <div className={style.right}>
          <div className={style.numbers}>
            {Array.from({ length: 10 }).map((el, idx) => (
              <div className={style.column} key={idx}>
                <button
                  type={'button'}
                  className={style.button}
                  onClick={() => handleColumnClick(idx)}
                >
                  {++idx}
                </button>
                <FontAwesomeIcon
                  icon="fa-solid fa-caret-down"
                  className={style.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.left}>
          <Tooltip
            text={t(`games.${game.id}.rules.2`)}
            placeholder={t(`games.${game.id}.tooltip.2`)}
          />
          <p>{t(`games.${game.id}.rules.4`)}</p>

          {activeTips.length > 0 && (
            <div className={style.table}>
              <div className={style.row}>
                <div className={style.cell}>{t('guessed')}</div>
                <div className={style.cell}>
                  {t('winning')}, {auth.account.currency.symbol}
                </div>
              </div>
              {activeTips.map((el, idx) => (
                <div key={idx} className={style.row}>
                  <div className={style.cell}>{el.a[2]}</div>
                  <div className={style.cell}>{el.b}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.right}>
          <div className={style.numbers}>
            {numbers.map((el, idx) => (
              <button
                key={idx}
                type={'button'}
                className={classNames(
                  style.button,
                  el.active && style.active,
                  selectedCount === COUNT && !el.active && style.disabled,
                )}
                onClick={() => handleNumberClick(idx)}
              >
                {el.number}
              </button>
            ))}
          </div>
          <button
            type={'button'}
            className={style.button}
            onClick={handleRandomClick}
          >
            <FontAwesomeIcon icon="fa-solid fa-cube" className={style.icon} />
            <span>{t('random')}</span>
          </button>
          <div className={style.actions}>
            <button
              type={'button'}
              className={style.button}
              onClick={handleResetClick}
            >
              <span>{t('reset')}</span>
            </button>
            <button
              type={'button'}
              className={classNames(
                style.button,
                betslip?.odds?.length === 0 && style.disabled,
              )}
              onClick={() => handlePlaceBet()}
            >
              <span>{t('placebet')}</span>
            </button>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.left}>
          <Tooltip
            text={t(`games.${game.id}.rules.3`)}
            placeholder={t(`games.${game.id}.tooltip.3`)}
          />
          <p>{t(`games.${game.id}.rules.5`)}</p>
        </div>
        <div className={style.right}>
          <div className={style.actions}>
            <button
              type={'button'}
              className={classNames(
                style.button,
                selectedType === 1 && style.active,
              )}
              onClick={() => handleTypeClick(1)}
            >
              <span>{t('even')}</span>
            </button>
            <button
              type={'button'}
              className={classNames(
                style.button,
                selectedType === 2 && style.active,
              )}
              onClick={() => handleTypeClick(2)}
            >
              <span>{t('odd')}</span>
            </button>
            <button
              type={'button'}
              className={classNames(
                style.button,
                selectedType === 3 && style.active,
              )}
              onClick={() => handleTypeClick(3)}
            >
              <span>{t('equally')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KENO
