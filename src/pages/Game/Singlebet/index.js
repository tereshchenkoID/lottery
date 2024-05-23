import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { ticketType } from 'constant/config'

import { setBetslip } from 'store/actions/betslipAction'
import { calculateMultiplier } from 'helpers/calculateMultiplier'
import { calculatePercent } from 'helpers/calculatePercent'
import { calculateTotalFactor } from 'helpers/calculateTotalFactor'
import { getFactors } from 'helpers/getFactors'

import GameControl from 'modules/GameControl'
import Tooltip from 'components/Tooltip'

import style from './index.module.scss'

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

const Singlebet = ({ betslip, game, isCombination }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const bet = betslip?.bet?.[ticketType.single]

  const handleStakeChange = (index, newValue) => {
    bet.options[index].value = newValue
    bet.amount =
      calculateMultiplier(bet.options) *
      game.betCost *
      (isCombination ? 1 : betslip.tickets?.length)
    bet.bonuses = calculatePercent(betslip.bonusAmount, bet.amount)

    if (isCombination) {
      const c = calculateTotalFactor(betslip.tickets, getFactors(game.id))

      bet.combinations = c
      bet.amount *= c
      bet.bonuses *= c
    }

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          ...betslip.bet,
          [ticketType.single]: bet,
        },
      }),
    )
  }

  return (
    <div className={style.block}>
      <div className={style.ticket}>
        {betslip.bet?.[ticketType.single]?.options?.map((el, idx) => (
          <div key={idx} className={style.row}>
            <Tooltip
              text={t(RULES[el.name]?.text)}
              placeholder={t(RULES[el.name]?.placeholder)}
            />
            <GameControl data={el} index={idx} onChange={handleStakeChange} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Singlebet
