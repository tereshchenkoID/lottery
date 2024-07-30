import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useWindowWidth } from 'context/WindowWidthContext'

import { BREAKPOINTS } from 'constant/config'

import Button from 'components/Button'
import Game from './Game'

import classNames from 'classnames'

import style from './index.module.scss'

const Games = () => {
  const { games } = useSelector(state => state.games)
  const [active, setActive] = useState(false)
  const [gameId, setGameId] = useState(null)
  const location = useLocation()
  const { windowWidth } = useWindowWidth()

  useEffect(() => {
    setActive(windowWidth > 1740)
  }, [windowWidth])

  useEffect(() => {
    const path = location.pathname
    if (path.includes('game')) {
      setGameId(path.replace('/game/', ''))
    } else {
      setGameId(null)
    }
  }, [location])

  return (
    <div 
      className={
        classNames(
          style.block, 
          active && style.active,
          windowWidth < BREAKPOINTS.xl && style.hide
        )
      }
    >
      <Button
        classes={['alt', style.toggle]}
        onChange={() => setActive(!active)}
        icon={'fa-solid fa-angles-right'}
      />
      {
        games?.map((el, idx) => (
          <Game 
            key={idx}
            data={el}
            gameId={gameId}
            toggle={active}
            setToggle={setActive}
          />
        ))
      }
    </div>
  )
}

export default Games
