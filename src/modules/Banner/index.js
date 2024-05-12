import classNames from 'classnames'

import style from './index.module.scss'

const Banner = ({ data, classes = null, link }) => {
  return (
    <a
      href={link}
      rel="noreferrer"
      className={classNames(style.block, classes)}
    >
      <img src={data.image} alt={data.alt} loading={'lazy'} />
    </a>
  )
}

export default Banner
