import { lazy, Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import classNames from 'classnames'

import { getDate } from 'helpers/getDate'
import { postData } from 'helpers/api'
import { setToastify } from 'store/actions/toastifyAction'

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

const TicketPreview = ({ 
  data, 
  setData, 
  active, 
  setActive,
  filter
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const { games } = useSelector(state => state.games)
  const currentDate = new Date().getTime()
  const isActive = data?.win !== "0" && active?.time < currentDate

  const game = useMemo(() => games.find(game => game.id === data?.gameId), [games, data])

  const handleSubmit = (e, type) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('q', filter)

    postData(`tickets/${type}/`, formData).then(json => {
      if (json.code === '0') {
        setData(json)
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

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
                classes={['primary', style.button]}
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
              <div className={style.date}>{getDate(data?.time)}</div>
              <div className={style.logo}>
                <img src={game.image} alt={t(`games.${game.id}.title`)} loading="lazy"/>
              </div>
              <div className={style.ticket}>
                {getGames(data)}
              </div>
              {
                data.info &&
                <div>{data.info}</div>
              }
              {
                data?.actions &&
                <div className={style.actions}>
                  {
                    data.actions?.map((el, idx) => 
                      <Button
                        key={idx}
                        classes={['primary', style.action]}
                        onChange={(e) => handleSubmit(e, el)}
                        placeholder={t(el)}
                      />
                    )
                  }
                </div>
              }
            </div>
          </>
      }
    </div>
  )
}

export default TicketPreview