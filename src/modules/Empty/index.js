import { useTranslation } from 'react-i18next'

import Reference from 'components/Reference'

import style from './index.module.scss'

const Empty = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.decor}>
        <img src={"/img/eyes.webp"} alt="Empty" />
      </div>
      <p>{t('empty')}</p>
      <Reference link={'/'} placeholder={t('buy_ticket')} />
    </div>
  )
}

export default Empty
