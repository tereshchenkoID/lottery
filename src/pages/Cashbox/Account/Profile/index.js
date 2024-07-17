import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { setToastify } from 'store/actions/toastifyAction'
import { postData, getData } from 'helpers/api'

import Button from 'components/Button'
import Loader from 'components/Loader'
import General from './General'
import Security from './Security'

import style from './index.module.scss'

const TAB = ['profile', 'security']

const Profile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState()

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

    const formData = new FormData()
    for (const key in filter[TAB[active]]) {
      if (filter[TAB[active]].hasOwnProperty(key)) {
        formData.append(key, filter[TAB[active]][key])
      }
    }

    postData(`profile/?tab=${active}`, formData).then(json => {
      if (json.code === "0") {
        setFilter({
          ...json,
          security: {
            old_password: '',
            new_password: ''
          }
        })
        dispatch(
          setToastify({
            type: 'success',
            text: t('date_update'),
          }),
        )
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  useEffect(() => {
    getData('profile/').then(json => {
      setFilter({
        ...json,
        security: {
          old_password: '',
          new_password: ''
        }
      })
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
              {
                active === 0 &&
                <General
                  filter={filter}
                  handlePropsChange={handlePropsChange}
                  handleSubmit={handleSubmit}
                />
              }
              {
                active === 1 &&
                <Security 
                  filter={filter}
                  handlePropsChange={handlePropsChange}
                  handleSubmit={handleSubmit}
                />
              }
            </>
      }
    </div>
  )
}

export default Profile