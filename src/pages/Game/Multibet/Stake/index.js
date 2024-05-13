import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'

import Range from 'components/Range'

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
      <h6 className={style.title}>{t(`multibet.${data.name}`)}:</h6>
      <div className={style.control}>
        <button
          type="button"
          className={classNames(
            style.button,
            data.value === data.min && style.disabled,
          )}
          onClick={() =>
            handleStakeChange(index, Math.max(data.min, data.value - 1))
          }
        >
          -
        </button>
        <input
          type="number"
          className={style.field}
          value={data.value}
          min={data.min}
          max={data.max}
          onChange={e => handleInputChange(e.currentTarget.value)}
        />
        <button
          type="button"
          className={classNames(
            style.button,
            data.value === data.max && style.disabled,
          )}
          onClick={() =>
            handleStakeChange(index, Math.min(data.max, data.value + 1))
          }
        >
          +
        </button>
      </div>
      <Range data={data} onChange={handleInputChange} />
    </div>
  )
}

export default Stake
