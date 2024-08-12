import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import History from './History'

import style from './index.module.scss'

const ACTIONS = ['deposit', 'withdraw', 'transaction_history']

const Billing = ({ filter, handlePropsChange }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const [type, setType] = useState(0)
  const typeName = type === 1 ? 'withdraw' : 'deposit'

  return (
    <div className={style.block}>
      <div className={style.preview}>
        <h4>{filter.billing.balance} {filter.billing.currency}</h4>
        <div className={style.actions}>
          {
            ACTIONS.map((el, idx) =>
              <Button
                key={idx}
                placeholder={t(el)}
                classes={['alt', style.action]}
                isActive={type === idx}
                onChange={() => setType(idx)}
              />
            )
          }
        </div>
      </div>    
      {
        (type === 0) &&  
        <Deposit 
          type={typeName}
          data={auth.wallet[0]}
          filter={filter}
          handlePropsChange={handlePropsChange}
        />
      }
      {
        (type === 1) &&  
        <Withdraw />
      }
      {
        (type === 2) && 
        <History filter={filter} />
      }  
    </div>
  )
}

export default Billing