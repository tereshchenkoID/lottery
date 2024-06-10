import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Button = ({
  placeholder,
  type = 'button',
  styles = null,
  classes,
  icon,
  onChange,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={classNames(style.block, classes)}
      onClick={onChange}
      style={styles}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </button>
  )
}

export default Button
