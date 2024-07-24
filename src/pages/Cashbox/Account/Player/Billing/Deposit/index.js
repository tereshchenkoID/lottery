import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { postData } from 'helpers/api'

import Button from 'components/Button'
import Field from 'components/Field'
import Notification from 'components/Notification'

import style from '../index.module.scss'

const Deposit = ({ type, data, filter, handlePropsChange }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const [amount, setAmount] = useState('')
  const min = data[type]?.min
  const max = data[type]?.max

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('userId', filter.profile.id)
    formData.append('amount', amount)

    postData('billing/deposit/', formData).then(json => {
      if (json.code === "0") {
        const c = auth
        c.account.balance = json.account.balance
        c.account.bonus = json.account.bonus

        setAmount('')
        dispatch(setAuth(c))
        handlePropsChange('billing.balance', json.user.balance)
        dispatch(
          setToastify({
            type: 'success',
            text: t('deposit_successful'),
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
        <div />
        <Button
          type={'submit'}
          placeholder={t(type)}
          isDisabled={amount === '' || amount < min || amount > max || amount > parseFloat(auth.account.balance)}
        />
      </div>
    </form>
  )
}

export default Deposit
