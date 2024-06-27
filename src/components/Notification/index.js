import classNames from 'classnames';

import style from './index.module.scss'

const Notification = ({ text, type }) => {

  return (
    <div 
      className={
        classNames(
          style.block,
          style[type]
        )
      }
    >
      <p className={style.text}>{text}</p>
    </div>
  )
}

export default Notification
