import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setAuth } from 'store/actions/authAction'
import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Container from 'components/Container'
import Field from 'components/Field'
import Button from 'components/Button'
import Password from 'components/Password'

import style from './index.module.scss'

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    username: 'tester',
    password: 'qwe123',
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

  return (
    <Container classes={style.block}>
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
        <Button type={'submit'} placeholder={t('login')} />
      </form>
    </Container>
  )
}

export default Login
