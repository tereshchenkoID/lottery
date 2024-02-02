import React, { useState } from 'react'

import { timeframe } from 'constant/config'

import {
  Chart as ChartJS,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js'

import { getTimeframeFrom, getTimeframeTo } from 'helpers/getTimeframe'
import { convertOptions } from 'helpers/convertOptions'
import { getDate } from 'helpers/getDate'

import Debug from 'modules/Debug'
import Select from 'components/Select'
import Field from 'components/Field'
import Button from 'components/Button'
import Paper from 'components/Paper'
import GameMonitor from './GameMonitor'
import SalesMonitor from './SalesMonitor'
import SalesReport from './SalesReport'
import RtpControl from './RtpControl'

import style from './index.module.scss'
import { useTranslation } from 'react-i18next'

ChartJS.register(
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const Dashboard = () => {
  const { t } = useTranslation()

  const initialValue = {
    'date-from': getDate(new Date().setHours(0, 0, 0, 0), 'datetime-local'),
    'date-to': getDate(new Date(), 'datetime-local'),
    timeframe: '',
  }

  const [filter, setFilter] = useState(initialValue)

  const handleResetForm = () => {
    setFilter(initialValue)
  }

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = event => {
    event && event.preventDefault()
  }

  return (
    <div className={style.block}>
      <Paper headline={t('dashboard')} classes={['sm']}>
        <Debug data={filter} />
        <form onSubmit={handleSubmit}>
          <div className={style.filter}>
            <div>
              <Select
                placeholder={t('timeframe')}
                options={convertOptions(timeframe.TIMEFRAME)}
                data={filter.timeframe}
                onChange={value => {
                  handlePropsChange('timeframe', value)
                  handlePropsChange(
                    'date-from',
                    getTimeframeFrom(value, 'datetime-local'),
                  )
                  handlePropsChange(
                    'date-to',
                    getTimeframeTo(value, 'datetime-local'),
                  )
                }}
              />
            </div>
            <div>
              <Field
                type={'datetime-local'}
                placeholder={t('date_from')}
                data={filter['date-from']}
                onChange={value => handlePropsChange('date-from', value)}
              />
            </div>
            <div>
              <Field
                type={'datetime-local'}
                placeholder={t('date_to')}
                data={filter['date-to']}
                onChange={value => handlePropsChange('date-to', value)}
              />
            </div>
            <div />
          </div>
          <div className={style.actions}>
            <Button
              type={'submit'}
              classes={'primary'}
              placeholder={t('search')}
            />
            <Button
              type={'reset'}
              placeholder={t('cancel')}
              onChange={handleResetForm}
            />
          </div>
        </form>
      </Paper>
      <div className={style.grid}>
        <GameMonitor />
        <SalesReport />
        <SalesMonitor />
        <RtpControl />
      </div>
    </div>
  )
}

export default Dashboard
