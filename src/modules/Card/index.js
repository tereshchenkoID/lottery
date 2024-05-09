import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Card = ({ data, classes = null }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <a
      href={data.link}
      className={classNames(style.block, classes)}
      style={{
        backgroundColor: data.color,
      }}
    >
      <div className={style.picture}>
        <img src={data.image} alt={data.alt} className={style.img} />
      </div>
      <div className={style.content}>
        <div className={style.title}>{t('prize')}</div>
        <h4 className={style.prize}>
          {data.prize}
          {auth.account.currency.symbol}
        </h4>
      </div>
      <div className={style.time}>
        <FontAwesomeIcon icon="fa-solid fa-clock" />
        <span>{data.time}</span>
      </div>
      <div className={style.description}>{data.description}</div>
      <div className={style.action}>
        <span>{t('play')}</span>
        <span className={style.price}>
          {data.stake} {auth.account.currency.symbol}
        </span>
      </div>
    </a>
  )
}

export default Card
