import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLoading } from 'hooks/useLoading'

import { NAVIGATION } from 'constant/config'

import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Container from 'components/Container'
import Title from 'components/Title'
import Field from 'components/Field'
import Button from 'components/Button'
import Textarea from 'components/Textarea'
import Paragraph from 'components/Paragraph'
import Checkbox from 'components/Checkbox'
import Skeleton from 'components/Skeleton'
import Breadcrumbs from 'modules/Breadcrumbs'

import style from './index.module.scss'

const LOADERS = [48, 48, 48, 100, 48, 30, 48]

const Contacts = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const initialValues = {
    name: '',
    theme: '',
    message: '',
    email: '',
    terms: 0,
  }
  const [filter, setFilter] = useState(initialValues)
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
    for (const [key, value] of Object.entries(filter)) {
      formData.append(key, value)
    }

    postData('form/', formData).then(json => {
      console.log(json)

      if (json.code === "0") {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        )
        setFilter(initialValues)
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
    const { email, ...requiredFields } = filter
    const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    return (
      Object.values(requiredFields).every(field => typeof field === 'string' ? field.trim() !== '' : field !== 0) && isEmailValid
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
                <Paragraph>
                  {t('pages.contact.description_1')}
                  <Link
                    to={NAVIGATION.faq.link}
                    rel="noreferrer"
                    className={style.link}
                  >
                    {t('pages.contact.link_1')}
                  </Link>
                </Paragraph>
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
                <Checkbox
                  data={filter.terms}
                  placeholder={t('terms')}
                  onChange={value => handlePropsChange('terms', value)}
                />
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

export default Contacts