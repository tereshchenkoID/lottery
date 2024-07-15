import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getData } from 'helpers/api'

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
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState(0)
  const [active, setActive] = useState(0)
  const typeName = type === 1 ? 'withdraw' : 'deposit'

  const handleLoad = () => {
    getData('wallet/').then(json => {
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
        <div className={style.tab}>
          {
            TAB.map((el, idx) => (
              <Button
                key={idx}
                placeholder={t(el)}
                classes={['alt', style.button]}
                isActive={active === idx}
                onChange={() => setActive(idx)}
              />
            ))
          }
        </div>
      }
      {
        (type === 0 && active === 0) &&  
        <Deposit type={typeName} />
      }
      {
        (type === 1 && active === 0) &&  
        <Withdraw 
          type={typeName}
          data={data.voucher?.[0]}
        />
      }
      {
        (type !== 2 && active === 1) &&
        <Payment 
          type={typeName} 
          data={data.other}
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
