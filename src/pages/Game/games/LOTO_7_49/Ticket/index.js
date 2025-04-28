import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { SPORTS_LOTTO_FACTORS } from 'constant/config'

import { setBetslip } from 'store/actions/betslipAction'

import Button from 'components/Button'

import classNames from 'classnames'

import style from './index.module.scss'
import Combination from 'modules/Combination'

const COUNT = {
  min: 7,
  max: 19,
  numbers: 49,
}

const Ticket = ({ betslip, game }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [selectedCount, setSelectedCount] = useState(0)
  const isActive = selectedCount >= COUNT.min
  const [numbers, setNumbers] = useState(
    Array.from({ length: COUNT.numbers }, (_, idx) => ({
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
      setSelectedCount(betslip?.tickets[idx]?.numbers?.length || 0)
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

  const activeFactor = useMemo(
    () => SPORTS_LOTTO_FACTORS.find(el => el.count === selectedCount),
    [game.id, selectedCount],
  )

  useEffect(() => {
    handleLoadNumbers(betslip.activeTicket)
  }, [betslip.activeTicket])

  return (
    <div className={classNames(style.block, isActive && style.active)}>
      <div className={style.meta}>
        <div className={style.info}>
          <h6>
            {t('ticket')}
            {betslip.activeTicket !== null &&
              ` #${betslip.tickets[betslip.activeTicket].id}`}
          </h6>
        </div>
        {betslip.activeTicket !== null && 
          <Button
            classes={['game', 'wide', 'md']}
            onChange={() => handleCloseTicket()}
            icon={'fa-solid fa-xmark'}
          />
        }
      </div>
      {activeFactor &&
        <Combination 
          stake={activeFactor?.factor * game.betCost} 
          combination={activeFactor?.factor}
        />
      }
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
            <Button
              classes={['game', 'wide', 'md']}
              placeholder={el.number}
              onChange={() => handleNumberClick(idx)}
              isActive={el.active}
              isDisabled={selectedCount === COUNT.max && !el.active}
            />
          </div>
        ))}
      </div>
      <Button
        classes={['game', 'wide', 'md']}
        placeholder={t('random')}
        onChange={() => handleRandomClick()}
        icon={'fa-solid fa-cube'}
      />
      <div className={style.actions}>
        <Button
          classes={['game', 'wide', 'md']}
          placeholder={t('reset')}
          onChange={() => handleResetClick()}
        />
        <Button
          classes={['game', 'wide', 'md']}
          placeholder={
            betslip.activeTicket !== null ? t('save') : t('add_stake')
          }
          isDisabled={!isActive}
          onChange={() => handlePlaceBet()}
        />
      </div>
    </div>
  )
}

export default Ticket
