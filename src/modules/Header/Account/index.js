import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import style from './index.module.scss'

import Reference from 'components/Reference'
import Profile from './Profile'
import Currency from './Currency'

const Account = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <div className={style.block}>
      {
        auth.id 
          ? 
            <>
              <Currency />
              <Profile /> 
            </>
          : 
            <Reference link={NAVIGATION.login.link} placeholder={t(NAVIGATION.login.text)} />
      }
    </div>
  )
}

export default Account
