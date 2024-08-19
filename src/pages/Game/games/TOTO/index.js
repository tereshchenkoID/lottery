import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { setBetslip } from 'store/actions/betslipAction'
import { getData } from 'helpers/api'

import Button from 'components/Button'
import Match from './Match'

import style from './index.module.scss'

const TYPES = ['random', 'on_trend', 'against_trend', 'reset']

const TOTO = ({ auth, betslip, game, setGame }) => {
  // const dispatch = useDispatch()
  const { t } = useTranslation()
  // const [tickets, setTickets] = useState({})
  // const [update, setUpdate] = useState(false)
  const [selectedMatches, setSelectedMatches] = useState(game.matches)
  const [selectedType, setSelectedType] = useState(null)

  const toggleOutcomeStatus = type => {
    setSelectedMatches(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        let updatedOutcomes
        if (type === 0) {
          const randomIndex = Math.floor(Math.random() * match.outcomes.length)
          updatedOutcomes = match.outcomes.map((outcome, index) => ({
            ...outcome,
            s: index === randomIndex,
          }))
        } 
        else if (type === 1) {
          const maxD = Math.max(...match.outcomes.map(outcome => Number(outcome.d)))
          let foundMax = false
          updatedOutcomes = match.outcomes.map(outcome => {
            if (!foundMax && Number(outcome.d) === maxD) {
              foundMax = true
              return { ...outcome, s: true }
            } else {
              return { ...outcome, s: false }
            }
          })
        } 
        else if (type === 2) {
          const minD = Math.min(...match.outcomes.map(outcome => Number(outcome.d)))
          let foundMin = false
          updatedOutcomes = match.outcomes.map(outcome => {
            if (!foundMin && Number(outcome.d) === minD) {
              foundMin = true
              return { ...outcome, s: true }
            } else {
              return { ...outcome, s: false }
            }
          })
        } 
        else {
          updatedOutcomes = match.outcomes.map(outcome => ({ ...outcome, s: null }))
        }
        return {
          ...match,
          b_1: 0,
          b_2: 0,
          outcomes: updatedOutcomes,
        }
      })
      // setStake(type !== 3 ? updatedMatches : null)

      return updatedMatches
    })

    setSelectedType(type)
  }

  return (
    <div className={style.block}>
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
        {
          selectedMatches.map((el, idx) =>
            <Match
              key={idx}
              data={el}
              setData={setSelectedMatches}
              selectedType={selectedType}
            />
          )
        }
        <Button
          classes={['game', 'wide', 'md', style.stake]}
          placeholder={t('add_stake')}
          onChange={() => { }}
        />
      </div>
    </div>
  )
}

export default TOTO
