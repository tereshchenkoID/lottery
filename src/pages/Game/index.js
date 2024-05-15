import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { ticketType, userType } from 'constant/config'

import { getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { setBetslip } from 'store/actions/betslipAction'

import Games from 'modules/Games'
import Loader from 'components/Loader'
import Multibet from './Multibet'
import Betslip from './Betslip'

import KENO from './KENO'

import style from './index.module.scss'

const Game = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { gameId } = useParams()
  const { auth } = useSelector(state => state.auth)
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getData(`game/${gameId}`).then(json => {
        setGame({
          ...json,
          bet: {
            single: [
              {
                name: 'factor',
                min: 1,
                max: 10,
                value: 1,
                type: 0,
              },
              {
                name: 'draw',
                min: 1,
                max: 50,
                value: 1,
                type: 0,
              },
            ],
            multi: [
              {
                name: 'tickets',
                min: 1,
                max: 300,
                value: 1,
                type: 0,
              },
              {
                name: 'factor',
                min: 1,
                max: 10,
                value: 1,
                type: 0,
              },
              {
                name: 'draws',
                min: 1,
                max: 50,
                value: 1,
                type: 0,
              },
              {
                name: 'numbers',
                min: 1,
                max: 8,
                value: 8,
                type: 1,
              },
            ],
          },
        })
      }),
    ]).then(() => {
      setLoading(false)
    })
  }, [gameId])

  useEffect(() => {
    dispatch(
      setBetslip({
        userId: auth.id,
        userType: userType.user,
        gameId: game?.id,
        amount: game?.betCost,
        amountStep: game?.betCost,
        type: active === 0 ? ticketType.single : ticketType.multi,
        activeTicket: null,
        tickets: [],
        odds: [],
        bet: active === 0 ? game?.bet?.single : game?.bet.multi,
      }),
    )
  }, [dispatch, auth.id, game, active])

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
                {active === 0 && <KENO game={game} />}
                {active === 1 && <Multibet game={game} />}
              </div>

              {active !== 2 && (
                <div className={style.column}>
                  <Betslip game={game} type={active} />
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
