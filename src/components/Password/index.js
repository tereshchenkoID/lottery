import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Password = ({
  placeholder,
  data,
  onChange,
  classes = null,
  password = false,
  isRequired = false,
}) => {
  const [show, setShow] = useState(password)
  const inputRef = useRef(null)

  const onFocus = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    setShow(password)
  }, [password])

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
        type={show ? 'text' : 'password'}
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

      <button
        onClick={() => setShow(!show)}
        className={style.eye}
        type={'button'}
      >
        <FontAwesomeIcon icon={`fa-solid ${show ? 'fa-eye' : 'fa-eye-slash'}`} />
      </button>
    </div>
  )
}

export default Password
