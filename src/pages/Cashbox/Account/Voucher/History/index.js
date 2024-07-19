import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { postData } from 'helpers/api'

import Loader from 'components/Loader'
import Pagination from 'modules/Pagination'
import Empty from 'modules/Empty'
import Row from './Row'

import style from '../index.module.scss'

const History = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [type, setType] = useState(-1)
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
    formData.append('type', type)

    postData('billing/history/', formData).then(json => {
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
  }, [type])

  return (
    <div className={style.table}>
      {
        loading
          ?
            <Loader type={'inline'} />
          :
            data?.length > 0
              ?
                <>
                  <div className={style.filter}>
                    <button
                      className={classNames(style.type, type === -1 && style.active)}
                      onClick={() => setType(-1)}
                    >
                      <p className={style.name}>{t(`all`)}</p>
                    </button>
                    {
                      auth.wallet?.map((el, idx) =>
                        <button
                          key={idx}
                          className={classNames(style.type, type === el.id && style.active)}
                          onClick={() => setType(el.id)}
                        >
                          <span className={style.logo}>
                            <img src={el.icon} alt={el.name} />
                          </span>
                          <p>{el.name}</p>
                        </button>
                      )
                    }
                  </div>
                  <div className={style.list}>
                    <div className={style.row}>
                      <div className={style.cell}><strong>{t('status')}</strong></div>
                      <div className={style.cell}><strong>{t('pay_system')}</strong></div>
                      <div className={style.cell}><strong>{t('code')}</strong></div>
                      <div className={style.cell}><strong>{t('type')}</strong></div>
                      <div className={style.cell}><strong>{t('amount')}, {auth.account.currency.symbol}</strong></div>
                      <div className={style.cell}><strong>{t('date_create')}</strong></div>
                      <div className={style.cell}><strong>{t('date_use')}</strong></div>
                      <div className={style.cell}><strong>{t('where_use')}</strong></div>
                      <div className={style.cell}><strong>{t('action')}</strong></div>
                    </div>
                    {
                      data.map((el, idx) =>
                        <Row
                          key={idx}
                          data={el}
                          setData={setData}
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
    </div>
  )
}

export default History
