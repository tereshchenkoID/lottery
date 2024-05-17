import { useDispatch } from 'react-redux'

import { ticketType } from 'constant/config'

import { setBetslip } from 'store/actions/betslipAction'
import { calculateMultiplier } from 'helpers/calculateMultiplier'
import { calculatePercent } from 'helpers/calculatePercent'

import Stake from './Stake'

import style from './index.module.scss'

const Multibet = ({ betslip, game }) => {
  const dispatch = useDispatch()

  const handleStakeChange = (index, newValue) => {
    const updatedOptions = betslip?.bet?.[ticketType.multi]
    updatedOptions.options[index].value = newValue
    updatedOptions.amount =
      calculateMultiplier(updatedOptions.options) * game.betCost
    updatedOptions.bonuses = calculatePercent(
      betslip.bonusAmount,
      updatedOptions.amount,
    )

    dispatch(
      setBetslip({
        ...betslip,
        bet: {
          ...betslip.bet,
          [ticketType.multi]: updatedOptions,
        },
      }),
    )
  }

  return (
    <div className={style.block}>
      <div className={style.container}>
        {betslip?.bet?.[ticketType.multi]?.options?.map((el, idx) => (
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
