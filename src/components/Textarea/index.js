import { useRef } from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Textarea = ({
  placeholder,
  data,
  onChange,
  classes = null,
  isRequired = false,
  isDisabled = false,
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
      <textarea
        ref={inputRef}
        className={style.input}
        onChange={e => {
          onChange(e.currentTarget.value)
        }}
        autoComplete={'off'}
        required={isRequired}
      >
        {data}
      </textarea>
      <label className={style.label} onClick={onFocus}>
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
    </div>
  )
}

export default Textarea
