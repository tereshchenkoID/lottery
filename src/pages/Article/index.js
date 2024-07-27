import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLoading } from 'hooks/useLoading'

import { NAVIGATION } from 'constant/config'

import { postData } from 'helpers/api'

import Container from 'components/Container'
import Title from 'components/Title'
import Loader from 'components/Loader'
import Skeleton from 'components/Skeleton'
import Breadcrumbs from 'modules/Breadcrumbs'

import style from './index.module.scss'

const LOADERS = [120, '70%', '100', '80%', '50%', '48%', '75%']

const Article = () => {
  const navigate = useNavigate()
  const { newsId } = useParams()
  const [isLoading] = useLoading(true)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const handleLoad = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('newsId', newsId)

    postData('news/details/', formData).then(json => {
      if (json.error_message) {
        navigate(NAVIGATION.news.link)
      }
      setData(json)
      setLoading(false)
    })
  }

  useEffect(() => {
    handleLoad()
  }, [])


  if (loading)
    return <Loader />

  return (
    <Container>
      <Breadcrumbs
        data={[
          NAVIGATION.home,
          NAVIGATION.news,
        ]}
        current={{
          text: data?.title
        }}
      />
      <div className={style.content}>
        {
          isLoading
            ?
              LOADERS.map((el, idx) =>
                <Skeleton
                  key={idx}
                  styles={{
                    width: el,
                    height: el === '100' ? 200 : 43,
                    borderRadius: 8,
                  }}
                />
              )
            :
              <>
                <p className={style.date}>{data?.date}</p>
                <Title text={data?.title} classes={[style.title]} />
                <div className={style.article} dangerouslySetInnerHTML={{ __html: data?.text }} />
              </>
        }
      </div>
    </Container>
  )
}

export default Article