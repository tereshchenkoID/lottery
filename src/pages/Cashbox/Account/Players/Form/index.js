import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { PRINT_STATUS } from 'constant/config'

import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'

import Field from 'components/Field'
import Phone from 'components/Phone'
import Button from 'components/Button'

import style from './index.module.scss'

const Form = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const initialFormState = {
    username: '',
    email: '',
    date: '',
    phone: '',
    balance: '',
  }
  const [filter, setFilter] = useState(initialFormState)

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', filter.username)
    formData.append('email', filter.email)
    formData.append('date', filter.date)
    formData.append('phone', filter.phone)
    formData.append('balance', filter.balance)

    postData('players/register/', formData).then(json => {
      if (json.id) {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        )
        setFilter(initialFormState)
        window.printAction(json, PRINT_STATUS.user_create)
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

  const isFormValid = () => {
    const { email, password, password_repeat, ...requiredFields } = filter
    const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    return (
      Object.values(requiredFields).every(field => field.trim() !== '') && isEmailValid
    )
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Field
        type={'text'}
        placeholder={t('username')}
        data={filter.username}
        onChange={value => handlePropsChange('username', value)}
        isRequired={true}
      />
      <Phone
        data={filter.phone}
        onChange={value => handlePropsChange('phone', value)}
        isRequired={true}
      />
      <Field
        type={'date'}
        placeholder={t('birth_day')}
        data={filter.date}
        onChange={value => handlePropsChange('date', value)}
        isRequired={true}
        max={getDate(new Date(), 3)}
      />
      <Field
        type={'email'}
        placeholder={t('email')}
        data={filter.email}
        onChange={value => handlePropsChange('email', value)}
        isRequired={true}
      />
      <Field
        type={'number'}
        placeholder={t('balance')}
        data={filter.balance}
        onChange={value => handlePropsChange('balance', value)}
        isRequired={true}
      />
      <Button
        type={'submit'}
        placeholder={t('create')}
        isDisabled={!isFormValid()}
      />
    </form>
  )
}

export default Form