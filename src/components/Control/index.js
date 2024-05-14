import classNames from 'classnames'

import style from './index.module.scss'

const Control = ({ data, index, onChange }) => {
  const handleInputChange = value => {
    const newValue = parseInt(value, 10)
    if (!isNaN(newValue)) {
      onChange(index, Math.min(Math.max(newValue, data.min), data.max))
    }
  }

  return (
    <div className={style.block}>
      <button
        type="button"
        className={classNames(
          style.button,
          data.value === data.min && style.disabled,
        )}
        onClick={() => onChange(index, Math.max(data.min, data.value - 1))}
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
        onClick={() => onChange(index, Math.min(data.max, data.value + 1))}
      >
        +
      </button>
    </div>
  )
}

export default Control
