import { useTranslation } from 'react-i18next'

import Button from 'components/Button'

import style from './index.module.scss'

const Tab = ({ data, active, setActive }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      {
        data.map((el, idx) => (
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
  )
}

export default Tab