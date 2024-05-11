import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import style from './index.module.scss'

const Account = () => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.id) {
      navigate('/', { replace: true })
    }
  }, [auth.id, navigate])

  return (
    <div className={style.block}>
      <p>Profile</p>
    </div>
  )
}

export default Account
