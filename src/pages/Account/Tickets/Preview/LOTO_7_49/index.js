import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'

const LOTO_7_49 = ({ data }) => {
  const { t } = useTranslation()
  const [numbers, setNumbers] = useState(
    Array.from({ length: 49 }, (_, idx) => ({
      number: idx + 1,
      active: false,
    })),
  );

  useEffect(() => {
    setNumbers(prevNumbers =>
      prevNumbers.map(num => ({
        ...num,
        active: data.numbers.includes(num.number)
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
              className={classNames(style.number, el.active && style.active)}
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
            data.numbers.map((el, idx) =>
              <span
                key={idx}
                className={style.result}
              >
                {el}
                {idx !== data.numbers.length - 1 && ','}
              </span>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default LOTO_7_49
