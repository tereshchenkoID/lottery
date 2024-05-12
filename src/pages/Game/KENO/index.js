import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import style from './index.module.scss'

const KENO = ({ data }) => {
  const COUNT = 8
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const [selectedType, setSelectedType] = useState(0)
  const [selectedCount, setSelectedCount] = useState(0)
  const [numbers, setNumbers] = useState(
    Array.from({ length: 80 }, (_, idx) => ({
      number: idx + 1,
      active: false,
    })),
  )

  const handleNumberClick = numberIndex => {
    const updatedNumbers = [...numbers]
    if (updatedNumbers[numberIndex].active) {
      updatedNumbers[numberIndex].active = false
      setSelectedCount(prevCount => prevCount - 1)
    } else if (selectedCount < COUNT) {
      updatedNumbers[numberIndex].active = true
      setSelectedCount(prevCount => prevCount + 1)
    }
    setNumbers(updatedNumbers)
  }

  const handleRandomClick = () => {
    const updatedNumbers = [...numbers].map(num => ({ ...num, active: false }))
    const randomNumbers = updatedNumbers.filter(num => !num.active)
    const randomIndexes = []
    while (randomIndexes.length < COUNT) {
      const randomIndex = Math.floor(Math.random() * randomNumbers.length)
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex)
      }
    }
    randomIndexes.forEach(idx => {
      updatedNumbers[randomNumbers[idx].number - 1].active = true
    })
    setNumbers(updatedNumbers)
    setSelectedCount(COUNT)
  }

  const handleColumnClick = columnNumber => {
    const updatedNumbers = [...numbers].map(num => ({ ...num, active: false }))
    for (let i = columnNumber - 1; i < updatedNumbers.length; i += 10) {
      updatedNumbers[i].active = true
    }
    setNumbers(updatedNumbers)
    setSelectedCount(COUNT)
  }

  const handleResetClick = () => {
    setNumbers(numbers.map(num => ({ ...num, active: false })))
    setSelectedCount(0)
  }

  const tips = useMemo(
    () =>
      data.odds.numbers
        .filter(market => Number(market.a[0]) === selectedCount)
        .sort((a, b) => b.b - a.b),
    [data, selectedCount],
  )

  return (
    <div className={style.block}>
      <div className={style.field}>
        <div className={style.container}>
          <div className={style.left}>
            <p>Угадайте столбец</p>
            <p>Где выпадет больше чисел?</p>
          </div>
          <div className={style.right}>
            <div className={style.numbers}>
              {Array.from({ length: 10 }).map((el, idx) => (
                <div className={style.column} key={idx}>
                  <button
                    type={'button'}
                    className={style.button}
                    onClick={() => handleColumnClick(idx)}
                  >
                    {++idx}
                  </button>
                  <FontAwesomeIcon
                    icon="fa-solid fa-caret-down"
                    className={style.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={style.container}>
          <div className={style.left}>
            <p>Угадайте числа</p>
            <p>Выберите от 1 до 10 чисел</p>

            {tips.length > 0 && (
              <div className={style.table}>
                <div className={style.row}>
                  <div className={style.cell}>{t('guessed')}</div>
                  <div className={style.cell}>
                    {t('winning')}, {auth.account.currency.symbol}
                  </div>
                </div>
                {tips.map((el, idx) => (
                  <div key={idx} className={style.row}>
                    <div className={style.cell}>{el.a[2]}</div>
                    <div className={style.cell}>{el.b}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.right}>
            <div className={style.numbers}>
              {numbers.map((el, idx) => (
                <button
                  key={idx}
                  type={'button'}
                  className={classNames(
                    style.button,
                    el.active && style.active,
                    selectedCount === COUNT && !el.active && style.disabled,
                  )}
                  onClick={() => handleNumberClick(idx)}
                >
                  {el.number}
                </button>
              ))}
            </div>
            <button
              type={'button'}
              className={style.button}
              onClick={handleRandomClick}
            >
              <FontAwesomeIcon icon="fa-solid fa-cube" className={style.icon} />
              <span>{t('random')}</span>
            </button>
            <div className={style.actions}>
              <button
                type={'button'}
                className={style.button}
                onClick={handleResetClick}
              >
                <span>{t('reset')}</span>
              </button>
              <button
                type={'button'}
                className={classNames(
                  style.button,
                  selectedCount < COUNT && style.disabled,
                )}
              >
                <span>{t('placebet')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className={style.container}>
          <div className={style.left}>
            <p>Угадайте чётность</p>
            <p>Каких чисел выпадет больше?</p>
          </div>
          <div className={style.right}>
            <div className={style.actions}>
              <button
                type={'button'}
                className={classNames(
                  style.button,
                  selectedType === 1 && style.active,
                )}
                onClick={() => setSelectedType(selectedType === 1 ? 0 : 1)}
              >
                <span>{t('even')}</span>
              </button>
              <button
                type={'button'}
                className={classNames(
                  style.button,
                  selectedType === 2 && style.active,
                )}
                onClick={() => setSelectedType(selectedType === 2 ? 0 : 2)}
              >
                <span>{t('odd')}</span>
              </button>
              <button
                type={'button'}
                className={classNames(
                  style.button,
                  selectedType === 3 && style.active,
                )}
                onClick={() => setSelectedType(selectedType === 3 ? 0 : 3)}
              >
                <span>{t('equally')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.betslip}>1</div>
    </div>
  )
}

export default KENO
