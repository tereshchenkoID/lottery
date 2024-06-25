import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { getDateXDaysFrom } from 'helpers/getDateXDaysFrom'

import Button from 'components/Button'
import Field from 'components/Field'
import Loader from 'components/Loader'

import style from './index.module.scss'

const GeneralOverview = () => {
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
    dateFrom: getDateXDaysFrom(new Date(), -30),
    dateTo: getDate(new Date(), 3)
  })

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleLoad = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('dateFrom', filter.dateFrom)
    formData.append('dateTo', filter.dateTo)

    postData('reports/generalOverview/', formData).then(json => {
      setData(json)
      setLoading(false)
    })
  }

  const handleSubmit = event => {
    event && event.preventDefault()
    handleLoad(0)
  }

  useEffect(() => {
    handleLoad(0)
  }, [])

  if (loading)
    return <Loader type={'inline'} />

  return (
    <div className={style.block}>
      <form className={style.form} onSubmit={handleSubmit}>
        <Field
          type={'date'}
          placeholder={t('date_from')}
          data={filter.dateFrom}
          onChange={value => handlePropsChange('dateFrom', value)}
        />
        <Field
          type={'date'}
          placeholder={t('date_to')}
          data={filter.dateTo}
          onChange={value => handlePropsChange('dateTo', value)}
        />
        <Button
          type={'submit'}
          placeholder={t('search')}
        />
      </form>

      <div className={style.container}>
        <div className={style.table}>
          {
            Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className={style.row}
              >
                <div className={style.cell}>{t(`reports.${key}`)}</div>
                <div className={style.cell}>
                  <strong>{value}</strong>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default GeneralOverview
