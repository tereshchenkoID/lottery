import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useWindowWidth } from 'context/WindowWidthContext'

import { BREAKPOINTS } from 'constant/config'

import Button from 'components/Button'

import classNames from 'classnames'

import style from './index.module.scss'

const Games = () => {
  const { t } = useTranslation()
  const { games } = useSelector(state => state.games)
  const { gameId } = useParams()
  const [active, setActive] = useState()
  const { windowWidth } = useWindowWidth()

  useEffect(() => {
    setActive(windowWidth > 1740)
  }, [windowWidth])

  if (windowWidth < BREAKPOINTS.xl)
    return false

  return (
    <div className={classNames(style.block, active && style.active)}>
      <Button
        classes={['alt', style.toggle]}
        onChange={() => setActive(!active)}
        icon={'fa-solid fa-angles-right'}
      />
      {
        games?.map((el, idx) => (
          <Link
            key={idx}
            to={`/game/${el.id}`}
            rel="noreferrer"
            className={
              classNames(
                style.item,
                Number(gameId) === el.id && style.active,
              )
            }
            onClick={() => setActive(false)}
          >
            <p className={style.picture}>
              <img src={el.image} alt={el.alt} loading={'lazy'} />
            </p>
            <p className={style.name}>{t(`games.${el.id}.title`)}</p>
          </Link>
        ))
      }
    </div>
  )
}

export default Games
