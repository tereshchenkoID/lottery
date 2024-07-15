import classNames from 'classnames';

import style from './index.module.scss'

const Notification = ({ 
  text, 
  type, 
  classes = null
}) => {

  return (
    <div 
      className={
        classNames(
          style.block,
          style[type],
          classes
        )
      }
    >
      <p className={style.text}>{text}</p>
    </div>
  )
}

export default Notification
