import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { AppProviders } from 'context/AppProviders'

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

import Toastify from 'components/Toastify'
import Loader from 'components/Loader'
import Header from 'modules/Header'
import Footer from 'modules/Footer'
import Games from 'modules/Games'

import { generateRoutes } from '../router'

import style from './index.module.scss'

const App = () => {
  const { auth } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)
  const [configLoaded, setConfigLoaded] = useState(false)
  const routes = generateRoutes(auth)
  const dispatch = useDispatch()

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
  }, [auth?.id])


  if (loading) return <Loader />

  return (
    <AppProviders>
      <main className={style.main}>
        <Games />
        <Header />
        <div className={style.content}>
          <Suspense fallback={<Loader />}>
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
                );
              })}
            </Routes>
          </Suspense>
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