import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { NAVIGATION } from 'constant/config'

import classNames from 'classnames'

import { setAuth } from 'store/actions/authAction'
import { setToastify } from 'store/actions/toastifyAction'
import { postData, getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'

import Phone from 'components/Phone'
import Field from 'components/Field'
import Button from 'components/Button'
import Password from 'components/Password'
import Uploader from 'components/Uploader'
import Loader from 'components/Loader'
import Select from 'components/Select'

import style from './index.module.scss'

const TAB = ['profile', 'identify', 'security', 'payement']

const Profile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState()
  const [countries, setCountries] = useState([])
  const [uploadedPhotos, setUploadedPhotos] = useState([])

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
    // e.preventDefault()

    // const formData = new FormData()
    // formData.append('username', filter.username)
    // formData.append('email', filter.email)
    // formData.append('date', filter.date)
    // formData.append('phone', filter.phone)
    // formData.append('password', filter.password)

    // postData('register/', formData).then(json => {
    //   console.log(json)
    //   if (json.id) {
    //     dispatch(setAuth(json)).then(() => {
    //       navigate('/')
    //     })
    //   } else {
    //     dispatch(
    //       setToastify({
    //         type: 'error',
    //         text: json.error_message,
    //       }),
    //     )
    //   }
    // })
  }

  useEffect(() => {
    Promise.all([
      getData('profile/').then(json => {
        setFilter({
          ...json,
          security: {
            password_old: '',
            password_new: ''
          }
        })
      }),
      getData('countries/').then(json => {
        setCountries(json)
      }),
    ]).then(() => {
      setLoading(false)
    })
  }, [])

  const handlePhotoUpload = (files) => {
    setUploadedPhotos(files)
  };

  return (
    <div classes={style.block}>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
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
              <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.grid}>
                  <Field
                    type={'text'}
                    placeholder={t('name')}
                    data={filter.profile.name}
                    onChange={value => handlePropsChange('profile.name', value)}
                    isRequired={true}
                    isDisabled={filter.profile.isVerify}
                  />
                  <Field
                    type={'text'}
                    placeholder={t('surname')}
                    data={filter.profile.surname}
                    onChange={value => handlePropsChange('profile.surname', value)}
                    isRequired={true}
                    isDisabled={filter.profile.isVerify}
                  />
                  <Field
                    type={'text'}
                    placeholder={t('username')}
                    data={filter.profile.username}
                    onChange={value => handlePropsChange('profile.username', value)}
                    isRequired={true}
                    isDisabled={true}
                  />
                  <Phone
                    data={filter.phone}
                    onChange={value => handlePropsChange('profile.phone', value)}
                    isRequired={true}
                  />
                  <Field
                    type={'date'}
                    placeholder={t('birth_day')}
                    data={filter.profile.date}
                    onChange={value => handlePropsChange('profile.date', value)}
                    isRequired={true}
                    max={getDate(new Date(), 3)}
                  />
                  <div className={style.row}>
                    <Field
                      type={'email'}
                      placeholder={t('email')}
                      data={filter.profile.email}
                      onChange={value => handlePropsChange('profile.email', value)}
                      isRequired={true}
                    />
                    <Button
                      placeholder={t('verify.verify')}
                    />
                  </div>
                  <Button
                    type={'submit'}
                    placeholder={t('save')}
                  />
                </div>
              </form>
            }
            {
              active === 1 &&
              <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.grid}>
                  <Uploader onChange={handlePhotoUpload} />
                  <Select
                    placeholder={t('country')}
                    options={countries.map(item => ({
                      value: item.alpha_2,
                      label: item.name,
                    }))}
                    data={filter.identify.country}
                    onChange={value => handlePropsChange('identify.country', value)}
                  />
                  <Field
                    type={'text'}
                    placeholder={t('state')}
                    data={filter.identify.state}
                    onChange={value => handlePropsChange('identify.state', value)}
                    isRequired={true}
                  />
                  <Field
                    type={'text'}
                    placeholder={t('city')}
                    data={filter.identify.city}
                    onChange={value => handlePropsChange('identify.city', value)}
                    isRequired={true}
                  />
                  <Field
                    type={'text'}
                    placeholder={t('address')}
                    data={filter.identify.address}
                    onChange={value => handlePropsChange('identify.address', value)}
                    isRequired={true}
                  />
                  <Field
                    type={'text'}
                    placeholder={t('postcode')}
                    data={filter.identify.postcode}
                    onChange={value => handlePropsChange('identify.postcode', value)}
                    isRequired={true}
                  />
                  <Button
                    type={'submit'}
                    placeholder={t('save')}
                  />
                </div>
              </form>
            }
            {
              active === 2 &&
              <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.grid}>
                  <Password
                    placeholder={t('password_old')}
                    data={filter.security.password_old}
                    onChange={value => handlePropsChange('security.password_old', value)}
                  />
                  <div>
                    <Password
                      placeholder={t('password_new')}
                      data={filter.security.password_new}
                      onChange={value => handlePropsChange('security.password_new', value)}
                    />
                    <p className={style.label}>{t('validation.password_length')}</p>
                  </div>
                  <Button
                    type={'submit'}
                    placeholder={t('save')}
                  />
                </div>
              </form>
            }
            {
              active === 3 &&
              <form onSubmit={handleSubmit} className={style.form}>
                <p>Payments method</p>
              </form>
            }
          </>
        )
      }
    </div>
  )
}

export default Profile