import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { userType } from 'constant/config'

import { getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { setBetslip } from 'store/actions/betslipAction'

import Games from 'modules/Games'
import GameButton from 'modules/GameButton'
import Loader from 'components/Loader'
import Button from 'components/Button'
import Multibet from './Multibet'
import Betslip from './Betslip'

import style from './index.module.scss'

const BINGO = lazy(() => import('./games/BINGO'))
const KENO = lazy(() => import('./games/KENO'))
const LOTO_7_49 = lazy(() => import('./games/LOTO_7_49'))

const gameComponents = {
  1: BINGO,
  2: LOTO_7_49,
  3: KENO,
}

const getGames = (id, auth, betslip, game, setGame) => {
  const GameComponent = gameComponents[id]

  if (!GameComponent) {
    return <div className={style.empty}>Empty</div>
  }

  return (
    <Suspense fallback={<Loader />}>
      <GameComponent
        auth={auth}
        betslip={betslip}
        game={game}
        setGame={setGame}
      />
    </Suspense>
  )
}

const TABS = [
  {
    value: 0,
    text: 'tickets',
    icon: 'fa-ticket',
  },
  {
    value: 1,
    text: 'multi',
    icon: 'fa-sliders',
  },
  {
    value: 2,
    text: 'archive',
    icon: 'fa-folder',
  },
]

const Game = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { gameId } = useParams()
  const { auth } = useSelector(state => state.auth)
  const { betslip } = useSelector(state => state.betslip)
  const [game, setGame] = useState({})
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(false)

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
            type: active,
            bet: json?.bet,
            tickets: [],
            odds: [],
          }),
        )
      }),
    ]).then(() => {
      setLoading(false)
    })
  }, [gameId])

  const handleActive = idx => {
    setActive(idx)
    dispatch(
      setBetslip({
        ...betslip,
        type: idx,
      }),
    )
  }

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show])

  return (
    <div className={style.block} style={{ ...game.skin }}>
      <Games />

      {loading ? (
        <Loader />
      ) : (
        <div className={style.content}>
          {game.hasOwnProperty('bet') ? (
            <>
              <div
                className={classNames(style.shadow, show && style.active)}
                onClick={() => setShow(!show)}
              />
              <div className={style.betslip}>
                <Button
                  placeholder={`${t('place_bet')} ${betslip.bet?.[active]?.amount} ${auth.account.currency.symbol}`}
                  onChange={() => setShow(!show)}
                  styles={{ width: '100%' }}
                />
              </div>
              <div className={style.header}>
                <div className={style.info}>
                  <div className={style.picture}>
                    <img
                      src={game.image}
                      alt={t(`games.${game.id}.title`)}
                      loading={'lazy'}
                    />
                  </div>
                  <div>
                    <h6>{t(`games.${game.id}.title`)}</h6>
                    {game.jackpots && (
                      <h4>
                        {t('jackpot')} - {''}
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
                    <span>{game.round?.id}</span>
                  </div>
                  <hr className={style.hr} />
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-clock"
                      className={style.icon}
                    />
                    <span>{getDate(game?.time, 1)}</span>
                  </div>
                </div>
              </div>
              <div className={style.body}>
                <div className={style.tab}>
                  {TABS.map((el, idx) => (
                    <GameButton
                      key={idx}
                      placeholder={t(el.text)}
                      isActive={active === el.value}
                      onChange={() => handleActive(el.value)}
                      classes={style.button}
                      icon={`fa-solid ${el.icon}`}
                    />

                    // <button
                    //   key={idx}
                    //   type="button"
                    //   className={classNames(
                    //     style.button,
                    //     active === el.value && style.active,
                    //   )}
                    //   onClick={() => handleActive(el.value)}
                    // >
                    //   <span className={style.icon}>
                    //     <FontAwesomeIcon icon={`fa-solid ${el.icon}`} />
                    //   </span>
                    //   <span>{t(el.text)}</span>
                    // </button>
                  ))}
                </div>
                <div className={style.toggle}>
                  <div className={style.column}>
                    {active === 0 &&
                      getGames(gameId, auth, betslip, game, setGame)}
                    {active === 1 && <Multibet betslip={betslip} game={game} />}
                  </div>

                  {active !== 2 && (
                    <div className={style.column}>
                      <Betslip
                        auth={auth}
                        betslip={betslip}
                        game={game}
                        active={active}
                        show={show}
                        setShow={setShow}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className={style.empty}>Game not found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Game
