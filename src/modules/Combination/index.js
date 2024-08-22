import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

const Combination = ({ stake, combination }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <div className={style.block}>
      {
        stake &&
        <>
          <h6 className={style.win}>{stake} {auth.account.currency.symbol}</h6>
          <hr className={style.hr} />
        </>
      }
      <div className={style.combination}>
        <strong className={style.amount}>{combination}</strong>
        {t('combinations')}
      </div>
    </div>
  )
}

export default Combination