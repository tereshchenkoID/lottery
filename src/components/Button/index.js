import classNames from 'classnames'

import style from './index.module.scss'

const Button = ({
  placeholder,
  type = 'button',
  classes = 'default',
  onChange,
}) => {
  return (
    <button
      type={type}
      className={classNames(style.block, style[classes])}
      onClick={onChange}
    >
      {placeholder}
    </button>
  )
}

export default Button
