import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { NAVIGATION } from 'constant/config'

import style from './index.module.scss'
import React from 'react'

const Breadcrumbs = ({ data, current = null }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const currentPath = location.pathname
  const navigationItem = Object.values(NAVIGATION).find(item => item.link === currentPath)

  return (
    <div className={style.block}>
      {
        data.map((el, idx) =>
          <React.Fragment key={idx}>
            <Link
              to={el.link}
              rel="noreferrer"
              className={style.link}
            >
              {t(el.text)}
            </Link>
            <span className={style.text}>/</span>
          </React.Fragment>
        )
      }
      {
        navigationItem && 
        <p className={style.text}>{t(navigationItem.text)}</p>
      }
      {
        current &&
        <p className={style.text}>{t(current.text)}</p>
      }
    </div>
  )
}

export default Breadcrumbs
