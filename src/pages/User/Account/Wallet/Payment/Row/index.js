import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Row = ({ type, data }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.logo}>
        {
          data.icon &&
          <img src={data.icon} alt={data.name} />
        }
      </div>
      <div>
        <strong>{data.name}</strong>
        <p className={style.placeholder}>
          {t('min')}: <strong>{data[type]?.min}</strong> {data.currency},
          {' '}
          {t('max')}: <strong>{data[type]?.max}</strong> {data.currency}
        </p>
      </div>
    </div>
  )
}

export default Row