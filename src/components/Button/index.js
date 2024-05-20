import classNames from 'classnames'

import style from './index.module.scss'

const Button = ({
  placeholder,
  type = 'button',
  styles = null,
  classes,
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
      {placeholder}
    </button>
  )
}

export default Button
