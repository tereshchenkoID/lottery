import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import GeneralOverview from './GeneralOverview'
import DailySums from './DailySums'

import style from './index.module.scss'

const TABS = [
  'general_overview',
  'daily_sums',
  'settlement',
]

const components = {
  0: GeneralOverview,
  1: DailySums,
};

const Reports = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const ActiveTab = components[active] || null;

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
        <ActiveTab />
      </div>
    </div>
  )
}

export default Reports
