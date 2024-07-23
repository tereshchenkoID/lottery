import { useState } from 'react'

import Tab from 'components/Tab'
import GeneralOverview from './GeneralOverview'
import DailySums from './DailySums'
import Settlement from './Settlement'

import style from './index.module.scss'

const TAB = ['general_overview', 'daily_sums', 'settlement']

const components = {
  0: GeneralOverview,
  1: DailySums,
  2: Settlement,
}

const Reports = () => {
  const [active, setActive] = useState(0)
  const ActiveTab = components[active] || null

  return (
    <div className={style.block}>
      <Tab
        data={TAB}
        active={active}
        setActive={setActive}
      />
      <div className={style.container}>
        <ActiveTab />
      </div>
    </div>
  )
}

export default Reports
