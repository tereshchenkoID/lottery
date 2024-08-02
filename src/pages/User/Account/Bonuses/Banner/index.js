import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { ROUTES_USER } from 'constant/config'

import { convertFixed } from 'helpers/convertFixed'

import Button from 'components/Button'

import style from './index.module.scss'

const Banner = ({
  data,
  link,
  size,
}) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const percentageDifference = (parseFloat(auth.account.bonus) / parseFloat(data.betCost)) * 100

  const styles = size === 'lg' ? {
    backgroundColor: data.color,
    color: data.font_color
  } : {}

  return (
    <Link
      to={link}
      rel="noreferrer"
      className={
        classNames(
          style.block,
          style[size],
        )
      }
      style={styles}
    >
      <img
        src={data.image}
        alt={data.alt}
        loading={'lazy'}
        className={style.img}
      />
      {
        size === 'sm'
          ?
          <div className={style.progress}>
            <span
              className={style.scale}
              style={{
                width: `${percentageDifference}%`
              }}
            />
            <span className={style.value}>
              {convertFixed(data.betCost, 0)}
              <FontAwesomeIcon icon={ROUTES_USER.bonuses.icon} />
            </span>
          </div>
          :
          <Button
            classes={['primary', 'wide', style.button]}
            placeholder={t('play')}
          />
      }
    </Link>
  )
}

export default Banner