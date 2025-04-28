import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Picture from 'components/Picture'

import style from './index.module.scss'

const Logo = ({ setShow }) => {
  const { settings } = useSelector(state => state.settings)

  return (
    <Link
      to={'/'}
      rel="noreferrer"
      className={style.block}
      aria-label="Logo"
      onClick={() => {
        setShow(false)
      }}
    >
      <Picture
        src={settings.assets.logo}
        alt={"logo"}
      />
    </Link>
  )
}

export default Logo
