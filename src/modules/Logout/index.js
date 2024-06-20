import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { setAuth } from 'store/actions/authAction'
import { getData } from 'helpers/api'

import Button from 'components/Button'

const Logout = ({ onChange = () => {}, classes }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    getData('logout/').then(json => {
      dispatch(setAuth(json))
      onChange()
      navigate('/')
      window.location.reload()
    })
  }

  return (
    <Button
      placeholder={t('logout')}
      onChange={handleLogout}
      classes={classes}
    />
  )
}

export default Logout