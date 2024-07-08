import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { NAVIGATION } from 'constant/config'

import style from './index.module.scss'

const Breadcrumbs = ({
  data,
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const currentPath = location.pathname

  const navigationItem = Object.values(NAVIGATION).find(item => item.link === currentPath)

  return (
    <div className={style.block}>
      {
        data.map((el, idx) =>
          <Link
            key={idx}
            to={el.link}
            rel="noreferrer"
            className={style.link}
          >
            {t(el.text)}
          </Link>
        )
      }
      {
        navigationItem && 
        <>
          <span className={style.text}>/</span>
          <p className={style.text}>{t(navigationItem.text)}</p>
        </>
      }
    </div>
  )
}

export default Breadcrumbs
