import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { VOUCHER_STATUS } from 'constant/config'

import classNames from 'classnames'

import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'

import Button from 'components/Button'

import style from '../../index.module.scss'

const Row = ({ data, setData }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const [isShow, isSetShow] = useState(false)
  const type = data.type === 1 ? 'withdraw' : 'deposit'

  const handleClick = () => {
    isSetShow(!isShow)
  };

  const maskedNumber = data.code.toString().replace(/(\d{2})\d+(\d{2})/, '$1*******$2')

  const handleSubmit = e => {
    const formData = new FormData()
    formData.append('code', data.code)

    postData('wallet/voucher/cancel/', formData).then(json => {
      if (json.code === "0") {
        const c = auth
        c.account.balance = json.account.balance
        c.account.bonus = json.account.bonus

        setData(prevData => prevData.map(item => 
          item.id === data.id 
            ? 
              { 
                ...item, 
                status: 3, 
                redimDate: new Date().getTime() 
              } 
            : 
              item
        ))

        dispatch(setAuth(c))
        dispatch(
          setToastify({
            type: 'success',
            text: t('voucher_cancelled'),
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
    <div 
      className={
        classNames(
          style.row,
          data.status === 1 && style[type],
          style[t(`voucher_status.${VOUCHER_STATUS[data.status]}`).toLocaleLowerCase()]
        )
      }
    >
      <div className={style.cell}>{t(`voucher_status.${VOUCHER_STATUS[data.status]}`)}</div>
      <div 
        className={style.cell}
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        {isShow ? data.code : maskedNumber}
      </div>
      <div className={style.cell}>{t(type)}</div>
      <div className={style.cell}>{data.type === 1 ? '+' : '-'}{data.amount}</div>
      <div className={style.cell}>{getDate(data.date)}</div>
      <div className={style.cell}>{data.redimDate && getDate(data.redimDate)}</div>
      <div className={style.cell}>
        {
          data.status === 0 
          ?
            <Button
              onChange={() => handleSubmit()}
              classes={['primary', style.button]}
              placeholder={t('voucher_status.cancelled')}
            />
          :
            (data.redimId ? data.redimId : '')
        }
        </div>
    </div>
  )
}

export default Row