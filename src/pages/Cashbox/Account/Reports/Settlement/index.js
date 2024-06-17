import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { REPORT_USER_TYPE, REPORT_TYPE } from 'constant/config'

import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { setToastify } from 'store/actions/toastifyAction'

import Button from 'components/Button'
import Password from 'components/Password'
import Loader from 'components/Loader'

import style from './index.module.scss'

const Settlement = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
    type: REPORT_USER_TYPE[0],
    cmd: REPORT_TYPE[0],
    password: '',
  })

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleLoad = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('type', filter.type)
    formData.append('cmd', filter.type === REPORT_USER_TYPE[0] ? REPORT_TYPE[0] : REPORT_TYPE[1])

    if(filter.type === REPORT_USER_TYPE[1]) {
      formData.append('password', filter.password)
      handlePropsChange('password', '')
    }

    postData('reports/settlement/', formData).then(json => {
      if (json.code) {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      } else {
        setData(json)
      }
      setLoading(false)
    })
  }

  const handleSubmit = event => {
    event && event.preventDefault()
    handleLoad(0)
  }

  const convertValue = (key, value) => {
    if(!value) {
      return '-'
    }
    else if(key.indexOf('date') !== -1) {
      return getDate(value)
    }
    else {
      return value
    }
  }

  return (
    <div className={style.block}>
      <div className={style.filter}>
        <Button
          view={'alt'}
          type={'button'}
          placeholder={t('reports.staff')}
          isActive={filter.type === REPORT_USER_TYPE[0]}
          onChange={() => {
            handlePropsChange('type', REPORT_USER_TYPE[0])
            setData({})
          }}
        />
        <Button
          view={'alt'}
          type={'button'}
          placeholder={t('reports.master')}
          isActive={filter.type === REPORT_USER_TYPE[1]}
          onChange={() => {
            handlePropsChange('type', REPORT_USER_TYPE[1])
            setData({})
          }}
        />
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        {
          filter.type === REPORT_USER_TYPE[0]
          ?
            <Button
              type={'submit'}
              placeholder={t('reports.preview')}
            />
          :
            <>
              {
                (filter.type === REPORT_USER_TYPE[1] && Object.keys(data).length == 0) 
                  ?
                    <>
                       <Password
                        placeholder={t('password')}
                        data={filter.password}
                        onChange={value => handlePropsChange('password', value)}
                        isRequired={true}
                      />
                      <Button
                        type={'submit'}
                        placeholder={t('reports.preview')}
                      />
                    </>
                  :
                     <Button
                      placeholder={t('settlement')}
                    />
              }
            </>
        }
      </form>

      <div className={style.container}>
        {
          loading
          ?
            <Loader type={'inline'} />
          :
            <div className={style.table}>
              {
                Object.entries(data).map(([key, value]) => (
                  <div
                    key={key}
                    className={style.row}
                  >
                    <div className={style.cell}>{t(`reports.${key}`)}</div>
                    <div className={style.cell}>
                      <strong>
                        {convertValue(key, value)}
                      </strong>
                    </div>
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Settlement
