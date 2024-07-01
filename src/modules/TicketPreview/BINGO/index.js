import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'

const BINGO = ({ data }) => {
  const { t } = useTranslation()
  const [numbers, setNumbers] = useState(
    Array.from({ length: 54 }, (_, idx) => ({
      number: idx + 1,
      active: false,
      checked: false,
    })),
  );

  useEffect(() => {
    setNumbers(prevNumbers =>
      prevNumbers.map((_, idx) => ({
        number: data.numbers[idx],
        checked: data.status >= 3 ? data.results.includes(data.numbers[idx]) : true
      }))
    )
  }, [data.numbers])

  return (
    <div className={style.block}>
      <div className={style.numbers}>
        {
          numbers.map((el, idx) =>
            <div
              key={idx}
              className={
                classNames(
                  style.number,
                  (el.number > 0 && !el.checked) && style.checked,
                )
              }
            >
              <span>{el.number !== 0 && el.number}</span>
            </div>
          )
        }
      </div>

      {
        data.status >= 3 &&
        <div>
          <p className={style.label}>{t('missed_numbers')}</p>
          <div className={style.results}>
            {
              numbers.map((el, idx) => (
                el.number !== 0 && !el.checked && (
                  <p
                    key={idx}
                    className={
                      classNames(
                        style.result, 
                        style.active
                      )
                    }
                  >
                    {el.number}
                  </p>
                )
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default BINGO
