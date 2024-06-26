import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import GeneralOverview from './GeneralOverview'
import DailySums from './DailySums'
import Settlement from './Settlement'

import style from './index.module.scss'

const TABS = [
  'general_overview',
  'daily_sums',
  'settlement',
]

const components = {
  0: GeneralOverview,
  1: DailySums,
  2: Settlement,
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
              isActive={active === idx}
              placeholder={t(el)}
              classes={['alt', style.link]}
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
