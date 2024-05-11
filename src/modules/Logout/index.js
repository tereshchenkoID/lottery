import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setAuth } from 'store/actions/authAction'
import { getData } from 'helpers/api'

import Button from 'components/Button'

const Logout = ({ onChange = () => {}, classes }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleLogout = () => {
    getData('logout/').then(json => {
      dispatch(setAuth(json))
      onChange()
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
