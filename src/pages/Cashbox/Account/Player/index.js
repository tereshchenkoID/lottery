import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getData } from 'helpers/api'

import Tab from 'components/Tab'
import Loader from 'components/Loader'
import General from './General'
import Billing from './Billing'

import style from './index.module.scss'

const TAB = ['profile', 'billing']

const Player = () => {
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
            <Loader type={'inline'} />
          :
            <>
              <Tab
                data={TAB}
                active={active}
                setActive={setActive}
              />
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
            </>
      }
    </div>
  )
}

export default Player