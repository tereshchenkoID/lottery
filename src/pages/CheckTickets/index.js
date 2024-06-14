import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const CheckTickets = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Check Tickets
    </div>
  )
}

export default CheckTickets
