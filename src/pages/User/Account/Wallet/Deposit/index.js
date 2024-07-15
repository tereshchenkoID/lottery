import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { postData } from 'helpers/api'

import Button from 'components/Button'
import Field from 'components/Field'
import Notification from 'components/Notification'
import VoucherBlock from 'modules/VoucherBlock'

import style from '../index.module.scss'

const Deposit = ({ type }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const [code, setCode] = useState('')
  const [voucher, setVoucher] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('code', code)

    postData('wallet/voucher/redeem/', formData).then(json => {
      if (json.code === "0") {
        const c = auth
        c.account.balance = json.account.balance
        c.account.bonus = json.account.bonus

        setVoucher(json?.voucher)
        setCode('')
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
        <VoucherBlock data={voucher} isPaid={true} />
      }
      <Notification 
        text={t('deposit_notification')} 
        type={'info'}
        classes={style.notification}
      />
      <div className={style.grid}>
        <Field
          type={'text'}
          placeholder={t('code')}
          data={code}
          onChange={value => setCode(value)}
          isRequired={true}
        />
        <div />
        <Button
          type={'submit'}
          placeholder={t(type)}
          isDisabled={code === '' && code.length < 11}
        />
      </div>
    </form>
  )
}

export default Deposit
