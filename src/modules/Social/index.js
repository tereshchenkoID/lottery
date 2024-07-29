import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Social = () => {
  const { settings } = useSelector(state => state.settings)

  return (
    <div className={style.block}>
      {settings.social.map((el, idx) => (
        <a
          key={idx}
          className={style.link}
          href={el.link}
          target="_blank"
          rel="noreferrer"
          aria-label={el.icon}
        >
          <FontAwesomeIcon
            icon={`fa-brands fa-${el.icon}`}
            className={style.icon}
          />
        </a>
      ))}
    </div>
  )
}

export default Social
