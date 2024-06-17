import { useTranslation } from 'react-i18next'

import { STATUS_TYPE } from 'constant/config'

import Button from 'components/Button'

import style from './index.module.scss'

const FilterStatus = ({ active, onChange }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <Button
        view='alt'
        placeholder={t(`ticket_status.all`)}
        classes={style.button}
        isActive={active === -1}
        onChange={() => onChange('status', -1)}
      />
      {
        Object.entries(STATUS_TYPE).map(([key, value]) => (
          <Button
            key={key}
            view='alt'
            placeholder={t(`ticket_status.${value}`)}
            classes={style.button}
            isActive={active === key}
            onChange={() => onChange('status', key)}
          />
        ))
      }
    </div>
  )
}

export default FilterStatus
