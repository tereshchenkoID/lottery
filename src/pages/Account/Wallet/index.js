import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Wallet = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Wallet 
    </div>
  )
}

export default Wallet
