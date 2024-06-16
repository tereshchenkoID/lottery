import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Field from 'components/Field'
import Button from 'components/Button'
import Title from 'components/Title'

import style from './index.module.scss'

const CheckTickets = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <Container>
      <Title text={t(NAVIGATION.check_ticket.text)} />
      <form onSubmit={handleSubmit} className={style.form}>
        <Field
          type={'text'}
          placeholder={t('ticket')}
          data={filter}
          onChange={value => setFilter(value)}
          isRequired={true}
        />
        <Button type={'submit'} placeholder={t('search')} />
      </form>
    </Container>
  )
}

export default CheckTickets
