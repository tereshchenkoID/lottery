import { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWindowWidth } from 'context/WindowWidthContext'

import { GAME_STATUS, GAME_TIME } from 'constant/config'

import { updateDraw, removeDraw } from 'store/actions/drawAction'
import { setGames } from 'store/actions/gamesAction'
import { getDifferent } from 'helpers/getDifferent'

import classNames from 'classnames'

import style from './index.module.scss'

const Game = ({ data, toggle, gameId, setToggle }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { windowWidth } = useWindowWidth()
  const [time, setTime] = useState(getDifferent(data.time))
  const hasDispatched = useRef(false)
  const isShow = data.video?.hide === 0
  const isAnnouncement = data.status === GAME_STATUS.ANNOUNCEMENT

  const updateTime = useCallback(() => {
    const currentTime = data.time - new Date().getTime()
    setTime(getDifferent(data.time))

    if (isAnnouncement && isShow && currentTime <= GAME_TIME.START_ANNOUNCEMENT && currentTime > 0 && !hasDispatched.current) {
      dispatch(updateDraw(data))
      hasDispatched.current = true
    }

    if (currentTime <= 0) {
      dispatch(removeDraw(data.id))
      // dispatch(setGames())
      hasDispatched.current = false
    }
  }, [dispatch, data, isAnnouncement, isShow])

  useEffect(() => {
    if (data.video && (data.time - new Date().getTime()) <= GAME_TIME.START_TIMER) {
      const timer = setInterval(updateTime, 1000)
      return () => clearInterval(timer)
    }
  }, [data.video, data.time, updateTime])

  const handleClick = () => {
    if(!toggle || windowWidth < 1740) {
      setToggle(false)
    }
  }

  return (
    <Link
      to={`/game/${data.id}`}
      rel="noreferrer"
      className={
        classNames(
          style.block, 
          Number(gameId) === data.id && style.active,
          toggle && style.wide
        )
      }
      onClick={handleClick}
    >
      <p className={style.picture}>
        <img src={data.image} alt={data.alt} loading="lazy" />
      </p>
      <div className={style.info}>
        <p className={style.name}>{t(`games.${data.id}.title`)}</p>
        {data.video && <p className={style.time}>{time.days > 0 ? `${time.days} ${t('days')}` : time.time}</p>}
      </div>
    </Link>
  )
}

export default Game
