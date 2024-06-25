import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Promocodes = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Promocodes 
    </div>
  )
}

export default Promocodes