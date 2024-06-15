import classNames from 'classnames'

import style from './index.module.scss'

const Container = ({ children, classes }) => {
  return (
    <div className={classNames(style.block, classes)}>
      {children}
    </div>
  )
}

export default Container
