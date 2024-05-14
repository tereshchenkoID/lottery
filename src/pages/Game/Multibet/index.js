import { useDispatch, useSelector } from 'react-redux'

import { setBetslip } from 'store/actions/betslipAction'

import Stake from './Stake'

import style from './index.module.scss'

const Multibet = () => {
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)

  const handleStakeChange = (index, newValue) => {
    const updatedOptions = [...betslip?.bet]
    updatedOptions[index].value = newValue

    dispatch(
      setBetslip({
        ...betslip,
        bet: updatedOptions,
      }),
    )
  }

  return (
    <div className={style.block}>
      <div className={style.container}>
        {betslip?.bet?.map((el, idx) => (
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
