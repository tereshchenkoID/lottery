import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Subscriptions = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Subscriptions 
    </div>
  )
}

export default Subscriptions