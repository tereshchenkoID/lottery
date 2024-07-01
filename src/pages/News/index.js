import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Title from 'components/Title'

import style from './index.module.scss'

const News = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Title text={t(NAVIGATION.news.text)} />
      <div className={style.grid}></div>
    </Container>
  )
}

export default News