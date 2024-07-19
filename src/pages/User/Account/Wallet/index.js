import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Tab from 'components/Tab'
import Button from 'components/Button'
import Deposit from './Deposit'
import Payment from './Payment'
import Withdraw from './Withdraw'
import History from './History'

import style from './index.module.scss'

const ACTIONS = ['deposit', 'withdraw', 'transaction_history']
const TAB = ['voucher', 'another_payement']

const Wallet = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const [type, setType] = useState(0)
  const [active, setActive] = useState(0)
  const typeName = type === 1 ? 'withdraw' : 'deposit'

  return (
    <div className={style.block}>
      <div className={style.preview}>
        <h4>{auth.account.balance} {auth.account.currency.symbol}</h4>
        <div className={style.actions}>
          {
            ACTIONS.map((el, idx) =>
              <Button
                key={idx}
                placeholder={t(el)}
                classes={['alt']}
                isActive={type === idx}
                onChange={() => setType(idx)}
              />
            )
          }
        </div>
      </div>
      {
        type !== 2 &&
        <Tab 
          data={TAB} 
          active={active} 
          setActive={setActive} 
        />
      }
      {
        (type === 0 && active === 0) &&  
        <Deposit type={typeName} />
      }
      {
        (type === 1 && active === 0) &&  
        <Withdraw 
          type={typeName}
          data={auth.wallet[0]}
        />
      }
      {
        (type !== 2 && active === 1) &&
        <Payment 
          type={typeName} 
          data={auth.wallet.slice(1, auth.wallet.length)}
        />
      }
      {
        (type === 2) && 
        <History />
      }
    </div>
  )
}

export default Wallet
