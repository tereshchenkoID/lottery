import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getDate } from 'helpers/getDate'
import { getDateXDaysFrom } from 'helpers/getDateXDaysFrom'

import Button from 'components/Button'
import GeneralOverview from './GeneralOverview'
import DailySums from './DailySums'

import style from './index.module.scss'

const TABS = [
  'general_overview',
  'daily_sums',
  'settlement',
]

const Reports = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
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

  return (
    <div className={style.block}>
      <div className={style.tab}>
        {
          TABS.map((el, idx) =>
            <Button
              key={idx}
              view='alt'
              isActive={active === idx}
              placeholder={t(el)}
              classes={style.link}
              onChange={() => setActive(idx)}
            />
          )
        }
      </div>

      <div className={style.container}>
        {
          active === 0 &&
          <GeneralOverview 
            filter={filter} 
            handlePropsChange={handlePropsChange} 
          />
        }
        {
          active === 1 &&
          <DailySums 
            filter={filter} 
            handlePropsChange={handlePropsChange} 
          />
        }
      </div>
    </div>
  )
}

export default Reports
