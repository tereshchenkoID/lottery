import { useLocation } from 'react-router-dom'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Tab = ({ data }) => {
  const location = useLocation()
  const page = location.pathname

  return (
    <div className={style.block}>
      {
        data.map((el, idx) =>
          <Reference 
            key={idx}
            view='alt'
            link={el.link} 
            icon={el.icon}
            isActive={page === el.link}
            placeholder={el.name} 
            classes={style.link}
          />
        )
      }
    </div>
  )
}

export default Tab