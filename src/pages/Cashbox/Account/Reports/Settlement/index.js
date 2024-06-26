import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print'

import { postData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { setToastify } from 'store/actions/toastifyAction'

import Button from 'components/Button'
import Password from 'components/Password'
import Loader from 'components/Loader'
import { Print } from './Print'

import style from './index.module.scss'

const REPORT_USER_TYPE = {
  0: 'staff',
  1: 'master'
}

const REPORT_TYPE = {
  0: 'preview',
  1: 'print'
}

const Settlement = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const componentRef = useRef()
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

  const a = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleLoad = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('type', filter.type)
    formData.append('cmd', filter.type === REPORT_USER_TYPE[0] ? REPORT_TYPE[0] : REPORT_TYPE[1])

    if (filter.type === REPORT_USER_TYPE[1]) {
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

  const handlePrint = () => {
    a()
  }

  const handleSubmit = event => {
    event && event.preventDefault()
    handleLoad(0)
  }

  const convertValue = (key, value) => {
    if (!value) {
      return '-'
    }
    else if (key.indexOf('date') !== -1) {
      return getDate(value)
    }
    else {
      return value
    }
  }

  return (
    <div className={style.block}>
      <div className={style.filter}>
        {
          Object.entries(REPORT_USER_TYPE).map(([key, value]) => (
            <Button
              key={key}
              classes={['alt']}
              placeholder={t(`reports.${value}`)}
              isActive={filter.type === REPORT_USER_TYPE[key]}
              onChange={() => {
                handlePropsChange('type', REPORT_USER_TYPE[key])
                setData({})
              }}
            />
          ))
        }
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        {
          Object.keys(data).length === 0
            ?
            filter.type === REPORT_USER_TYPE[0]
              ?
                <Button
                  type={'submit'}
                  placeholder={t('reports.preview')}
                />
              :
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
                onChange={() => handlePrint()}
              />
        }
      </form>
      <div className={style.container}>
        {
          loading
            ?
              <Loader type={'inline'} />
            :
              <>
                <div className={style.print}>
                  <Print data={data} ref={componentRef} />
                </div>
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
              </>
        }
      </div>
    </div>
  )
}

export default Settlement
