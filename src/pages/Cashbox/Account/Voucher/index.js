import { useState } from 'react'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

import Create from './Create'
import Payout from './Payout'
import History from './History'
import Tab from 'components/Tab'

const TAB = ['create', 'payout', 'history']

const Voucher = () => {
  const { auth } = useSelector(state => state.auth)
  const [active, setActive] = useState(0)

  return (
    <div className={style.block}>
      <Tab 
        data={TAB} 
        active={active} 
        setActive={setActive} 
      />
      {
        active === 0 &&
        <Create data={auth.wallet[0]}/>
      }
      {
        active === 1 &&
        <Payout />
      }
      {
        active === 2 &&
        <History />
      }
    </div>
  )
}

export default Voucher