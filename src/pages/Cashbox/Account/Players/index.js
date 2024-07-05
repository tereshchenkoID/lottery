import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Players = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.left}>1</div>
        <div className={style.right}>2</div>
      </div>
    </div>
  )
}

export default Players