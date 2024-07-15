import { useTranslation } from 'react-i18next'

import { USER_VERIFY } from 'constant/config'

import Field from 'components/Field'
import Button from 'components/Button'
import Uploader from 'components/Uploader'
import Select from 'components/Select'
import Notification from 'components/Notification'

import style from '../index.module.scss'

const Identify = ({
  filter,
  countries,
  handlePropsChange,
  handleSubmit,
  uploadedPhotos,
  handlePhotoUpload
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.grid}>
        <Notification
          text={t(`verify_status.${USER_VERIFY[filter.profile.isVerify]}`)}
          type={filter.profile.isVerify < 3 ? 'error' : 'success'}
        />
        {
          filter.profile.isVerify < 3 &&
          <Uploader data={uploadedPhotos} onChange={handlePhotoUpload} />
        }
        <Select
          placeholder={t('country')}
          options={countries.map(item => ({
            value: item.alpha_2,
            label: item.name,
          }))}
          data={filter.identify.country}
          isRequired={true}
          onChange={value => handlePropsChange('identify.country', value)}
        />
        <Field
          type={'text'}
          placeholder={t('state')}
          data={filter.identify.state}
          onChange={value => handlePropsChange('identify.state', value)}
          isRequired={true}
        />
        <Field
          type={'text'}
          placeholder={t('city')}
          data={filter.identify.city}
          onChange={value => handlePropsChange('identify.city', value)}
          isRequired={true}
        />
        <Field
          type={'text'}
          placeholder={t('address')}
          data={filter.identify.address}
          onChange={value => handlePropsChange('identify.address', value)}
          isRequired={true}
        />
        <Field
          type={'text'}
          placeholder={t('postcode')}
          data={filter.identify.postcode}
          onChange={value => handlePropsChange('identify.postcode', value)}
          isRequired={true}
        />
        <Button
          type={'submit'}
          placeholder={t('save')}
        />
      </div>
    </form>
  )
}

export default Identify