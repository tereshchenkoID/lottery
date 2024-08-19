import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { setBetslip } from 'store/actions/betslipAction'

import Button from 'components/Button'
import Match from './Match'

import style from './index.module.scss'

const TYPES = ['random', 'on_trend', 'against_trend', 'reset']
const BLOCKS = {
  1: [3, 1],
  2: [5, 9],
  3: [7, 19],
  4: [9, 33],
  5: [11, 51],
  6: [13, 73],
  7: [15, 99],
  8: [17, 129],
  9: [19, 163],
  10: [21, 201],
  11: [23, 243],
  12: [25, 289],
}

const TOTO = ({ auth, betslip, game }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [stake, setStake] = useState(0)
  const [selectedMatches, setSelectedMatches] = useState(game.matches)
  const [selectedType, setSelectedType] = useState(null)

  const toggleOutcomeStatus = type => {
    setSelectedMatches(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        let selectedOutcomeIndex
        let criteria
  
        if (type === 0) {
          selectedOutcomeIndex = Math.floor(Math.random() * match.outcomes.length)
        } else if (type === 1) {
          criteria = Math.max(...match.outcomes.map(outcome => Number(outcome.d)))
        } else if (type === 2) {
          criteria = Math.min(...match.outcomes.map(outcome => Number(outcome.d)))
        }
  
        const updatedOutcomes = match.outcomes.map((outcome, index) => ({
          ...outcome,
          s: type === 3 ? null : (
            type === 0 ? index === selectedOutcomeIndex : Number(outcome.d) === criteria && !selectedOutcomeIndex ? (selectedOutcomeIndex = index, true) : false
          )
        }))
  
        return {
          ...match,
          b_1: 0,
          b_2: 0,
          outcomes: updatedOutcomes,
        }
      })
  
      handleStake(type !== 3 ? updatedMatches : null)
      return updatedMatches
    })
  
    setSelectedType(type)
  }
  
  const calculateBetFromOutcomes = matches => {
    let betAmount = 5
    const allOutcomesSelected = matches?.every(match => match.outcomes.some(outcome => outcome.s))
  
    if (!allOutcomesSelected) {
      return 0
    }
  
    matches?.forEach(match => {
      const selectedOutcomes = match.outcomes.filter(outcome => outcome.s).length
      betAmount *= selectedOutcomes > 1 ? selectedOutcomes : 1
    })
  
    const blockCounts = ['b_1', 'b_2'].reduce((counts, blockType) => {
      counts[blockType] = matches?.filter(match => match[blockType]).length
      return counts
    }, {})
  
    Object.keys(blockCounts).forEach(blockType => {
      const count = blockCounts[blockType]
      if (count > 0) {
        const multiplier = BLOCKS[count][blockType === 'b_1' ? 0 : 1]
        betAmount *= multiplier
      }
    })
  
    return betAmount
  }

  const handleStake = (stakes) => {
    setStake(calculateBetFromOutcomes(stakes))
  }

  const handleReset = () => {
    setSelectedMatches(
      game.matches.map(match => ({
        ...match,
        outcomes: match.outcomes.map(outcome => ({
          ...outcome,
          s: false,
        })),
        b_1: 0,
        b_2: 0,
      }))
    )
    setSelectedType(null)
  }

  const handleData = () => {
    return selectedMatches.reduce((result, match, matchIndex) => {
      result.b1[matchIndex] = match.b_1
      result.b2[matchIndex] = match.b_2
  
      result.stake[matchIndex] = match.outcomes
        .reduce((acc, outcome, outcomeIndex) => {
          if (outcome.s) {
            acc.push(outcomeIndex)
          }
          return acc
        }, [])
        .join('')
  
      return result
    }, { stake: [], b1: [], b2: [] })
  }
  
  const handlePlaceBet = () => {
    const data = handleData()
    const updatedTickets = betslip.activeTicket !== null 
      ? betslip.tickets.map((ticket, index) =>
          index === betslip.activeTicket
            ? { ...ticket, ...data }
            : ticket
        )
      : [
          ...betslip.tickets,
          { id: (betslip.tickets[betslip.tickets.length - 1]?.id || 0) + 1, ...data },
        ]
  
    dispatch(
      setBetslip({
        ...betslip,
        tickets: updatedTickets,
        activeTicket: null,
      })
    )
  
    handleReset()
  }

  const handleCloseTicket = () => {
    dispatch(
      setBetslip({
        ...betslip,
        activeTicket: null,
      }),
    )
  }
  
  const handleLoad = (id) => {
    const n = betslip?.tickets[id]
    
    if(n) {
      const a = game.matches.map((match, matchIndex) => {
        const updatedOutcomes = match.outcomes.map((outcome, outcomeIndex) => ({
          ...outcome,
          s: n.stake[matchIndex].includes(outcomeIndex),
        }))
      
        return {
          ...match,
          outcomes: updatedOutcomes,
          b_1: n.b1[matchIndex],
          b_2: n.b2[matchIndex],
        }
      })

      setSelectedMatches(a)
    }
    else {
      handleReset()
    }
  }

  const hasActive = () => {
    return selectedMatches.every(match =>
      match.outcomes.some(outcome => outcome.s === true)
    )
  }

  useEffect(() => {
    handleLoad(betslip.activeTicket)
  }, [betslip.activeTicket])

  return (
    <div
      className={
        classNames(
          style.block,
          hasActive() && style.active,
        )
      }
    >
      {betslip.activeTicket !== null && (
        <div className={style.meta}>
          <h6>
            {t('ticket')} #{betslip.tickets[betslip.activeTicket].id}
          </h6>
          <Button
            classes={['game', 'wide', 'md']}
            onChange={() => handleCloseTicket()}
            icon={'fa-solid fa-xmark'}
          />
        </div>
      )}
      <h6 className={style.title}>
        {t('ticket_price')} - {game.betCost} {auth.account.currency.symbol}
      </h6>
      <div className={style.container}>
        <div className={style.actions}>
          {
            TYPES.map((el, idx) =>
              <Button
                key={idx}
                classes={['game', 'wide', 'md', style.action]}
                placeholder={t(el)}
                isActive={selectedType === idx && selectedType !== 3}
                onChange={() => toggleOutcomeStatus(idx)}
              />
            )
          }
        </div>
      </div>
      <div className={style.container}>
        <div className={style.head}>
          <div />
          <div>1</div>
          <div>X</div>
          <div>2</div>
          <div>B1</div>
          <div>B2</div>
        </div>
        {
          selectedMatches?.map((el, idx) =>
            <Match
              key={idx}
              data={el}
              setData={setSelectedMatches}
              selectedType={selectedType}
              handleStake={handleStake}
            />
          )
        }
        <Button
          classes={['game', 'wide', 'md', style.stake]}
          placeholder={betslip.activeTicket !== null ? t('save') : t('add_stake')}
          isDisabled={!hasActive()}
          onChange={handlePlaceBet}
        />
      </div>
    </div>
  )
}

export default TOTO
