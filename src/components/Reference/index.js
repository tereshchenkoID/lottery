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
  isDisabled = false,
  isActive = false,
}) => {
  return (
    <Link
      to={link}
      rel="noreferrer"
      className={
        classNames(
          style.block, 
          isActive && style.active,
          isDisabled && style.disabled,
          classes && classes.map(el => style[el] || el),
        )
      }
      onClick={onChange}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {placeholder}
    </Link>
  )
}

export default Reference
