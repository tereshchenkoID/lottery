import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Button = ({
  type = 'button',
  view = 'primary',
  placeholder,
  classes,
  onChange,
  styles = null,
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
          style[view],
          isActive && style.active,
          classes
        )
      }
      disabled={isDisabled}
      onClick={onChange}
      style={styles}
      aria-label={placeholder || 'Button'}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </button>
  )
}

export default Button
