import classNames from 'classnames'

import style from './index.module.scss'

const Button = ({
  placeholder,
  type = 'button',
  styles = null,
  classes,
  onChange,
}) => {
  return (
    <button
      type={type}
      className={classNames(style.block, classes)}
      onClick={onChange}
      style={styles}
    >
      {placeholder}
    </button>
  )
}

export default Button
