import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const GameButton = ({
  type = 'button',
  placeholder,
  classes = null,
  onChange,
  styles,
  isActive = false,
  isDisabled = false,
  icon = null,
}) => {
  return (
    <button
      type={type}
      className={classNames(style.block, isActive && style.active, classes)}
      onClick={onChange}
      style={styles}
      disabled={isDisabled}
      aria-label={placeholder}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </button>
  )
}

export default GameButton
