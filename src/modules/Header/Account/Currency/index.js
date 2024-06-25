import { useSelector } from 'react-redux'
import { useAuth } from 'context/AuthContext'

import { ROUTES_USER } from 'constant/config'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Currency = () => {
  const { auth } = useSelector(state => state.auth)
  const { isCashbox } = useAuth()

  return (
    <div className={style.block}>
      <Reference 
        link={ROUTES_USER.wallet.link} 
        icon={ROUTES_USER.wallet.icon}
        classes={['alt',  isCashbox && style.alt, style.item]}
        placeholder={`${auth.account.balance} ${auth.account.currency.symbol}`} 
      />
      {
        !isCashbox &&
        <>
          <hr className={style.hr} />
          <Reference 
            link={ROUTES_USER.bonuses.link}
            icon={ROUTES_USER.bonuses.icon}
            classes={['alt', style.item]}
            placeholder={`${auth.account.bonus}`} 
          />
        </>
      }
    </div>
  )
}

export default Currency