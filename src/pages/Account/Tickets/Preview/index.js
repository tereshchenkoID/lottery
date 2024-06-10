import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Button from 'components/Button'
import Loader from 'components/Loader'

import style from './index.module.scss'

const LOTO_7_49 = lazy(() => import('./LOTO_7_49'))
const BINGO = lazy(() => import('./BINGO'))
const KENO = lazy(() => import('./KENO'))

const gameComponents = {
  1: BINGO,
  2: LOTO_7_49,
  3: KENO,
}

const getGames = (active) => {
  const GameComponent = gameComponents[active?.gameId]

  if (!GameComponent) {
    return <div className={style.empty}>Empty</div>
  }

  return (
    <Suspense fallback={<Loader />}>
      <GameComponent data={active} />
    </Suspense>
  )
}

const Preview = ({ active, setActive }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)

  return (
    <div className={style.block}>
      <div className={style.header}>
        <h6>{t('ticket')} #{active.id}</h6>
        <Button
          classes={style.button}
          onChange={() => setActive(null)}
          icon={'fa-solid fa-xmark'}
        />
      </div>
      <div className={style.body}>
        {
          active.win > 0 &&
          <p className={style.win}>
            {t('win')}: <strong>{active.win} {auth.account.currency.symbol}</strong>
          </p>
        }
        <div className={style.ticket}>
          {getGames(active)}
        </div>
      </div>
    </div>
  )
}

export default Preview
