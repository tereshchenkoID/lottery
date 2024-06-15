import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { postData } from 'helpers/api'

import Container from 'components/Container'
import Title from 'components/Title'
import Button from 'components/Button'
import Currency from './Currency'
import Language from './Language'
import Modal from './Modal'

import style from './index.module.scss'

const Settings = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { settings } = useSelector(state => state.settings)
  const { auth } = useSelector(state => state.auth)
  const [active, setActive] = useState(false)
  const [modalContentType, setModalContentType] = useState(null)

  const handleChange = (field, data) => {
    let a = auth
    a.account[field] = data

    if (a.id) {
      const formData = new FormData()
      formData.append('auth', JSON.stringify(a))

      postData('account/', formData).then(json => {
        if (json.code === 0) {
          dispatch(setAuth(a))
          dispatch(
            setToastify({
              type: 'success',
              text: json.message,
            }),
          )
          navigate(window.location.pathname, { replace: true })
          setActive(!active)
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
  }

  const renderModalContent = () => {
    switch (modalContentType) {
      case 'Currency':
        return <Currency settings={settings} auth={auth} handleChange={handleChange} />
      case 'Language':
        return <Language settings={settings} auth={auth} handleChange={handleChange} />
      default:
        return null
    }
  }

  return (
    <Container>
      <>
        <Title text={t('settings')} />
        <div className={style.grid}>
          <div className={style.row}>
            <p>{t('currency')}:</p>
            <Button
              view={'alt'}
              type={'button'}
              classes={style.button}
              onChange={() => {
                setModalContentType('Currency')
                setActive(true)
              }}
              placeholder={`${auth.account.currency.code} - ${auth.account.currency.symbol}`}
            />
          </div>
          <div className={style.row}>
            <p>{t('language')}:</p>
            <Button
              view={'alt'}
              type={'button'}
              classes={style.button}
              onChange={() => {
                setModalContentType('Language')
                setActive(true)
              }}
              placeholder={auth.account.language.text}
            />
          </div>
        </div>
        <Modal
          active={active}
          setActive={setActive}
          child={renderModalContent()}
        />
      </>
    </Container>
  )
}

export default Settings