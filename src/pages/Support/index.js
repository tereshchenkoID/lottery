import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Title from 'components/Title'
import Breadcrumbs from 'modules/Breadcrumbs'

import style from './index.module.scss'

const Support = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Breadcrumbs
        data={[
          NAVIGATION.home
        ]}
      />
      <Title text={t(NAVIGATION.support.text)} />
      <div className={style.grid}></div>
    </Container>
  )
}

export default Support