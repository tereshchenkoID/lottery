import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import style from './index.module.scss'

const Games = () => {
  const { t } = useTranslation()
  const { games } = useSelector(state => state.games)
  const { gameId } = useParams()
  const [active, setActive] = useState(false)

  return (
    <div className={classNames(style.block, active && style.active)}>
      <button
        className={style.toggle}
        aria-label="Toggle"
        onClick={() => setActive(!active)}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-angles-right"
          className={style.icon}
        />
      </button>
      {games.map((el, idx) => (
        <Link
          key={idx}
          to={`/game/${el.id}`}
          rel="noreferrer"
          className={classNames(
            style.item,
            Number(gameId) === el.id && style.active,
          )}
        >
          <p className={style.picture}>
            <img src={el.image} alt={el.alt} loading={'lazy'} />
          </p>
          <p className={style.name}> {t(`games.${el.id}.description`)}</p>
        </Link>
      ))}
    </div>
  )
}

export default Games
