import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

import Range from 'modules/Range'
import Control from 'modules/Control'

const Stake = ({ data, index, handleStakeChange }) => {
  const { t } = useTranslation()

  const handleInputChange = value => {
    const newValue = parseInt(value, 10)
    if (!isNaN(newValue)) {
      const newValueInRange = Math.min(Math.max(newValue, data.min), data.max)
      handleStakeChange(index, newValueInRange)
    }
  }

  return (
    <div className={style.block}>
      <h6>{t(`multibet.${data.name}`)}:</h6>
      <Control type={'game'} data={data} index={index} onChange={handleStakeChange} />
      <Range  data={data} onChange={handleInputChange} />
    </div>
  )
}

export default Stake
