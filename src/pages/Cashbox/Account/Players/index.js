import { useTranslation } from 'react-i18next'

import { ROUTES_CASHBOX } from 'constant/config'

import style from './index.module.scss'

const Players = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      {t(ROUTES_CASHBOX.players.text)}
    </div>
  )
}

export default Players