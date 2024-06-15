import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { getDateXDaysFrom } from 'helpers/getDateXDaysFrom'

import Button from 'components/Button'
import Field from 'components/Field'
import Loader from 'components/Loader'

import style from './index.module.scss'

const findMinMax = (data, field) => {
  const values = data.map(item => Number(item[field]))
  const min = Math.min(...values)
  const max = Math.max(...values)
  return { min, max }
}

const sumField = (data, field) => {
  return data.reduce((sum, item) => sum + Number(item[field]), 0)
}

const getPercent = (data, max) => {
  return (data / max) * 100
}

const profitScale = (el, data) => {
  const f = Math.abs(data.min) + data.max
  const f_max = getPercent(data.max, f)
  const f_min = getPercent(Math.abs(data.min), f)

  return el < 0 ? f_min : f_max
}

const profitPercent = (el, data) => {
  let a = el < 0 ? getPercent(el, Math.abs(data.min)) : getPercent(el, data.max)
  return Math.abs(a)
}

const DailySums = () => {
  const { t } = useTranslation()
  const [data, setData] = useState([])
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

  const tickets = useMemo(() => findMinMax(data, 'tickets'), [data])
  const profit = useMemo(() => findMinMax(data, 'profit'), [data])

  const handleLoad = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('dateFrom', filter.dateFrom)
    formData.append('dateTo', filter.dateTo)

    postData('reports/dailySums/', formData).then(json => {
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
          classes={style.search}
        />
      </form>

      <div className={style.container}>
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.cell}>
              <strong>{t('reports.date')}</strong>
            </div>
            <div className={style.cell}>
              <strong>{t('reports.tickets')}</strong>
            </div>
            <div className={style.cell}>
              <strong>{t('reports.profit')}</strong>
            </div>
          </div>
          {
            data?.map((el, idx) => (
              <div
                key={idx}
                className={style.row}
              >
                <div className={style.cell}>{getDate(el.date, 3)}</div>
                <div className={style.cell}>
                  {
                    el.tickets > 0 && (
                      <div className={classNames(style.scale, style.default)}>
                        <div
                          style={{
                            width: `${getPercent(el.tickets, tickets.max)}%`,
                          }}
                        />
                      </div>
                    )
                  }
                  <strong>{el.tickets}</strong>
                </div>
                <div className={style.cell}>
                  <div
                    className={
                      classNames(
                        style.scale, 
                        el.profit > 0 && style.up, 
                        el.profit < 0 && style.down
                      )
                    }
                    style={{
                      width: `${profitScale(el.profit, profit)}%`,
                    }}
                  >
                    <div
                      style={{
                        width: `${profitPercent(el.profit, profit)}%`,
                      }}
                    />
                  </div>
                  <strong>{el.profit}</strong>
                </div>
              </div>
            ))
          }
           <div className={style.row}>
            <div className={style.cell}>
              <strong>{t('reports.total')}</strong>
            </div>
            <div className={style.cell}>
              <strong>{sumField(data, 'tickets')}</strong>
            </div>
            <div className={style.cell}>
              <strong>{sumField(data, 'profit')}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailySums
