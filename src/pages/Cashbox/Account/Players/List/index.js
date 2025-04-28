import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { postData } from 'helpers/api'

import Button from 'components/Button'
import Field from 'components/Field'
import Loader from 'components/Loader'
import Reference from 'components/Reference'
import Pagination from 'modules/Pagination'
import Empty from 'modules/Empty'

import style from './index.module.scss'

const List = () => {
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [reset, setReset] = useState(false)
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
    
    if(filter !== '') {
      formData.append('q', filter)
    }

    postData('players/', formData).then(json => {
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

  const handleSubmit = e => {
    e.preventDefault()
    handleLoad(0)
  }

  const handleReset = e => {
    setFilter('')
    setReset(true)
  }

  useEffect(() => {
    if (reset) {
      handleLoad(0, '')
      setReset(false)
    }
  }, [reset])

  useEffect(() => {
    handleLoad(0)
  }, [])

  return (
    <div className={style.block}>
     <form onSubmit={handleSubmit} className={style.form}>
        <Field
          type={'text'}
          placeholder={t('search')}
          data={filter}
          onChange={value => setFilter(value)}
          isRequired={true}
        />
        <div className={style.action}>
          <Button
            type={'submit'}
            placeholder={t('search')}
            isDisabled={filter === ''}
          />
          <Button
            classes={['alt']}
            placeholder={t('reset')}
            isDisabled={filter === ''}
            onChange={handleReset}
          />
        </div>
      </form>
      <div className={style.wrapper}>
        {
          loading
            ?
              <Loader type={'inline'} />
            :
              <>
                {
                  data?.length > 0
                    ?
                      <>
                        <div className={style.list}>
                          {
                            data.map((el, idx) =>
                              <Reference
                                key={idx}
                                link={`${el.id}/${el.token}`} 
                                classes={['alt', style.item]}
                                placeholder={el.username} 
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
                      </>
                    :
                      <Empty />
                }
              </>
        }
      </div>
    </div>
  )
}

export default List