import { useSelector } from 'react-redux'

import { USER_TYPE, ROUTES_USER } from 'constant/config'

import classNames from 'classnames'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Currency = () => {
  const { auth } = useSelector(state => state.auth)
  const isCashbox = auth?.userType === USER_TYPE.cashbox

  return (
    <div className={style.block}>
      <Reference 
        view="alt"
        link={ROUTES_USER.wallet.link} 
        icon={ROUTES_USER.wallet.icon}
        classes={classNames(style.item, isCashbox && style.alt)}
        placeholder={`${auth.account.balance} ${auth.account.currency.symbol}`} 
      />
      {
        !isCashbox &&
        <>
          <hr className={style.hr} />
          <Reference 
            view="alt"
            link={ROUTES_USER.bonuses.link}
            icon={ROUTES_USER.bonuses.icon}
            classes={style.item}
            placeholder={`${auth.account.bonus}`} 
          />
        </>
      }
    </div>
  )
}

export default Currency