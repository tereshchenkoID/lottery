import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames';

import style from './index.module.scss'

const Tab = ({ data }) => {
  const location = useLocation()
  const page = location.pathname

  return (
    <div className={style.block}>
      {
        data.map((el, idx) =>
          <Link
            key={idx}
            to={el.link}
            className={classNames(style.link, page === el.link && style.active)}
          >
            <FontAwesomeIcon icon={el.icon} />
            {el.name}
          </Link>
        )
      }
    </div>
  )
}

export default Tab