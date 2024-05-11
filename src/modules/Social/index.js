import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Social = () => {
  const social = [
    {
      icon: 'fa-tiktok',
      text: 'Tiktok',
      link: '/',
    },
    {
      icon: 'fa-google',
      text: 'Google',
      link: '/',
    },
    {
      icon: 'fa-telegram',
      text: 'Telegram',
      link: '/',
    },
    {
      icon: 'fa-twitter',
      text: 'Twitter',
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
          aria-label={el.text}
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
