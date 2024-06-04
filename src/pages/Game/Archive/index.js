import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getDate } from 'helpers/getDate'
import { postData } from 'helpers/api'

import Loader from 'components/Loader'
import GameField from 'modules/GameField'
import GameButton from 'modules/GameButton'
import GameCheckbox from 'modules/GameCheckbox'

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

const getDateXDaysFrom = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().split('T')[0]
}

const today = new Date()

const validateFilter = filter => {
  let { dateFrom, dateTo } = filter

  if (!dateFrom) {
    dateFrom = getDateXDaysFrom(dateTo, -30)
  }
  // else if (new Date(dateFrom) > new Date(dateTo)) {
  //   dateFrom = getDateXDaysFrom(dateTo, -30)
  // }

  if (!dateTo) {
    dateTo = getDateXDaysFrom(dateFrom, 30)
  }

  if (new Date(dateFrom) > today) {
    dateFrom = today
  }

  if (new Date(dateTo) > today) {
    dateTo = today
  }

  // if (new Date(dateTo) - new Date(dateFrom) > 30 * 24 * 60 * 60 * 1000) {
  //   dateTo = getDateXDaysFrom(dateFrom, 30)
  // }

  return { ...filter, dateFrom, dateTo }
}

const Archive = ({ betslip, game }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const initialValues = [
    getDate(new Date().setDate(new Date().getDate() - 30), 3),
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

  const validateDate = dateValue => {
    const today = new Date().toISOString().split('T')[0]
    return dateValue > today ? today : dateValue
  }

  const handleLoad = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('gameId', filter.gameId)
    formData.append('isPrize', filter.isPrize)

    if (active === 0) {
      formData.append('dateFrom', filter.dateFrom)
      formData.append('dateTo', filter.dateTo)
    } else {
      formData.append('numberFrom', filter.numberFrom)
      formData.append('numberTo', filter.numberTo)
    }

    postData('archive/', formData).then(json => {
      setData(json)
      setLoading(false)
    })
  }

  const handlePropsChange = (fieldName, fieldValue) => {
    const validatedValue =
      fieldName === 'dateFrom' || fieldName === 'dateTo'
        ? validateDate(fieldValue)
        : fieldValue

    setFilter(prevData => ({
      ...prevData,
      [fieldName]: validatedValue,
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
    let { dateFrom, dateTo } = filter

    if (filter.dateTo === '') {
      dateTo = getDate(new Date(), 3)
    }

    if (filter.dateFrom === '') {
      dateFrom = getDateXDaysFrom(dateTo, -30)
    }

    if (new Date(dateTo) - new Date(dateFrom) > 30 * 24 * 60 * 60 * 1000) {
      dateFrom = getDateXDaysFrom(dateTo, -30)
    }

    if (new Date(dateFrom) > new Date(dateTo)) {
      dateFrom = dateTo
    }

    setFilter(prevData => {
      return {
        ...prevData,
        dateTo: dateTo,
        dateFrom: dateFrom,
      }
    })

    // handleLoad()
  }

  useEffect(() => {
    handleLoad()
  }, [])

  return (
    <div className={style.block}>
      {loading && <Loader />}

      <pre>{JSON.stringify(filter, null, 2)}</pre>

      <div className={style.tab}>
        {TABS.map((el, idx) => (
          <GameButton
            key={idx}
            placeholder={t(el.text)}
            isActive={active === el.value}
            onChange={() => setActive(idx)}
            classes={style.button}
          />
        ))}
      </div>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          {active === 0 ? (
            <>
              <GameField
                type={'date'}
                placeholder={t('date_from')}
                data={filter.dateFrom}
                onChange={value => handlePropsChange('dateFrom', value)}
                max={initialValues[1]}
              />
              <GameField
                type={'date'}
                placeholder={t('date_to')}
                data={filter.dateTo}
                onChange={value => handlePropsChange('dateTo', value)}
                max={initialValues[1]}
              />
            </>
          ) : (
            <>
              <GameField
                type={'number'}
                placeholder={t('draws_from')}
                data={filter.numberFrom}
                onChange={value => handlePropsChange('numberFrom', value)}
                min={0}
              />
              <GameField
                type={'number'}
                placeholder={t('draws_to')}
                data={filter.numberTo}
                onChange={value => handlePropsChange('numberTo', value)}
                min={0}
              />
            </>
          )}
          <div>
            <GameCheckbox
              data={filter.isPrize}
              placeholder={t('jackpot_won')}
              onChange={value => handleCheckboxChange(value)}
            />
          </div>
          <GameButton
            type={'submit'}
            placeholder={t('search')}
            onChange={() => handleSubmit()}
            classes={style.search}
          />
        </form>
      </div>
      <div className={style.container}>
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
          {data.length > 0 ? (
            data.map((el, idx) => <Row data={el} key={idx} />)
          ) : (
            <div className={style.empty}>{t('empty')}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Archive
