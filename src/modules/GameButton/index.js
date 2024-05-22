import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const GameButton = ({
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
      type={'button'}
      className={classNames(style.block, isActive && style.active, classes)}
      onClick={onChange}
      style={styles}
      disabled={isDisabled}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </button>
  )
}

export default GameButton
