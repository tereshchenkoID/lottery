import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Tab from 'components/Tab'
import List from './List'
import Form from './Form'

import style from './index.module.scss'

const TAB = ['players_list', 'add_player']

const components = {
  0: List,
  1: Form,
}

const Players = () => {
  const { t } = useTranslation()
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

export default Players