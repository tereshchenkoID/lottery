import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'

const FilterGames = ({ data, active, onChange }) => {
  const { t } = useTranslation()

  if (!data) return false

  return (
    <div className={style.block}>
      <button
        className={classNames(style.game, active === -1 && style.active)}
        onClick={() => onChange('gameId', -1)}
      >
        <p className={style.name}>{t('all')}</p>
      </button>
      {
        data?.map((el, idx) =>
          <button
            key={idx}
            className={classNames(style.game, active === el.id && style.active)}
            onClick={() => onChange('gameId', el.id)}
          >
            <span className={style.logo}>
              <img src={el.image} alt={t(`games.${el.id}.title`)} />
            </span>
            <p className={style.name}>{t(`games.${el.id}.title`)}</p>
          </button>
        )
      }
    </div>
  )
}

export default FilterGames
