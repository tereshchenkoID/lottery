import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Field = ({
  type,
  placeholder,
  data,
  onChange,
  classes = null,
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
    <div
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
          classes && classes.map(el => style[el]),
        )
      }
    >
      <input
        ref={inputRef}
        className={style.input}
        type={type}
        value={data}
        onChange={e => {
          onChange(e.currentTarget.value)
        }}
        autoComplete={'off'}
        required={isRequired}
        min={min}
        max={max}
      />
      {(type === 'datetime-local' || type === 'date') && (
        <button 
          type={'button'}
          className={style.icon}
        >
          <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
        </button>
      )}
      <label className={style.label} onClick={onFocus}>
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
    </div>
  )
}

export default Field
