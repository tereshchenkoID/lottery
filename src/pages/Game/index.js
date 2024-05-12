import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getData } from 'helpers/api'

import Games from 'modules/Games'
import Loader from 'components/Loader'

import style from './index.module.scss'
import KENO from './KENO'

const Game = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const { gameId } = useParams()
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getData(`game/${gameId}`).then(json => {
        setGame(json)
      }),
    ]).then(() => {
      setLoading(false)
    })
  }, [gameId])

  const getStart = type => {
    const date = new Date(game.time)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    if (type === 0) return `${hours}:${minutes}:${seconds}`
    if (type === 1) return `${minutes}:${seconds}`

    return `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`
  }

  return (
    <div className={style.block}>
      <Games />

      {loading ? (
        <Loader />
      ) : (
        <div
          className={style.content}
          style={{
            backgroundColor: game.color,
            color: game.font_color,
          }}
        >
          <div className={style.header}>
            <div className={style.info}>
              <div className={style.picture}>
                <img src={game.image} alt={game.name} loading={'lazy'} />
              </div>
              <div>
                <h6>{t(`games.${game.id}.title`)}</h6>
                {game.jackpots && (
                  <h4 className={style.jackpot}>
                    {t('jackpot')} -{' '}
                    <span>
                      {auth.account.currency.symbol} {game.jackpots}
                    </span>
                  </h4>
                )}
              </div>
            </div>
            <div className={style.meta}>
              <div className={style.id}># {game.round?.id}</div>
              <div className={style.time}>
                <FontAwesomeIcon
                  icon="fa-solid fa-clock"
                  className={style.icon}
                />
                {getStart(1)}
              </div>
            </div>
          </div>
          <div className={style.body}>
            <KENO data={game} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
