import classNames from 'classnames'

import style from './index.module.scss'

const Modal = ({ active, setActive, child }) => {

  return (
    <div
      className={
        classNames(
          style.block,
          active && style.active
        )
      }
    >
      <div
        className={style.shadow}
        onClick={() => {
          setActive(!active)
        }}
      />
      <div className={style.wrapper}>
        {child}
      </div>
    </div>
  )
}

export default Modal
