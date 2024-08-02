import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames'

import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Field from 'components/Field'
import Button from 'components/Button'

import style from '../../index.module.scss'

const Email = ({
  filter,
  handlePropsChange,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const action = filter.profile.isVerifyEmail === 0 ? 'getCode' : 'verify'

  const handleSubmit = (repeat) => {
    const formData = new FormData()
    formData.append('action', repeat ? 'getCode' : action)

    if (filter.profile.isVerifyEmail !== 0) (
      formData.append('code', code)
    )

    postData('profile/email/', formData).then(json => {
      if (json.code === "0") {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        ).then(() => {
          handlePropsChange('profile.isVerifyEmail', json.isVerifyEmail || 2)
          setCode('')
        })
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  return (
    <div 
      className={
        classNames(
          style.row,
          style[`count-${filter.profile.isVerifyEmail}`]
        )
      }
    >
      <Field
        type={'email'}
        placeholder={t('email')}
        data={filter.profile.email}
        onChange={value => handlePropsChange('profile.email', value)}
        isRequired={true}
        isDisabled={filter.profile.isVerifyEmail === 1}
      />
      <div className={style.wrapper}>
        {
          filter.profile.isVerifyEmail === 1 &&
          <Field
            type={'text'}
            placeholder={t('code')}
            data={code}
            onChange={value => setCode(value)}
            isRequired={true}
          />
        }
        {
          filter.profile.isVerifyEmail === 2 &&
          <div className={style.verify}>
            <FontAwesomeIcon icon="fa-solid fa-check" />
            {t('verify_status.verify')}
          </div>
        }
        {
          filter.profile.isVerifyEmail < 2 &&
          <Button
            placeholder={filter.profile.isVerifyEmail === 0 ? t('verify_status.verify') : t('send')}
            onChange={() => handleSubmit(false)}
          />
        }
        {
          filter.profile.isVerifyEmail === 1 &&
          <Button
            classes={['primary', 'square', style.action]}
            icon={'fa-solid fa-repeat'}
            onChange={() => handleSubmit(true)}
          />
        }
      </div>
    </div>
  )
}

export default Email