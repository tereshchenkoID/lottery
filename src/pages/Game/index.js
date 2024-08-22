import { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import classNames from 'classnames'

import { setBetslip } from 'store/actions/betslipAction'
import { getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { getValueFormatted } from 'helpers/getValueFormatted'
import { overflowBody } from 'helpers/overflowBody'
import { getHexToRgba } from 'helpers/getHexToRgba'

import Button from 'components/Button'
import Reference from 'components/Reference'
import Skeleton from 'components/Skeleton'
import Empty from 'modules/Empty'
import Multibet from './Multibet'
import Betslip from './Betslip'
import Archive from './Archive'

import style from './index.module.scss'

const BINGO = lazy(() => import('./games/BINGO'))
const KENO = lazy(() => import('./games/KENO'))
const LOTO_7_49 = lazy(() => import('./games/LOTO_7_49'))
const TOTO = lazy(() => import('./games/TOTO'))
const INSTANT = lazy(() => import('./games/INSTANT'))

const gameComponents = {
  1: BINGO,
  2: LOTO_7_49,
  3: KENO,
  9: TOTO,
}

const getGames = (id, auth, betslip, game, setGame) => {
  const GameComponent = gameComponents[id]

  if (game.type === 2) {
    return <INSTANT
            auth={auth}
            betslip={betslip}
            game={game}
            setGame={setGame}
          />
  }

  if (!GameComponent) {
    return <Empty />
  }

  return (
    <GameComponent
      auth={auth}
      betslip={betslip}
      game={game}
      setGame={setGame}
    />
  )
}

const TABS = [
  {
    value: 0,
    text: 'tickets',
    icon: 'fa-solid fa-ticket',
  },
  {
    value: 1,
    text: 'multi',
    icon: 'fa-solid fa-sliders',
  },
  {
    value: 2,
    text: 'archive',
    icon: 'fa-solid fa-folder',
  },
]

const Game = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { gameId } = useParams()
  const { auth } = useSelector(state => state.auth)
  const { betslip } = useSelector(state => state.betslip)
  const [game, setGame] = useState({})
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleLoad = () => {
    getData(`game/${gameId}`).then(json => {
      if (!json) {
        navigate('/')
      }

      setGame(json)
      dispatch(
        setBetslip({
          ...betslip,
          type: active,
          userId: auth.id,
          gameId: json?.id,
          bonusAmount: json?.bonusAmount,
          bet: json?.bet,
          tickets: [],
          odds: [],
          activeTicket: null,
        }),
      )

      if(json?.hasOwnProperty('bet')) {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    })
  }

  useEffect(() => {
    setActive(0)
    handleLoad()
  }, [])

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
    overflowBody(show)
  }, [show])

  if (loading)
    return <Skeleton 
            styles={{
              borderRadius: '24px 24px 0 0',
              flexGrow: 1,
            }}
          />

  return (
    <>
      {
        game.background_image &&
        <div 
          className={style.decor}
          style={{
            backgroundImage: `url(${game.background_image})`
          }}
        />
      }
      <div 
        className={style.block} 
        style={{ 
          ...game.skin,
          '--game_color': getHexToRgba(game.skin['--game_color'], 0.9),
        }}
      >
        <div className={style.content}>
          {
            active !== 2 && (
              <>
                <div
                  className={classNames(style.shadow, show && style.active)}
                  onClick={() => setShow(!show)}
                />
                <div className={style.betslip}>
                  <Button
                    placeholder={`${t('place_bet')} ${betslip.bet?.[active]?.amount} ${auth.account.currency.symbol}`}
                    onChange={() => setShow(!show)}
                    classes={['primary', 'wide']}
                  />
                </div>
              </>
            )
          }
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
                {
                  game.jackpots &&
                  <h4>
                    {t('jackpot')} - {''}
                    <span>
                      {auth.account.currency.symbol}{' '}
                      {getValueFormatted(game.jackpots)}
                    </span>
                  </h4>
                }
                {
                  game.prize &&
                  <h4>
                    {t('prize')} - {''}
                    <span>
                      {auth.account.currency.symbol}{' '}
                      {getValueFormatted(game.prize)}
                    </span>
                  </h4>
                }
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
              {
                game?.time &&
                <>
                  <hr className={style.hr} />
                  <div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-clock"
                      className={style.icon}
                    />
                    <span>{getDate(game?.time, t)}</span>
                  </div>
                </>
              }
            </div>
          </div>
          <div className={style.body}>
            <div className={style.tab}>
              {
                TABS
                  .filter((_, idx) => game.type === 2 ? idx !== TABS.length - 1 : _)
                  .map((el, idx) => (
                    <Button
                      key={idx}
                      placeholder={t(el.text)}
                      icon={el.icon}
                      isActive={active === el.value}
                      onChange={() => handleActive(el.value)}
                      classes={['game', style.button]}
                    />
                  ))
              }
              <Reference
                link={'/'}
                placeholder={t('rule')}
                icon={'fa-solid fa-circle-info'}
                classes={['game', style.button]}
              />
            </div>
            <div className={style.toggle}>
              <div className={style.column}>
                {
                  game.banners?.length > 0 &&
                  <div className={style.banners}>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={16}
                      navigation={true}
                      keyboard={true}
                      pagination={{
                        clickable: true,
                      }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      modules={[
                        Autoplay,
                        Navigation,
                        Pagination,
                        Mousewheel,
                        Keyboard,
                      ]}
                      className="swiper-wide"
                    >
                      {
                        game.banners.map((el, idx) => (
                          <SwiperSlide key={idx}>
                            <img 
                              src={el} 
                              alt={`Image ${idx}}`} 
                              className={style.banner}
                            />
                          </SwiperSlide>
                        ))
                      }
                    </Swiper>
                  </div>
                }
                {active === 0 && getGames(gameId, auth, betslip, game, setGame)}
                {active === 1 && <Multibet betslip={betslip} game={game} />}
                {active === 2 && game.type !== 2 && <Archive betslip={betslip} game={game} />}
              </div>
              {
                active !== 2 && (
                  <div className={style.column}>
                    <Betslip
                      auth={auth}
                      betslip={betslip}
                      game={game}
                      active={active}
                      show={show}
                      setShow={setShow}
                      handleLoad={handleLoad}
                    />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Game
