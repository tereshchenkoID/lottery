import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { getDate } from 'helpers/getDate'
import { postData } from 'helpers/api'
import { getValueFormatted } from 'helpers/getValueFormatted'

import { setToastify } from 'store/actions/toastifyAction'

import Loader from 'components/Loader'
import GameField from 'modules/GameField'
import GameButton from 'modules/GameButton'
import GameCheckbox from 'modules/GameCheckbox'

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
  const [data, setData] = useState([
    {
      time: 1716557858266,
      draw: 293877,
      results: {
        parity: 101,
        numbers: [1, 2, 3, 4, 5, 6],
      },
      prize: 96629478,
    },
    {
      time: 1716557858266,
      draw: 293877,
      results: {
        parity: 101,
        numbers: [1, 2, 3, 4, 5, 6],
      },
      prize: 96629478,
    },
  ])
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState({
    gameId: game.id,
    dateFrom: initialValues[0],
    dateTo: initialValues[1],
    numberFrom: initialValues[2],
    numberTo: initialValues[3],
    isPrize: 0,
  })

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

    postData('settings/jp/', formData).then(json => {
      if (json.status === 'OK') {
        setData(json.data)
        setLoading(false)
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
      setLoading(true)
    })
  }

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleCheckboxChange = (checked, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      isPrize: prevData.isPrize === 1 ? 0 : 1,
    }))
  }

  const handleSubmit = event => {
    event && event.preventDefault()
  }

  return (
    <div className={style.block}>
      {loading && <Loader />}

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
          <div className={classNames(style.row, style.head)}>
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
          {data.map((el, idx) => (
            <div key={idx} className={style.row}>
              <div className={style.cell}>
                <span className={style.label}>{t('broadcast_date')}</span>
                {getDate(el.time)}
              </div>
              <div className={style.cell}>
                <span className={style.label}>{t('draw')}</span>
                <Link
                  to={`/archive/${el.draw}`}
                  rel="noreferrer"
                  className={style.link}
                >
                  {el.draw}
                </Link>
              </div>
              <div className={style.cell}>
                <div className={style.results}>
                  {el.results.parity && (
                    <div className={style.numbers}>
                      {t('parity')}:{' '}
                      <strong>{t(`numbers.${el.results.parity}`)}</strong>
                    </div>
                  )}
                  <div className={style.numbers}>
                    {el.results.numbers.map((el_n, idx_n) => (
                      <GameButton
                        key={idx_n}
                        placeholder={el_n}
                        classes={style.number}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={style.cell}>
                <span className={style.label}>{t('draw')}</span>
                <h6 className={style.prize}>{getValueFormatted(el.prize)}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Archive
