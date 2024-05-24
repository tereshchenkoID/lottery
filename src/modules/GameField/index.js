import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const GameField = ({
  type,
  placeholder,
  data,
  onChange,
  isRequired = false,
  isDisabled = false,
  min = null,
  max = null,
}) => {
  const inputRef = useRef(null)

  const onFocus = () => {
    inputRef.current.focus()
  }

  return (
    <div className={classNames(style.block, isDisabled && style.disabled)}>
      <input
        ref={inputRef}
        className={style.input}
        type={type}
        value={data}
        onChange={e => {
          onChange(e.currentTarget.value)
        }}
        required={isRequired}
        min={min}
        max={max}
      />
      {(type === 'datetime-local' || type === 'date') && (
        <span className={style.icon}>
          <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
        </span>
      )}
      <label className={style.label} onClick={onFocus}>
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
    </div>
  )
}

export default GameField
