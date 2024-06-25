import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Button = ({
  type = 'button',
  placeholder,
  onChange = () => {},
  classes = ['primary'],
  icon = false,
  isDisabled = false,
  isActive = false
}) => {

  return (
    <button
      type={type}
      className={
        classNames(
          style.block,
          isActive && style.active,
          classes && classes.map(el => style[el] || el),
        )
      }
      disabled={isDisabled}
      onClick={onChange}
      aria-label={placeholder || 'Button'}
    >
      {icon && <FontAwesomeIcon icon={icon} className={style.icon} />}
      {placeholder}
    </button>
  )
}

export default Button
