import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { AppProviders } from 'context/AppProviders'
import usePerformanceObserver from 'hooks/usePerformanceObserver'

import i18n from 'i18next'

import 'rc-slider/assets/index.css'
import 'react-phone-input-2/lib/style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { setSettings } from 'store/actions/settingsAction'
import { setGames } from 'store/actions/gamesAction'
import { setAuth } from 'store/actions/authAction'
import { getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'

import Toastify from 'components/Toastify'
import Header from 'modules/Header'
import Footer from 'modules/Footer'
import Games from 'modules/Games'
import Draws from 'modules/Draws'
import DelayedSuspense from './DelayedSuspense'

import { generateRoutes } from '../router'

import style from './index.module.scss'

const App = () => {
  // Performance content
  usePerformanceObserver()
  
  const { auth } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)
  const [configLoaded, setConfigLoaded] = useState(false)
  const routes = generateRoutes(auth)
  const dispatch = useDispatch()

  const [timer, setTimer] = useState({
    time: new Date().getTime(),
  })

  const worker = useMemo(() => new Worker('./sw.js'), [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('sw.js')
          .then(() => {
            console.log('[SW] registered:')
          })
          .catch(() => {
            console.error('[SW] registration failed:')
          })
      })
    }
  }, [worker])

  useEffect(() => {
    if ('Worker' in window) {
      worker.addEventListener('message', event => {
        setTimer(event.data)
      })

      worker.postMessage({
        type: 'start',
        time: new Date().getTime(),
      })

      return () => {
        worker.postMessage('stop')
      }
    } else {
      console.log('SW not supported')
    }
  }, [worker])

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => {
        localStorage.setItem('config', JSON.stringify(config.hostnames))
        setConfigLoaded(true)
      })
  }, [])

  useEffect(() => {
    if (configLoaded) {
      Promise.all([
        dispatch(setAuth()),
        dispatch(setSettings()),
        dispatch(setGames()),
      ]).then(json => {
        const storedLanguage = JSON.parse(localStorage.getItem('language'))?.code
        const defaultLanguage = json[0]?.account?.language?.code

        i18n.changeLanguage(storedLanguage || defaultLanguage)
        setLoading(false)
      })
    }
  }, [configLoaded, dispatch])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(auth?.id) {
        let a = auth
        getData('balance/').then(json => {
          if(json.code === "0") {
            a.account.balance = json.account.balance
            a.account.bonus = json.account.bonus

            dispatch(setAuth(a))
          }
        })
      }
    }, 30000)

    return () => clearInterval(intervalId);
  }, [dispatch, auth?.id])

  if (loading) return false
  
  return (
    <AppProviders>
      <main className={style.main}>
        {getDate(timer.time)}
        <Draws />
        <Games />
        <Header />
        <div className={style.content}>
          <DelayedSuspense>
            <Routes>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children && route.children.map((childRoute, childIndex) => {
                      return (
                        <Route
                          key={childIndex}
                          path={childRoute.path}
                          element={childRoute.element}
                        />
                      );
                    })}
                  </Route>
                )
              })}
            </Routes>
          </DelayedSuspense>
        </div>
        <Footer />
        <Toastify />
        <Tooltip id={'tooltip'} place={'bottom-start'} />
      </main>
    </AppProviders>
  )
}

export default App
library.add(
  fas,
  fab, 
  far
)