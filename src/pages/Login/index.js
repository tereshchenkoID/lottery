import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { NAVIGATION } from 'constant/config'

import { setAuth } from 'store/actions/authAction'
import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Container from 'components/Container'
import Field from 'components/Field'
import Button from 'components/Button'
import Password from 'components/Password'
import Title from 'components/Title'

import style from './index.module.scss'

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    username: '',
    password: '',
  })

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
    formData.append('password', filter.password)

    postData('login/', formData).then(json => {
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
    const { ...requiredFields } = filter

    return (
      Object.values(requiredFields).every(field => field.trim() !== '')
    )
  }

  return (
    <Container classes={style.block}>
      <Title text={t(NAVIGATION.login.text)} />
      <form onSubmit={handleSubmit} className={style.form}>
        <Field
          type={'text'}
          placeholder={t('username')}
          data={filter.username}
          onChange={value => handlePropsChange('username', value)}
          isRequired={true}
        />
        <Password
          placeholder={t('password')}
          data={filter.password}
          onChange={value => handlePropsChange('password', value)}
          isRequired={true}
        />
        <p className={style.links}>
          <Link
            to={NAVIGATION.registration.link}
            rel="noreferrer"
            className={style.link}
          >
            {t(NAVIGATION.registration.text)}
          </Link>
          <span>|</span>
          <Link
            to={NAVIGATION.password_recovery.link}
            rel="noreferrer"
            className={style.link}
          >
            {t(NAVIGATION.password_recovery.text)}
          </Link>
        </p>
        <Button
          type={'submit'}
          placeholder={t('login')}
          isDisabled={!isFormValid()}
        />
      </form>
    </Container>
  )
}

export default Login
