import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getData } from 'helpers/api'

import Button from 'components/Button'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import History from './History'

import style from './index.module.scss'

const ACTIONS = ['deposit', 'withdraw', 'transaction_history']

const Billing = ({ filter, handlePropsChange }) => {
  const { t } = useTranslation()
  const [data, setData] = useState(null)
  const [type, setType] = useState(0)
  const [loading, setLoading] = useState(true)
  const typeName = type === 1 ? 'withdraw' : 'deposit'

  const handleLoad = () => {
    getData('billing/').then(json => {
      setData(json)
      setLoading(false)
    })
  }

  useEffect(() => {
    handleLoad()
  }, [])

  if (loading)
    return false

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
                classes={['alt']}
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
          data={data.voucher?.[0]}
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
        <History />
      }  
    </div>
  )
}

export default Billing