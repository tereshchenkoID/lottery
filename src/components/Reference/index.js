import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Reference = ({
  view = 'primary',
  placeholder,
  link,
  classes,
  icon = false,
  styles = null,
  isActive = false,
  onChange = () => {},
}) => {
  return (
    <Link
      to={link}
      rel="noreferrer"
      className={
        classNames(
          style.block, 
          style[view], 
          isActive && style.active,
          classes
        )
      }
      style={styles}
      onClick={onChange}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </Link>
  )
}

export default Reference
