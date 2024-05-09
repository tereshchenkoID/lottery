import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Social = () => {
  const social = [
    {
      icon: 'fa-tiktok',
      link: '/',
    },
    {
      icon: 'fa-google',
      link: '/',
    },
    {
      icon: 'fa-telegram',
      link: '/',
    },
    {
      icon: 'fa-twitter',
      link: '/',
    },
  ]

  return (
    <div className={style.block}>
      {social.map((el, idx) => (
        <a
          key={idx}
          className={style.link}
          href={el.link}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={`fa-brands ${el.icon}`}
            className={style.icon}
          />
        </a>
      ))}
    </div>
  )
}

export default Social
