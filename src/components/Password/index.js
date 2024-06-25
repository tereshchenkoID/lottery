import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import Field from 'components/Field'

import style from './index.module.scss'

const Password = ({
  placeholder,
  data,
  onChange,
  classes = null,
  isRequired = false,
  isDisabled = false,
}) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
        )
      }
    >
      <Field
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        data={data}
        classes={classes}
        onChange={onChange}
        isRequired={isRequired}
        isDisabled={isDisabled}
      />
      <button
        type={'button'}
        className={style.eye}
        onClick={() => setShow(!show)}
        aria-label={'Show password'}
      >
        <FontAwesomeIcon icon={`fa-solid ${show ? 'fa-eye' : 'fa-eye-slash'}`} />
      </button>
    </div>
  )
}

export default Password
