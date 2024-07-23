import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { VOUCHER_STATUS, PRINT_STATUS } from 'constant/config'

import classNames from 'classnames'

import { getDate } from 'helpers/getDate'

import Button from 'components/Button'

import style from '../../index.module.scss'

const Row = ({ data }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const [isShow, isSetShow] = useState(false)
  const type = data.type === 1 ? 'withdraw' : 'deposit'

  const handleClick = () => {
    isSetShow(!isShow)
  }

  const maskedNumber = data.code ? data.code.toString().replace(/(\d{2})\d+(\d{2})/, '$1*******$2'): ''
  const paySystem = useMemo(() => auth.wallet.find(el => data.paysystemId === el.id), [auth.wallet, data.paysystemId])

  const handlePrint = () => {
    window.printAction(JSON.stringify(data), PRINT_STATUS.reprint_voucher_payout)
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
      <div className={style.cell}>{paySystem?.name}</div>
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
      <div className={style.cell}>{data.redimId ? data.redimId : ''}</div>
      <div className={style.cell}>
        <Button
          classes={['primary', 'sm']}
          placeholder={t('print')}
          onChange={() => handlePrint()}
        />
      </div>
    </div>
  )
}

export default Row