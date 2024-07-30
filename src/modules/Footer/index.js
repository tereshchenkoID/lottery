// import { useTranslation } from 'react-i18next'

import Social from 'modules/Social'

import style from './index.module.scss'

const Footer = () => {
  // const { t } = useTranslation()

  return (
    <footer className={style.block}>
      <Social />
      <div className={style.limitation}>18+</div>
    </footer>
  )
}

export default Footer
