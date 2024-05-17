import { Link } from 'react-router-dom'

import classNames from 'classnames'

import style from './index.module.scss'

const Reference = ({
  placeholder,
  link,
  classes,
  styles = null,
  onChange = () => {},
}) => {
  return (
    <Link
      to={link}
      rel="noreferrer"
      className={classNames(style.block, classes)}
      style={styles}
      onClick={onChange}
    >
      {placeholder}
    </Link>
  )
}

export default Reference
