import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWindowWidth } from 'context/WindowWidthContext'

import { BREAKPOINTS } from 'constant/config'

import Button from 'components/Button'
import Game from './Game'

import classNames from 'classnames'

import style from './index.module.scss'

const Games = () => {
  const { games } = useSelector(state => state.games)
  const [active, setActive] = useState(true)
  const { windowWidth } = useWindowWidth()

  // useEffect(() => {
  //   setActive(windowWidth > 1740)
  // }, [windowWidth])

  // if (windowWidth < BREAKPOINTS.xl)
  //   return false

  return (
    <div className={classNames(style.block, active && style.active)}>
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
            toggle={active}
            setToggle={setActive}
          />
        ))
      }
    </div>
  )
}

export default Games
