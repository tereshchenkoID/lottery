import { lazy, Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useAuth } from 'context/AuthContext'

import { STATUS_TYPE } from 'constant/config'

import classNames from 'classnames'

import { getDate } from 'helpers/getDate'
import { postData } from 'helpers/api'
import { getHostName } from 'helpers/getHostName'
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
    return <div className={style.instant}>
            <img 
              src={`${getHostName()}/img/render/?id=${active.id}`} 
              className={style.img}
              alt="Results" 
            />
          </div>
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
  filter,
  setFilter = () => {}
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const { games } = useSelector(state => state.games)
  const { isCashbox } = useAuth()
  const isActive = data?.status >= 4

  const game = useMemo(() => games.find(game => game.id === data?.gameId), [games, data])

  const handleSubmit = (e, type) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('q', filter)

    postData(`tickets/${type}/`, formData).then(json => {
      if (json.code === '0') {
        setData(json)

        if(isCashbox) {
          // eslint-disable-next-line no-undef
          window.printAction(JSON.stringify(json), type)
        }
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
              <div>
                <h6>{t('ticket')} #{data.id}</h6>
                <div className={style.date}>{getDate(data?.time)}</div>
              </div>
              <Button
                classes={['primary', style.button]}
                onChange={() => {
                  setActive(null)
                  setFilter('')
                }}
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
                        <>{t(`ticket_status.${STATUS_TYPE[data.status]}`)}: <strong>{data.win} {auth.account.currency.symbol}</strong></>
                      :
                        t(`ticket_status.${STATUS_TYPE[data.status]}`)
                  }
                </p>
              </div>
              {
                data?.round.date &&
                <div className={style.date}>{getDate(data?.round.date)}</div>
              }
              <div className={style.logo}>
                <img src={game.image} alt={t(`games.${game.id}.title`)} loading="lazy"/>
              </div>
              <div className={style.ticket}>
                {getGames(data)}
                {
                  (data.status === 2 || data.status === 5) &&
                    <div 
                      className={
                        classNames(
                          style.status,
                          style[`type-${data.status}`]
                        )
                      }
                    >
                      {t(`ticket_status.${STATUS_TYPE[data.status]}`)}
                    </div>
                }
              </div>
              {
                data.info &&
                <div className={style.info}>{data.info}</div>
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