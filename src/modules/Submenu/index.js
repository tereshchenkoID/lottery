import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Submenu = ({ data }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const page = location.pathname

  return (
    <div className={style.block}>
      {
        Object.keys(data).map((key, idx) => {
          const el = data[key];
          return (
            <Reference
              key={idx}
              classes={['alt', style.link]}
              link={el.link} 
              icon={el.icon}
              isActive={page === el.link}
              placeholder={t(el.text)}
            />
          );
        })
      }
    </div>
  )
}

export default Submenu