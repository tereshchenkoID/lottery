import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

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
    <Suspense fallback={<Loader type={'inline'} />}>
      <GameComponent data={active} />
    </Suspense>
  )
}

const TicketPreview = ({ data, active, setActive }) => {
  const { t } = useTranslation()
  const { auth } = useSelector(state => state.auth)
  const currentDate = new Date().getTime()
  const isActive = data?.win > 0 && active?.time < currentDate

  return (
    <div className={classNames(style.block, active && style.active)}>
      {
        active &&
          <>
            <button
              type={'button'}
              className={style.toggle}
              onClick={() => setActive(null)}
            />
            <div className={style.header}>
              <h6>{t('ticket')} #{data.id}</h6>
              <Button
                classes={style.button}
                onChange={() => setActive(null)}
                icon={'fa-solid fa-xmark'}
              />
            </div>
            <div className={style.body}>
              <div className={style.meta}>
                <p>{t('draw')}: <strong>{data.round?.id}</strong></p>
                <p>
                  {
                    isActive
                      ?
                        <>{t('win')}: <strong>{data.win} {auth.account.currency.symbol}</strong></>
                      :
                        t('no_win')
                  }
                </p>
              </div>
              <div className={style.ticket}>
                {getGames(data)}
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default TicketPreview