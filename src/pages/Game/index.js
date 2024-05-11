import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getData } from 'helpers/api'

import Games from 'modules/Games'
import Loader from 'components/Loader'

import style from './index.module.scss'

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
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
