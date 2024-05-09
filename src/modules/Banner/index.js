import classNames from 'classnames'

import style from './index.module.scss'

const Banner = ({ data, classes = null }) => {
  return (
    <a href={data.link} className={classNames(style.block, classes)}>
      <img src={data.image} alt={data.alt} className={style.img} />
    </a>
  )
}

export default Banner
