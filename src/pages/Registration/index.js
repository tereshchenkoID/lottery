import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useLoading } from 'hooks/useLoading'

import { NAVIGATION } from 'constant/config'

import { setAuth } from 'store/actions/authAction'
import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'

import Container from 'components/Container'
import Phone from 'components/Phone'
import Field from 'components/Field'
import Button from 'components/Button'
import Password from 'components/Password'
import Title from 'components/Title'
import Notification from 'components/Notification'
import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const LOADERS = [48, 48, 48, 48, 70, 48, 24, 48]

const Registration = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    username: '',
    email: '',
    date: '',
    phone: '',
    password: '',
    password_repeat: '',
  })
  const [loading] = useLoading(true)

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
    formData.append('password', filter.password)

    postData('register/', formData).then(json => {
      if (json.id) {
        dispatch(setAuth(json)).then(() => {
          navigate('/')
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

  const isFormValid = () => {
    const { email, password, password_repeat, ...requiredFields } = filter
    const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = password.trim() !== '' && password.length >= 6 && password === password_repeat

    return (
      Object.values(requiredFields).every(field => field.trim() !== '') && isPasswordValid && isEmailValid
    )
  }

  return (
    <Container classes={style.block}>
      <Title text={t(NAVIGATION.registration.text)} />
      <form onSubmit={handleSubmit} className={style.form}>
        {
          loading
            ?
              LOADERS.map((el, idx) =>
                <Skeleton
                  key={idx}
                  styles={{
                    maxWidth: 412,
                    height: el,
                    borderRadius: 8,
                  }}
                />
              )
            :
              <>
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
                {
                  filter.password !== filter.password_repeat && 
                    <Notification 
                      text={t('validation.password_mismatch')}
                      type={'error'}
                    />
                }
                <div>
                  <Password
                    placeholder={t('password')}
                    data={filter.password}
                    onChange={value => handlePropsChange('password', value)}
                    isRequired={true}
                  />
                  <p className={style.label}>{t('validation.password_length')}</p>
                </div>
                <Password
                  placeholder={t('password_repeat')}
                  data={filter.password_repeat}
                  onChange={value => handlePropsChange('password_repeat', value)}
                  isRequired={true}
                />
                <p className={style.links}>
                  <Link
                    to={NAVIGATION.login.link}
                    rel="noreferrer"
                    className={style.link}
                  >
                    {t('login')}
                  </Link>
                  <span>|</span>
                  <Link
                    to={NAVIGATION.auth_recovery.link}
                    rel="noreferrer"
                    className={style.link}
                  >
                    {t(NAVIGATION.auth_recovery.text)}
                  </Link>
                </p>
                <Button
                  type={'submit'}
                  placeholder={t('send')}
                  isDisabled={!isFormValid()}
                />
              </>
        }
      </form>
    </Container>
  )
}

export default Registration
