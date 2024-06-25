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
import Title from 'components/Title'

import style from './index.module.scss'

const PasswordRecovery = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    email: '',
  })

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    // const formData = new FormData()
    // formData.append('email', filter.email)

    // postData('login/', formData).then(json => {
    //   if (json.id) {
    //     dispatch(setAuth(json)).then(() => {
    //       navigate('/')
    //     })
    //   } else {
    //     dispatch(
    //       setToastify({
    //         type: 'error',
    //         text: json.error_message,
    //       }),
    //     )
    //   }
    // })
  }

  const isFormValid = () => {
    const { email } = filter
    return email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <Container classes={style.block}>
      <Title text={t(NAVIGATION.password_recovery.text)} />
      <form onSubmit={handleSubmit} className={style.form}>
        <Field
          type={'email'}
          placeholder={t('email')}
          data={filter.email}
          onChange={value => handlePropsChange('email', value)}
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
            to={NAVIGATION.registration.link}
            rel="noreferrer"
            className={style.link}
          >
            {t(NAVIGATION.registration.text)}
          </Link>
        </p>
        {
          isFormValid() &&
          <Button 
            type={'submit'} 
            placeholder={t(NAVIGATION.password_recovery.text)} 
          />
        }
      </form>
    </Container>
  )
}

export default PasswordRecovery
