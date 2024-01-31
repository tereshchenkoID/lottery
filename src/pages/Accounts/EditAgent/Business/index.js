import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { service, ticket } from 'constant/config'

import { convertOptions } from 'helpers/convertOptions'

import Button from 'components/Button'
import Select from 'components/Select'
import Debug from 'modules/Debug'

import style from './index.module.scss'

const Business = ({ data, inherit, setUpdate }) => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState(data.business)
  const isDisabled = inherit === '1'

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleResetForm = () => {
    setFilter(data.business)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', data.id)
    formData.append('username', data.username)
    formData.append('inherit', inherit)

    Object.entries(filter).map(([key, value]) => {
      formData.append(key, value)
      return true
    })
  }

  return (
    <>
      <Debug data={filter} />
      <form className={style.block} onSubmit={handleSubmit}>
        {Object.entries(filter).map(([key, value]) => (
          <Select
            key={key}
            placeholder={t(key)}
            options={convertOptions(
              key === 'ticket_payout' ? ticket.PAYOUT : service.ENABLE_DISABLE,
            )}
            data={Number(value)}
            onChange={value => handlePropsChange(key, value)}
            classes={[isDisabled && 'disabled']}
          />
        ))}
        <div className={style.actions}>
          <Button type={'submit'} classes={'primary'} placeholder={t('save')} />
          <Button
            type={'reset'}
            placeholder={t('cancel')}
            onChange={handleResetForm}
          />
        </div>
      </form>
    </>
  )
}

export default Business
