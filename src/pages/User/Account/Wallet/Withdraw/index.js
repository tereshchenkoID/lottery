import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { postData } from 'helpers/api'

import Notification from 'components/Notification'
import Button from 'components/Button'
import Field from 'components/Field'
import VoucherBlock from 'modules/VoucherBlock'

import style from '../index.module.scss'

const Withdraw = ({ type, data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const [amount, setAmount] = useState('')
  const [voucher, setVoucher] = useState(null)
  const min = data[type]?.min
  const max = data[type]?.max

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('amount', amount)

    postData('wallet/voucher/create/', formData).then(json => {
      if (json.code === "0") {
        const c = auth
        c.account.balance = json.account.balance
        c.account.bonus = json.account.bonus

        setVoucher(json?.voucher)
        setAmount('')
        dispatch(setAuth(c))
        dispatch(
          setToastify({
            type: 'success',
            text: t('voucher_notification'),
          }),
        )
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      {
        voucher &&
        <VoucherBlock data={voucher} />
      }
      <Notification 
        text={`${t(type)} ${t('amount')} ${t('min')}:${min}, ${t('max')}:${max}`} 
        type={'info'}
        classes={style.notification}
      />
      <div className={style.grid}>
        <Field
          type={'number'}
          placeholder={t('amount')}
          data={amount}
          onChange={value => setAmount(value)}
          isRequired={true}
        />
        <div className={style.numbers}>
          {
            data[type]?.quickAmount.map((el, idx) => 
              <Button
                key={idx}
                placeholder={`+${el} ${data.currency}`}
                classes={['alt', style.number]}
                onChange={() => setAmount(el)}
              />
            )
          }
        </div>
        <Button
          type={'submit'}
          placeholder={t('create')}
          isDisabled={amount === '' || amount < min || amount > max || amount > parseFloat(auth.account.balance)}
        />
      </div>
    </form>
  )
}

export default Withdraw
