import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Field from 'components/Field'
import Button from 'components/Button'

import style from '../index.module.scss'

const Billing = ({
  filter,
  handlePropsChange,
}) => {
  const { t } = useTranslation()
  const [data, setData] = useState('')
  const [code, setCode] = useState('')

  return (
    <>
      <h4>{t('balance')}: {filter.billing.balance}</h4>
      <form onSubmit={() => {}} className={style.form}>
        <div className={style.grid}>
          <Field
            type={'text'}
            placeholder={t('verification_code')}
            data={code}
            onChange={value => setCode(value)}
            isRequired={true}
          />
          <Button
            type={'submit'}
            placeholder={t('send')}
          />
        </div>
      </form>
      <form onSubmit={() => {}} className={style.form}>
        <div className={style.grid}>
          <Field
            type={'number'}
            placeholder={t('balance')}
            data={data}
            onChange={value => setData(value)}
            isRequired={true}
          />
          <div className={style.actions}>
            <Button
              type={'submit'}
              placeholder={t('deposit')}
            />
            <Button
              type={'submit'}
              placeholder={t('withdraw')}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default Billing