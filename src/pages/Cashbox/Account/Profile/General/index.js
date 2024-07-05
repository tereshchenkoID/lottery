import { useTranslation } from 'react-i18next'

import { getDate } from 'helpers/getDate'

import Phone from 'components/Phone'
import Field from 'components/Field'
import Button from 'components/Button'

import style from '../index.module.scss'

const General = ({
  filter,
  handlePropsChange,
  handleSubmit,
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.grid}>
        <Field
          type={'text'}
          placeholder={t('name')}
          data={filter.profile.name}
          onChange={value => handlePropsChange('profile.name', value)}
          isRequired={true}
          isDisabled={filter.profile.isVerify}
        />
        <Field
          type={'text'}
          placeholder={t('surname')}
          data={filter.profile.surname}
          onChange={value => handlePropsChange('profile.surname', value)}
          isRequired={true}
          isDisabled={filter.profile.isVerify}
        />
        <Field
          type={'text'}
          placeholder={t('username')}
          data={filter.profile.username}
          onChange={value => handlePropsChange('profile.username', value)}
          isRequired={true}
          isDisabled={true}
        />
        <Phone
          data={filter.profile.phone}
          onChange={value => handlePropsChange('profile.phone', value)}
          isRequired={true}
        />
        <Field
          type={'date'}
          placeholder={t('birth_day')}
          data={filter.profile.date}
          onChange={value => handlePropsChange('profile.date', value)}
          isRequired={true}
          max={getDate(new Date(), 3)}
        />
        <Button
          type={'submit'}
          placeholder={t('save')}
        />
      </div>
    </form>
  )
}

export default General