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
  const [code, setCode] = useState('')
  const [voucher, setVoucher] = useState(null)
  const [isPaid, setIsPain] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('code', code)

    postData('billing/voucher/validate/', formData).then(json => {
      if (json.code === "0") {
        setIsPain(false)
        setVoucher(json?.voucher)
        dispatch(
          setToastify({
            type: 'success',
            text: t('voucher_validate'),
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

  const handleWithdraw = () => {
    const formData = new FormData()
    formData.append('code', code)

    postData('billing/voucher/redeem/', formData).then(json => {
      if (json.code === "0") {
        const c = auth
        c.account.balance = json.account.balance
        c.account.bonus = json.account.bonus

        setVoucher(json?.voucher)
        setIsPain(true)
        setCode('')
        dispatch(setAuth(c))
        dispatch(
          setToastify({
            type: 'success',
            text: t('voucher_status.paid'),
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

  const handleCancel = () => {
    setCode('')
    setVoucher(null)
  }

  return (
    <>
      {
        voucher &&
        <>
          <VoucherBlock data={voucher} isPaid={isPaid} />
          {
            !isPaid &&
            <div className={style.actions}>
              <Button
                onChange={() => handleWithdraw()}
                placeholder={t('withdraw')}
              />
              <Button
                classes={['alt']}
                placeholder={t('cancel')}
                onChange={() => handleCancel()}
              />
            </div>
          }
        </>
      }
      <form onSubmit={handleSubmit} className={style.form}>
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
            placeholder={t('validate')}
            isDisabled={code === '' || code.length < 12}
          />
        </div>
      </form>
    </>
  )
}

export default Withdraw