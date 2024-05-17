import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { userType } from 'constant/config'

import { getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { setBetslip } from 'store/actions/betslipAction'

import Games from 'modules/Games'
import Loader from 'components/Loader'
import Multibet from './Multibet'
import Betslip from './Betslip'

import KENO from './KENO'
import BINGO from './BINGO'

import style from './index.module.scss'

const getGames = (id, auth, betslip, game) => {
  switch (id) {
    case '1':
      return <BINGO auth={auth} betslip={betslip} game={game} />
    case '3':
      return <KENO auth={auth} betslip={betslip} game={game} />
    default:
      return <KENO auth={auth} betslip={betslip} game={game} />
  }
}

const Game = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { gameId } = useParams()
  const { auth } = useSelector(state => state.auth)
  const { betslip } = useSelector(state => state.betslip)
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getData(`game/${gameId}`).then(json => {
        setGame(json)

        dispatch(
          setBetslip({
            ...betslip,
            userId: auth.id,
            userType: userType.user,
            gameId: json?.id,
            bonusAmount: json?.bonusAmount,
            bet: json?.bet,
          }),
        )
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
                {getDate(game?.time, 1)}
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
                <span>{t('tickets')}</span>
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
                <span>{t('multi')}</span>
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
                <span>{t('archive')}</span>
              </button>
            </div>
            <div className={style.toggle}>
              <div className={style.column}>
                {active === 0 && getGames(gameId, auth, betslip, game)}
                {active === 1 && <Multibet betslip={betslip} game={game} />}
              </div>

              {active !== 2 && (
                <div className={style.column}>
                  <Betslip
                    auth={auth}
                    betslip={betslip}
                    game={game}
                    active={active}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
