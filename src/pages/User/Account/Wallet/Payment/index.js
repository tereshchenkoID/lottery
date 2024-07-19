import { useTranslation } from 'react-i18next'

import style from '../index.module.scss'

const Payment = ({ type, data }) => {
  const { t } = useTranslation()

  return (
    <div className={style.payments}>
      {
        data.map((el, idx) =>
          <div
            key={idx}
            className={style.payment}
          >
            <div className={style.logo}>
              {
                el.icon &&
                <img src={el.icon} alt={el.name} />
              }
            </div>
            <div>
              <strong>{el.name}</strong>
              <p className={style.placeholder}>
                {t('min')}: <strong>{el[type]?.min}</strong> {el.currency},
                {' '}
                {t('max')}: <strong>{el[type]?.max}</strong> {el.currency}
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Payment