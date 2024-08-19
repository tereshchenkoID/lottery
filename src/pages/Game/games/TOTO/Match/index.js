import { getDate } from 'helpers/getDate'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'

import style from './index.module.scss'

const Match = ({ data, setData, selectedType, handleStake }) => {

  const handleActive = (matchId, outcomeId) => {
    setData(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        if (match.id === matchId) {
          const updatedOutcomes = match.outcomes.map(outcome =>
            outcome.id === outcomeId ? { ...outcome, s: !outcome.s } : outcome,
          )
          const max = updatedOutcomes.filter(outcome => outcome.s).length > 1

          return {
            ...match,
            b_1: max ? 0 : match.b_1,
            b_2: max ? 0 : match.b_2,
            outcomes: updatedOutcomes,
          }
        } else {
          return match
        }
      })

      handleStake(updatedMatches)

      return updatedMatches
    })
  }

  const handleBlock = (matchId, activeBlock, disabledBlock) => {
    setData(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        if (match.id === matchId) {
          const max = match.outcomes.filter(outcome => outcome.s)
          const id = max.length > 0 ? max[0].id : match.outcomes[0].id

          const updatedOutcomes = match.outcomes.map(outcome => {
            return { ...outcome, s: outcome.id === id }
          })

          return {
            ...match,
            outcomes: updatedOutcomes,
            [activeBlock]: !match[activeBlock] ? 1 : 0,
            [disabledBlock]: 0,
          }
        } else {
          return match
        }
      })

      handleStake(updatedMatches)

      return updatedMatches
    })
  }

  return (
    <div className={style.block}>
      <div className={style.info}>
        <p className={style.date}>{getDate(data.start)}</p>
        <div className={style.teams}>
          <p>{data.teams.home.name}</p>
          <p>{data.teams.away.name}</p>
        </div>
      </div>
      <div className={style.outcomes}>
        {
          data.outcomes.map((el, idx) =>
            <Button
              key={idx}
              classes={['game', 'wide', 'sm', style.odd]}
              placeholder={`${el.b}%`}
              isActive={el.s}
              onChange={() => handleActive(data.id, el.id)}
            />
          )
        }
        {
          (selectedType === 1 || selectedType === 2) &&
          data.outcomes.map((el, idx) =>
            <Button
              key={idx}
              classes={['game', 'wide', 'sm', 'disabled']}
              placeholder={`${el.d}%`}
              isDisabled={true}
              onChange={() => handleActive(data.id, el.id)}
            />
          )
        }
      </div>
      <div className={style.options}>
        <Checkbox
          classes={['game', style.checkbox]}
          data={data.b_1}
          onChange={() => handleBlock(data.id, 'b_1', 'b_2')}
        />
        <Checkbox
          classes={['game', style.checkbox]}
          data={data.b_2}
          onChange={() => handleBlock(data.id, 'b_2', 'b_1')}
        />
      </div>
    </div>
  )
}

export default Match
