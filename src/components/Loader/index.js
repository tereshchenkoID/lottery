import classNames from 'classnames'

import style from './index.module.scss'

const Loader = ({ type = 'content', theme }) => {
  return (
    <div
      className={classNames(style.block, style[type])}
      style={{
        backgroundColor: theme?.backgroundColor || 'rgba(255, 255, 255, 0.8)',
        color: theme?.color || 'var(--color-primary)',
      }}
    >
      <div className={style.item} />
    </div>
  )
}

export default Loader
