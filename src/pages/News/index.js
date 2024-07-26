import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { NAVIGATION } from 'constant/config'

import { postData } from 'helpers/api'

import Container from 'components/Container'
import Title from 'components/Title'
import Loader from 'components/Loader'
import Breadcrumbs from 'modules/Breadcrumbs'
import Pagination from 'modules/Pagination'
import Empty from 'modules/Empty'
import Article from './Article'

import style from './index.module.scss'

const News = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    pages: 0,
    quantity: 0,
    results: 0,
  })

  const handleLoad = (page) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('page', page)

    postData('news/', formData).then(json => {
      setData(json.data)

      setPagination({
        page: json.page,
        pages: json.pages,
        quantity: json.quantity,
        results: json.results,
      })

      setLoading(false)
    })
  }

  const handlePagination = (fieldName, fieldValue) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      [fieldName]: fieldValue,
    }))
    handleLoad(fieldValue)
  }

  const handlePrev = () => {
    const prev = pagination.page > 0 ? pagination.page - 1 : 0
    handlePagination('page', prev)
  }

  const handleNext = () => {
    const next =
      pagination.page < pagination.pages
        ? pagination.page + 1
        : pagination.pages
    handlePagination('page', next)
  }

  useEffect(() => {
    handleLoad(0)
  }, [])

  return (
    <Container>
      <Breadcrumbs
        data={[
          NAVIGATION.home
        ]}
      />
      <Title text={t(NAVIGATION.news.text)} />
      {
        loading 
        ?
          <Loader type={'inline'} />
        :
          <>
            {
              data?.length > 0 
              ?
                <div className={style.list}>
                  <div className={style.grid}>
                    {
                      data.map((el, idx) => 
                        <Article 
                          key={idx}
                          data={el} 
                        />
                      )
                    }
                  </div>
                  {
                    pagination.pages > 1 &&
                    <div className={style.pagination}>
                      <Pagination
                        pagination={pagination}
                        handlePrev={() => handlePrev()}
                        handleNext={() => handleNext()}
                      />
                    </div>
                  }
                </div>
              :
                <Empty />
            }
          </>
        }
    </Container>
  )
}

export default News