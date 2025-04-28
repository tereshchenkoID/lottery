import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoading } from 'hooks/useLoading'

import { NAVIGATION } from 'constant/config'

import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Container from 'components/Container'
import Field from 'components/Field'
import Button from 'components/Button'
import Title from 'components/Title'
import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const LOADERS = [48, 24, 48]

const AuthRecovery = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState({
    email: '',
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
    formData.append('email', filter.email)

    postData('recovery/', formData).then(json => {
      if (json.code === '0') {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        )
        handlePropsChange('email', '')
        setTimeout(() => {
          navigate('/')
        }, 3000)
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
    const { email } = filter
    return email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <Container classes={style.block}>
      <Title text={t(NAVIGATION.auth_recovery.text)} />
      <form onSubmit={handleSubmit} className={style.form}>
        {
          loading
            ?
              LOADERS.map((el, idx) =>
                <Skeleton
                  key={idx}
                  styles={{
                    maxWidth: 380,
                    height: el,
                    borderRadius: 8,
                  }}
                />
              )
            :
              <>
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

export default AuthRecovery
