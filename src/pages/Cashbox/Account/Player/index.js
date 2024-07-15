import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getData } from 'helpers/api'

import Button from 'components/Button'
import Loader from 'components/Loader'
import General from './General'
import Billing from './Billing'

import style from './index.module.scss'

const TAB = ['profile', 'billing']

const Player = () => {
  const { t } = useTranslation()
  const { id, token } = useParams()
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState()
  const [loading, setLoading] = useState(true)

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => {
      const keys = fieldName.split('.')
      const lastKey = keys.pop()

      let temp = { ...prevData }
      let current = temp

      keys.forEach(key => {
        if (!current[key]) {
          current[key] = {}
        }
        current = current[key]
      });

      current[lastKey] = fieldValue

      return temp
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  useEffect(() => {
    getData(`players/details/${token}/${id}`).then(json => {
      setFilter(json)
      setLoading(false)
    })
  }, [])

  return (
    <div className={style.block}>
      {
        loading 
          ?
            <Loader />
          :
            <>
              <div className={style.tab}>
                {
                  TAB.map((el, idx) => (
                    <Button
                      key={idx}
                      placeholder={t(el)}
                      classes={['alt', style.button]}
                      isActive={active === idx}
                      onChange={() => setActive(idx)}
                    />
                  ))
                }
              </div>
              <div>
                {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
                {/* <p>ID: {id}</p> */}
                {/* <p>Token: {token}</p> */}
                {
                  active === 0 &&
                  <General filter={filter} />
                }
                {
                  active === 1 &&
                  <Billing
                    filter={filter}
                    handlePropsChange={handlePropsChange}
                  />
                }
              </div>
            </>
      }
    </div>
  )
}

export default Player