import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Title from 'components/Title'
import Breadcrumbs from 'modules/Breadcrumbs'
import Question from './Question'

import style from './index.module.scss'

const Faq = () => {
  const { t, i18n } = useTranslation()
  const translations = i18n.getResourceBundle(i18n.language)
  const numberOfKeys = Object.keys(translations.faq).length

  return (
    <Container>
      <Breadcrumbs
        data={[
          NAVIGATION.home
        ]}
      />
      <Title text={t(NAVIGATION.faq.text)} />
      <div className={style.grid}>
        {Array.from({ length: numberOfKeys / 2 }).map((_, idx) => (
          <Question key={idx} id={idx} />
        ))}
      </div>
    </Container>
  )
}

export default Faq