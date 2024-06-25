import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Stocks = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Stocks 
    </div>
  )
}

export default Stocks