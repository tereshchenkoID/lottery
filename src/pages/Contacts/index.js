import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Title from 'components/Title'
import Field from 'components/Field'
import Button from 'components/Button'
import Textarea from 'components/Textarea'
import Breadcrumbs from 'modules/Breadcrumbs'

import style from './index.module.scss'

const Contacts = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState({
    name: '',
    theme: '',
    message: '',
    email: ''
  })

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = () => {

  }

  const isFormValid = () => {
    const { email, ...requiredFields } = filter
    const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    return (
      Object.values(requiredFields).every(field => field.trim() !== '') && isEmailValid
    )
  }

  return (
    <Container>
      <Breadcrumbs
        data={[
          NAVIGATION.home
        ]}
      />
      <Title text={t(NAVIGATION.contacts.text)} />
      <form onSubmit={handleSubmit} className={style.form}>
        <Field
          type={'text'}
          placeholder={t('name')}
          data={filter.name}
          onChange={value => handlePropsChange('name', value)}
          isRequired={true}
        />
        <Field
          type={'text'}
          placeholder={t('theme')}
          data={filter.theme}
          onChange={value => handlePropsChange('theme', value)}
          isRequired={true}
        />
        <Textarea
          placeholder={t('message')}
          data={filter.message}
          onChange={value => handlePropsChange('message', value)}
          isRequired={true}
        />
        <Field
          type={'email'}
          placeholder={t('email')}
          data={filter.email}
          onChange={value => handlePropsChange('email', value)}
          isRequired={true}
        />
        <Button
          type={'submit'}
          placeholder={t('send')}
          isDisabled={!isFormValid()}
        />
      </form>
    </Container>
  )
}

export default Contacts