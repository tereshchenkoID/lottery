import React from 'react'
import { useTranslation } from 'react-i18next'

import { getDate } from 'helpers/getDate'

import style from './index.module.scss'

const convertValue = (key, value) => {
  if (!value) {
    return '-'
  }
  else if (key.indexOf('date') !== -1) {
    return getDate(value)
  }
  else {
    return value
  }
}

export const Print = React.forwardRef((data, ref) => {
  const { t } = useTranslation()

  return (
    <div className={style.block} ref={ref}>
      <div className={style.title}>
        {/* {t('interface.settlement')} #{data.number} */}
      </div>
      {
        Object.entries(data.data).map(([key, value]) => (
          <div
            key={key}
            className={style.row}
          >
            <div className={style.cell}>{t(`reports.${key}`)}</div>
            <div className={style.cell}>
              <strong>
                {convertValue(key, value)}
              </strong>
            </div>
          </div>
        ))
      }
    </div>
  )
})
