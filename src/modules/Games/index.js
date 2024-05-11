import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import style from './index.module.scss'

const Games = () => {
  const { games } = useSelector(state => state.games)
  const [active, setActive] = useState(false)

  return (
    <div className={classNames(style.block, active && style.active)}>
      <button className={style.toggle} onClick={() => setActive(!active)}>
        <FontAwesomeIcon
          icon="fa-solid fa-angles-right"
          className={style.icon}
        />
      </button>
      {games.map((el, idx) => (
        <Link key={idx} to={el.link} rel="noreferrer" className={style.item}>
          <p className={style.picture}>
            <img src={el.image} alt={el.alt} className={style.img} />
          </p>
          <p className={style.name}>{el.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default Games
