import { useTranslation } from 'react-i18next'

import { USER_VERIFY } from 'constant/config'

import { getDate } from 'helpers/getDate'

import Phone from 'components/Phone'
import Field from 'components/Field'
import Notification from 'components/Notification'

import style from '../index.module.scss'

const General = ({
  filter,
}) => {
  const { t } = useTranslation()
  const isVerify = filter.profile.isVerify === 3

  return (
    <form className={style.form}>
      <div className={style.grid}>
        <Notification
          text={t(`verify_status.${USER_VERIFY[filter.profile.isVerify]}`)}
          type={isVerify ? 'success' : 'error'}
        />
        <Field
          type={'text'}
          placeholder={t('name')}
          onChange={() => {}}
          data={filter.profile.name}
        />
        <Field
          type={'text'}
          placeholder={t('surname')}
          onChange={() => {}}
          data={filter.profile.surname}
        />
        <Field
          type={'text'}
          placeholder={t('username')}
          onChange={() => {}}
          data={filter.profile.username}
        />
        <Field
          type={'text'}
          placeholder={t('email')}
          onChange={() => {}}
          data={filter.profile.email}
        />
        <Phone
          data={filter.profile.phone} 
          onChange={() => {}}
        />
        <Field
          type={'date'}
          placeholder={t('birth_day')}
          data={filter.profile.date}
          onChange={() => {}}
          max={getDate(new Date(), 3)}
        />
      </div>
    </form>
  )
}

export default General