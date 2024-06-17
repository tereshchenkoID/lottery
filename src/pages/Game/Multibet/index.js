import { useDispatch } from 'react-redux'

import { TICKET_TYPE } from 'constant/config'

import { setBetslip } from 'store/actions/betslipAction'
import { getFactors } from 'helpers/getFactors'
import { calculateMultiplier } from 'helpers/calculateMultiplier'
import { calculatePercent } from 'helpers/calculatePercent'
import { calculateTotalFactorFromNumber } from 'helpers/calculateTotalFactorFromNumber'

import Stake from './Stake'

import style from './index.module.scss'

const Multibet = ({ betslip, game }) => {
  const dispatch = useDispatch()
  const bet = betslip?.bet?.[TICKET_TYPE.multi]
  const isCombination = bet.options.find(el => el.name === 'combinations')

  const handleStakeChange = (index, newValue) => {
    bet.options[index].value = newValue
    bet.amount = calculateMultiplier(bet.options) * game.betCost
    bet.bonuses = calculatePercent(betslip.bonusAmount, bet.amount)

    if (isCombination) {
      const c = calculateTotalFactorFromNumber(
        isCombination.value,
        getFactors(game.id),
      )?.factor

      const t = bet.options.find(el => el.name === 'tickets')?.value

      bet.combinations = c * t
      bet.amount *= c
      bet.bonuses *= c
    }

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          ...betslip.bet,
          [TICKET_TYPE.multi]: bet,
        },
      }),
    )
  }

  return (
    <div className={style.block}>
      <div className={style.container}>
        {betslip?.bet?.[TICKET_TYPE.multi]?.options?.map((el, idx) => (
          <Stake
            key={idx}
            data={el}
            index={idx}
            handleStakeChange={handleStakeChange}
          />
        ))}
      </div>
    </div>
  )
}

export default Multibet
