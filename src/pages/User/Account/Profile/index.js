import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Profile = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      Profile 
    </div>
  )
}

export default Profile