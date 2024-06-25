import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Reference = ({
  link,
  placeholder,
  classes = ['primary'],
  onChange = () => {},
  icon = false,
  isActive = false,
  isDisabled = false,
}) => {
  return (
    <Link
      to={link}
      rel="noreferrer"
      className={
        classNames(
          style.block, 
          isActive && style.active,
          classes && classes.map(el => style[el] || el),
        )
      }
      disabled={isDisabled}
      onClick={onChange}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </Link>
  )
}

export default Reference
