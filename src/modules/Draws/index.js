import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useWindowWidth } from 'context/WindowWidthContext'

import { BREAKPOINTS } from 'constant/config'

import Draw from './Draw'

import style from './index.module.scss'

const Draws = () => {
  const { draw } = useSelector(state => state.draw)
  const { windowWidth } = useWindowWidth()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(windowWidth < BREAKPOINTS.md)
  }, [windowWidth])

  if (active) 
    return false

  return (
    <div className={style.block}>
      {
        draw?.map((el, idx) =>
          <Draw
            key={idx}
            data={el}
          />
        )
      }
    </div>
  )
}

export default Draws