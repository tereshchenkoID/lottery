import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const VoucherBlock = ({ data, isPaid }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.info}>
          <h6 className={style.title}>
            <span className={style.label}>{t('voucher')}:</span> 
            {data.code}
          </h6>
          <strong className={style.amount}>
            <span className={style.label}>{t('amount')}:</span> 
            {data.amount} {auth.account.currency.symbol}
          </strong>
          <p className={style.date}>
            <span className={style.label}>{t('expired_date')}:</span> 
            {data.expire}
          </p>
          {
            isPaid &&
            <h4 className={style.status}>{t('voucher_status.paid')}</h4>
          }
        </div> 
      </div>
    </div>
  )
}

export default VoucherBlock