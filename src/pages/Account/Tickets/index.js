import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { postData } from 'helpers/api'

import classNames from 'classnames'

import Loader from 'components/Loader'
import Pagination from 'modules/Pagination'
import Ticket from './Ticket'
import Preview from './Preview'

import style from './index.module.scss'

const Tickets = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState({
    dateFrom: "2024-05-01",
    dateTo: "2024-05-31",
    status: -1,
  })

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
    formData.append('status', filter.status)

    postData('tickets/', formData).then(json => {
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
    <div className={style.block}>
      {
        loading ? (
          <Loader />
        ) : (
          <div className={style.wrapper}>
            <div
              className={classNames(style.shadow, active && style.active)}
              onClick={() => {
                setActive()
              }}
            />
            <div className={style.left}>
              {
                data?.length > 0 ? (
                  <>
                    <div className={style.list}>
                      {
                        data.map((el, idx) =>
                          <Ticket
                            key={idx}
                            data={el}
                            active={active}
                            setActive={setActive}
                          />
                        )
                      }
                    </div>
                    <Pagination
                      pagination={pagination}
                      handlePrev={() => handlePrev()}
                      handleNext={() => handleNext()}
                    />
                  </>
                ) : (
                  <div className={style.empty}>{t('empty')}</div>
                )
              }
            </div>
            <div className={style.right}>
              <Preview active={active} setActive={setActive} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Tickets
