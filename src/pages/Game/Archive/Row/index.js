import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Fragment, useState } from 'react'

import { getDate } from 'helpers/getDate'
import { getValueFormatted } from 'helpers/getValueFormatted'

import Button from 'components/Button'

import style from './index.module.scss'

const Row = ({ data }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const [active, setActive] = useState(false)

  return (
    <div className={style.block}>
      <div className={style.row}>
        <div className={style.cell}>
          <span className={style.label}>{t('broadcast_date')}</span>
          {getDate(data.time)}
        </div>
        <div className={style.cell}>
          <span className={style.label}>{t('draw')}</span>
          <button
            className={style.link}
            type={'button'}
            onClick={() => setActive(!active)}
          >
            {data.draw}
          </button>
        </div>
        <div className={style.cell}>
          <div className={style.results}>
            {data.results.parity && (
              <div className={style.numbers}>
                {t('parity')}:{' '}
                <strong>{t(`numbers.${data.results.parity}`)}</strong>
              </div>
            )}
            <div className={style.numbers}>
              {data.results.numbers.map((el_n, idx_n) => (
                <Button
                  key={idx_n}
                  placeholder={el_n}
                  classes={['game', style.number]}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={style.cell}>
          <span className={style.label}>{t('draw')}</span>
          <h6 className={style.prize}>{getValueFormatted(data.prize)}</h6>
        </div>
      </div>
      {(active && Object.keys(data?.stats).length !== 0) && (
        <div className={style.dropdown}>
          <div className={style.table}>
            {
              Object.entries(data?.stats).map(([key, value]) => (
                <Fragment key={key}>
                  <div className={style.td}>
                    {key}
                  </div>
                  <div className={style.td}>
                    {value} {auth.account.currency.symbol}
                  </div>
                </Fragment>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Row
