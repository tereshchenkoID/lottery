import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'context/AuthContext'

import { NAVIGATION } from 'constant/config'

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
  const { settings } = useSelector(state => state.settings)
  const { auth } = useSelector(state => state.auth)
  const { isCashbox } = useAuth()
  const [active, setActive] = useState(false)
  const [modalContentType, setModalContentType] = useState(null)
  const isAuth = auth.id

  const handleChange = (field, data) => {
    let a = auth
    a.account[field] = data

    if (isAuth) {
      const formData = new FormData()
      formData.append('auth', JSON.stringify(a))

      postData('account/', formData).then(json => {
        if (json.code === "0") {
          dispatch(setAuth(a))
          dispatch(
            setToastify({
              type: 'success',
              text: json.message,
            }),
          )
          window.location.reload()
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

    setActive(!active)
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
      <Title text={t(NAVIGATION.settings.text)} />
      <div className={style.grid}>
        <div className={style.row}>
          <p>{t('language')}:</p>
          <Button
            classes={['alt', 'wide', 'md']}
            onChange={() => {
              setModalContentType('Language')
              setActive(true)
            }}
            placeholder={auth.account.language.text}
          />
        </div>
        {
          isAuth &&
          <>
            {
              !isCashbox &&
              <div className={style.row}>
                <p>{t('currency')}:</p>
                <Button
                  classes={['alt', 'wide', 'md']}
                  onChange={() => {
                    setModalContentType('Currency')
                    setActive(true)
                  }}
                  placeholder={`${auth.account.currency.code} - ${auth.account.currency.symbol}`}
                />
              </div>
            }
          </>
        }
      </div>
      <Modal
        active={active}
        setActive={setActive}
        child={renderModalContent()}
      />
    </Container>
  )
}

export default Settings