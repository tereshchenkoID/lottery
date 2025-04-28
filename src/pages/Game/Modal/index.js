
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss'

const Modal = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.container}>
        <FontAwesomeIcon icon="fa-fas fa-spinner" spin size="3x"/>
        <h6>{t('stake.pending_title')}</h6>
        <p>{t('stake.pending_description')}</p>
      </div>
    </div>
  )
}

export default Modal
