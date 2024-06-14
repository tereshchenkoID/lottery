import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Settings = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Settings
    </div>
  )
}

export default Settings
