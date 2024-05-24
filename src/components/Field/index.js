import { useRef } from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Field = ({
  type,
  placeholder,
  data,
  onChange,
  classes = null,
  isRequired = false,
}) => {
  const inputRef = useRef(null)

  const onFocus = () => {
    inputRef.current.focus()
  }

  return (
    <div
      className={classNames(
        style.block,
        classes && classes.map(el => style[el]),
      )}
    >
      <input
        ref={inputRef}
        className={style.input}
        type={type}
        value={data}
        onChange={e => {
          onChange(e.currentTarget.value)
        }}
        required={isRequired}
      />
      <label className={style.label} onClick={onFocus}>
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
    </div>
  )
}

export default Field
