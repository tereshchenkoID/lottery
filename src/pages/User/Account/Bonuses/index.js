import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Bonuses = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Bonuses 
    </div>
  )
}

export default Bonuses
