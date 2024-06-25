import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useAuth } from 'context/AuthContext'

import { STATUS_TYPE } from 'constant/config'

import Button from 'components/Button'

import style from './index.module.scss'

const EXCEPTION = ['0', '2']

const FilterStatus = ({ active, onChange }) => {
  const { t } = useTranslation()
  const { isCashbox } = useAuth()

  const filteredStatusTypes = useMemo(() => 
    Object.entries(STATUS_TYPE).filter(([key]) => 
      (!isCashbox && EXCEPTION.indexOf(key) === -1)
    ), [isCashbox]
  );

  return (
    <div className={style.block}>
      <Button
        placeholder={t(`ticket_status.all`)}
        classes={['alt', style.button]}
        isActive={active === -1}
        onChange={() => onChange('status', -1)}
      />
      {
        filteredStatusTypes?.map(([key, value]) => (
          <Button
            key={key}
            placeholder={t(`ticket_status.${value}`)}
            classes={['alt', style.button]}
            isActive={active === key}
            onChange={() => onChange('status', key)}
          />
        ))
      }
    </div>
  )
}

export default FilterStatus
