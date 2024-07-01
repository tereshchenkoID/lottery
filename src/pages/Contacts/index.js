import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Title from 'components/Title'

import style from './index.module.scss'

const Contacts = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Title text={t(NAVIGATION.contacts.text)} />
      <div className={style.grid}></div>
    </Container>
  )
}

export default Contacts