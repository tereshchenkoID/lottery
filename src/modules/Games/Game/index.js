import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { GAME_STATUS } from 'constant/config'

import { setDraw, removeDraw } from 'store/actions/drawAction'
import { setGames } from 'store/actions/gamesAction'
import { getDifferent } from 'helpers/getDifferent'

import classNames from 'classnames'

import style from './index.module.scss'

const Game = ({ data, toggle, setToggle }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { draw } = useSelector(state => state.draw)
  const [time, setTime] = useState(getDifferent(data.time, t))
  const hasDispatched = useRef(false)

  useEffect(() => {    
    if (data.video && (data.time - new Date().getTime()) <= 3600000) {
      const timer = setInterval(() => {
        const currentTime = data.time - new Date().getTime()
        setTime(getDifferent(data.time, t))

        if (data.video.hide === 0 && currentTime <= 10000 && currentTime > 0 && !hasDispatched.current && data.status === GAME_STATUS.ANNOUNCEMENT) {
          dispatch(setDraw([...draw, data]))
          hasDispatched.current = true
        }

        if (currentTime <= 0) {
          dispatch(removeDraw(data.id))
          dispatch(setGames())
          hasDispatched.current = false
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [data, dispatch])

  return (
    <Link
      to={`/game/${data.id}`}
      rel="noreferrer"
      className={
        classNames(
          style.block,
          toggle && style.wide,
          // Number(gameId) === data.id && style.active,
        )
      }
      onClick={() => setToggle(false)}
    >
      <p className={style.picture}>
        <img src={data.image} alt={data.alt} loading={'lazy'} />
      </p>
      <div className={style.info}>
        <p className={style.name}>{t(`games.${data.id}.title`)}</p>
        {
          data.video &&
          <>
            <p className={style.time}>{time}</p>
            <p>{data.status}</p>
            <p>{data.video.hide}</p>
          </>
        }
      </div>
    </Link>
  )
}

export default Game
