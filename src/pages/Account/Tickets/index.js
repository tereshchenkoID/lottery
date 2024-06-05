import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Tickets = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Tickets 
    </div>
  )
}

export default Tickets
