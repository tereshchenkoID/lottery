import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { getDate } from 'helpers/getDate'
import { postData } from 'helpers/api'
import { getDateXDaysFrom } from 'helpers/getDateXDaysFrom'

import Loader from 'components/Loader'
import Checkbox from 'components/Checkbox'
import Button from 'components/Button'
import Field from 'components/Field'
import Pagination from 'modules/Pagination'
import Row from './Row'

import style from './index.module.scss'

const TABS = [
  {
    value: 0,
    text: 'by_date',
  },
  {
    value: 1,
    text: 'by_draws',
  },
]

const Archive = ({ game }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const initialValues = [
    getDateXDaysFrom(new Date(), -30),
    getDate(new Date(), 3),
    game.round.id - 100,
    game.round.id,
  ]
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState({
    gameId: game.id,
    dateFrom: initialValues[0],
    dateTo: initialValues[1],
    numberFrom: initialValues[2],
    numberTo: initialValues[3],
    isPrize: 0,
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
    formData.append('gameId', filter.gameId)
    formData.append('isPrize', filter.isPrize)

    if (active === 0) {
      formData.append('dateFrom', filter.dateFrom)
      formData.append('dateTo', filter.dateTo || initialValues[1])

      if(!filter.dateTo) {
        handlePropsChange('dateTo', initialValues[1])
      }
    } else {
      formData.append('numberFrom', filter.numberFrom)
      formData.append('numberTo', filter.numberTo || initialValues[3])

      if(!filter.numberTo) {
        handlePropsChange('numberTo', initialValues[3])
      }
    }

    postData('archive/', formData).then(json => {
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

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleCheckboxChange = () => {
    setFilter(prevData => ({
      ...prevData,
      isPrize: prevData.isPrize === 1 ? 0 : 1,
    }))
  }

  const handleSubmit = event => {
    event && event.preventDefault()
    handleLoad(0)
  }

  useEffect(() => {
    handleLoad(0)
  }, [])

  return (
    <div className={style.block}>
      <div className={style.tab}>
        {TABS.map((el, idx) => (
          <Button
            key={idx}
            placeholder={t(el.text)}
            isActive={active === el.value}
            onChange={() => setActive(idx)}
            classes={['game', style.button]}
          />
        ))}
      </div>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          {active === 0 ? (
            <>
              <Field
                type={'date'}
                classes={['game']}
                placeholder={t('date_from')}
                data={filter.dateFrom}
                onChange={value => handlePropsChange('dateFrom', value)}
                max={initialValues[1]}
              />
              <Field
                type={'date'}
                classes={['game']}
                placeholder={t('date_to')}
                data={filter.dateTo}
                onChange={value => handlePropsChange('dateTo', value)}
                max={initialValues[1]}
              />
            </>
          ) : (
            <>
              <Field
                type={'number'}
                classes={['game']}
                placeholder={t('draws_from')}
                data={filter.numberFrom}
                onChange={value => handlePropsChange('numberFrom', value)}
                min={0}
              />
              <Field
                type={'number'}
                classes={['game']}
                placeholder={t('draws_to')}
                data={filter.numberTo}
                onChange={value => handlePropsChange('numberTo', value)}
                min={0}
              />
            </>
          )}
          <div>
            <Checkbox
              classes={['game']}
              data={filter.isPrize}
              placeholder={t('jackpot_won')}
              onChange={value => handleCheckboxChange(value)}
            />
          </div>
          <Button
            type={'submit'}
            placeholder={t('search')}
            classes={['game', style.button]}
          />
        </form>
      </div>
      <div className={classNames(style.container, style.lg)}>
        {
          loading
            ?
              <Loader
                type={'inline'}
                theme={{
                  backgroundColor: 'var(--game_container_color)',
                }}
              />
            :
              <div className={style.table}>
                <div className={style.row}>
                  <div className={style.cell}>
                    <strong>{t('broadcast_date')}</strong>
                  </div>
                  <div className={style.cell}>
                    <strong>{t('draw')}</strong>
                  </div>
                  <div className={style.cell}>
                    <strong>{t('draw_result')}</strong>
                  </div>
                  <div className={style.cell}>
                    <strong>
                      {t('payments')}, {auth.account.currency.symbol}
                    </strong>
                  </div>
                </div>
                {data?.length > 0 ? (
                  <>
                    {data.map((el, idx) => <Row data={el} key={idx} />)}
                    <Pagination
                      type={'game'}
                      pagination={pagination}
                      handlePrev={() => handlePrev()}
                      handleNext={() => handleNext()}
                    />
                  </>
                ) : (
                  <div className={style.empty}>{t('empty')}</div>
                )}
              </div>
        }
      </div>
    </div>
  )
}

export default Archive
