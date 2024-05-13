import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Betslip = ({ stakes }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.empty}>
        <div className={style.icon}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </div>
        <p>{t('place_bet')}</p>
      </div>
    </div>
  )
}

export default Betslip
