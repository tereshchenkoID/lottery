import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

import Button from 'components/Button'
import Create from './Create'

const TAB = ['create', 'history']

const Voucher = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  return (
    <div className={style.block}>
      <div className={style.tab}>
        {
          TAB.map((el, idx) => (
            <Button
              key={idx}
              placeholder={t(el)}
              classes={['alt', style.button]}
              isActive={active === idx}
              onChange={() => setActive(idx)}
            />
          ))
        }
      </div>
      {
        active === 0 &&
        <Create />
      }
    </div>
  )
}

export default Voucher