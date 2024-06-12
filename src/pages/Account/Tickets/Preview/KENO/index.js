import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'
import { betType } from 'constant/config'

const KENO = ({ data }) => {
  const { t } = useTranslation()
  const [numbers, setNumbers] = useState(
    Array.from({ length: 80 }, (_, idx) => ({
      number: idx + 1,
      active: false,
      checked: false,
    })),
  );

  useEffect(() => {
    setNumbers(prevNumbers =>
      prevNumbers.map(num => ({
        ...num,
        active: data.numbers.includes(num.number),
        checked: data.results.includes(num.number)
      }))
    );
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
                  el.active && style.active,
                  el.checked && style.checked,
                )
              }
            >
              {el.number}
            </div>
          )
        }
      </div>
      <div>
        <p className={style.label}>{t('drawn_numbers')}</p>
        <div className={style.results}>
          {
            (data.numbers[0] === betType['1'] || data.numbers[0] === betType['2'] || data.numbers[0] === betType['3'])
              ?
              <span className={style.result}>
                {t(`numbers.${data.numbers[0]}`)}
              </span>
              :
              data.results.map((el, idx) =>
                <span
                  key={idx}
                  className={
                    classNames(
                      style.result,
                      data.numbers.includes(el) && style.active
                    )
                  }
                >
                  {el}
                </span>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default KENO
