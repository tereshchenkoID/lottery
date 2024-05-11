import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

import Reference from 'components/Reference'
import Currency from './Currency'
import Profile from './Profile'

const Account = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <div className={style.block}>
      {auth.id ? (
        <>
          <Currency />
          <Profile />
        </>
      ) : (
        <Reference link={'/login'} placeholder={t('menu_2')} />
      )}
    </div>
  )
}

export default Account
