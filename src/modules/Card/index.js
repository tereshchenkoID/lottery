import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GAME_STATUS, GAME_TIME } from 'constant/config'

import { useImageLoader } from 'hooks/useImageLoader'
import { getDifferent } from 'helpers/getDifferent'
import { convertFixed } from 'helpers/convertFixed'
import { getValueFormatted } from 'helpers/getValueFormatted'

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Card = ({ data, link = 'game' }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const loading = useImageLoader(data.image)
  const [time, setTime] = useState(getDifferent(data.time, t))

  const updateTime = useCallback(() => {
    setTime(getDifferent(data.time, t))
  }, [data.time, t])

  useEffect(() => {    
    if (data.video && (data.time - new Date().getTime()) <= GAME_TIME.START_TIMER) {
      const timer = setInterval(() => {
        const currentTime = data.time - new Date().getTime()
        updateTime()
        if (currentTime <= 0) {
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [data.video, data.time, updateTime])

  return (
    <Link 
      to={`/${link}/${data.id}`} 
      rel="noreferrer" 
      className={style.block}
    >
      {
        loading 
        ?
          <Skeleton />
        :
          <div 
            className={style.body}
            style={{
              backgroundColor: data.color,
              color: data.font_color,
            }}
          >
            <div className={style.picture}>
              <img
                src={data.image}
                alt={t(`games.${data.id}.alt`)}
                className={style.img}
                loading="lazy"
              />
            </div>
            {
              data.jackpots &&
              <div className={style.content}>
                <div className={style.title}>{t('prize')}</div>
                <h4 className={style.prize}>
                  {getValueFormatted(data.jackpots)}
                  {auth.account.currency.symbol}
                </h4>
              </div>
            }
            <div className={style.description}>
              {t(`games.${data.id}.description`)}
            </div>
            {
              data.time && 
              <div className={style.time}>
                {
                  data.status === GAME_STATUS.ANNOUNCEMENT
                    ?
                      <>
                        <FontAwesomeIcon icon="fa-solid fa-clock" />
                        <span>{time}</span>
                      </>
                    :
                      <div className={style.game}>
                        <FontAwesomeIcon icon="fa-solid fa-clock" />
                        <FontAwesomeIcon icon="fa-solid fa-cube" className={style.cube} />
                        <FontAwesomeIcon icon="fa-solid fa-cube" className={style.cube} />
                        <FontAwesomeIcon icon="fa-solid fa-cube" className={style.cube} />
                      </div>
                }
              </div>
            }
            <div className={style.action}>
              <span>{t('play')}</span>
              <span className={style.price}>
                {convertFixed(data.betCost, 0)} {auth.account.currency.symbol}
              </span>
            </div>
          </div>
      }
    </Link>
  )
}

export default Card
