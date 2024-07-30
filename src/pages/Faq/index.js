import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import { postData } from 'helpers/api'

import Container from 'components/Container'
import Title from 'components/Title'
import Breadcrumbs from 'modules/Breadcrumbs'
import Question from './Question'

import style from './index.module.scss'

const Faq = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [data, setData] = useState([])

  const handleLoad = () => {
    const formData = new FormData()
    formData.append('lang', currentLanguage)

    postData('faq/', formData).then(json => {
      setData(json)
    })
  }

  useEffect(() => {
    handleLoad()
  }, [])
  
  return (
    <Container classes={style.container}>
      <Breadcrumbs
        data={[
          NAVIGATION.home
        ]}
      />
      <Title text={t(NAVIGATION.faq.text)} />
      <div className={style.content}>
        <div className={style.grid}>
          {data?.map((el, idx) => (
            <Question key={idx} data={el} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Faq