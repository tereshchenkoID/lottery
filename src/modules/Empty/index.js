import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Empty = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.decor}>
        <img src={"/image/eyes.webp"} alt="Empty" />
      </div>
      <p>{t('empty')}</p>
    </div>
  )
}

export default Empty
