import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useImageLoader } from 'hooks/useImageLoader'
import { getDifferent } from 'helpers/getDifferent'
import { getValueFormatted } from 'helpers/getValueFormatted'

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return { r, g, b };
}

function lightenColor(hex, percent) {
  let { r, g, b } = hexToRgb(hex)

  r = Math.min(255, Math.floor(r + (r * percent / 100)))
  g = Math.min(255, Math.floor(g + (g * percent / 100)))
  b = Math.min(255, Math.floor(b + (b * percent / 100)))

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

const GameSmall = ({ data }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const loading = useImageLoader(data.image)

  return (
    <Link
      to={`/game/${data.id}`}
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
                background: `radial-gradient(121.18% 140.93% at 0 0, ${lightenColor(data.color, 20)} 0, ${data.color} 100%)`,
                color: data.font_color,
              }}
            >
              <div className={style.picture}>
                <img
                  src={data.image}
                  alt={t(`games.${data.id}.alt`)}
                  className={style.img}
                  loading={'lazy'}
                />
              </div>
              <div className={style.content}>
                {
                  data.jackpots && (
                    <>
                      <p className={style.title}>{t('prize')}</p>
                      <h6 className={style.prize}>
                        {getValueFormatted(data.jackpots)}
                        {auth.account.currency.symbol}
                      </h6>
                    </>
                  )
                }
                {
                  data.time && (
                    <div className={style.time}>
                      <FontAwesomeIcon icon="fa-solid fa-clock" />
                      <span>{getDifferent(data.time, t, auth?.account?.timezone?.code)}</span>
                    </div>
                  )
                }
              </div>
            </div>
      }
    </Link>
  )
}

export default GameSmall
