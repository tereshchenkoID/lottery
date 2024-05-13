import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { getData } from 'helpers/api'

import Games from 'modules/Games'
import Loader from 'components/Loader'
import Multibet from './Multibet'
import KENO from './KENO'

import style from './index.module.scss'

const Game = () => {
  const { t } = useTranslation()
  const { gameId } = useParams()
  const { auth } = useSelector(state => state.auth)
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

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

  const handleStakeChange = (index, newValue) => {
    const updatedOptions = [...game.multibet]
    updatedOptions[index].value = newValue
    setGame(prevState => ({
      ...prevState,
      multibet: updatedOptions,
    }))
  }

  return (
    <div className={style.block}>
      <Games />

      {loading ? (
        <Loader />
      ) : (
        <div className={style.content} style={{ ...game.skin }}>
          <div className={style.header}>
            <div className={style.info}>
              <div className={style.picture}>
                <img src={game.image} alt={game.name} loading={'lazy'} />
              </div>
              <div>
                <h6>{t(`games.${game.id}.title`)}</h6>
                {game.jackpots && (
                  <h4>
                    {t('jackpot')} -{' '}
                    <span>
                      {auth.account.currency.symbol} {game.jackpots}
                    </span>
                  </h4>
                )}
              </div>
            </div>
            <div className={style.meta}>
              <div>
                <FontAwesomeIcon
                  icon="fa-solid fa-ticket"
                  className={style.icon}
                />
                {game.round?.id}
              </div>
              <hr className={style.hr} />
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
            <div className={style.tab}>
              <button
                type="button"
                className={classNames(
                  style.button,
                  active === 0 && style.active,
                )}
                onClick={() => setActive(0)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon="fa-solid fa-ticket" />
                </span>
                <span>Tickets</span>
              </button>
              <button
                type="button"
                className={classNames(
                  style.button,
                  active === 1 && style.active,
                )}
                onClick={() => setActive(1)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon="fa-solid fa-sliders" />
                </span>
                <span>Multibet</span>
              </button>
              <button
                type="button"
                className={classNames(
                  style.button,
                  active === 2 && style.active,
                )}
                onClick={() => setActive(2)}
              >
                <span className={style.icon}>
                  <FontAwesomeIcon icon="fa-solid fa-folder" />
                </span>
                <span>Archive</span>
              </button>
            </div>
            <div className={style.toggle}>
              {active === 0 && <KENO data={game} />}
              {active === 1 && (
                <Multibet
                  data={game?.multibet}
                  handleStakeChange={handleStakeChange}
                />
              )}

              {active !== 2 && <div className={style.betslip}>1</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
