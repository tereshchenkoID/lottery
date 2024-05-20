import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Table = ({ numbers }) => {
  const { t } = useTranslation()
  return (
    <div className={style.block}>
      {numbers.map((el, idx) => (
        <div key={idx} className={style.row}>
          <p className={style.cell}>{el.count}</p>
          <p className={style.cell}>x {el.factor}</p>
        </div>
      ))}
    </div>
  )
}

export default Table
