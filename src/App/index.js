import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import i18n from 'i18next'

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'rc-slider/assets/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { setSettings } from 'store/actions/settingsAction'
import { setGames } from 'store/actions/gamesAction'
import { setAuth } from 'store/actions/authAction'

import Toastify from 'components/Toastify'
import Loader from 'components/Loader'
import Header from 'modules/Header'
import Footer from 'modules/Footer'

import { router } from '../router'

import style from './index.module.scss'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => {
        localStorage.setItem('config', JSON.stringify(config.hostnames))
      })
  }, [])

  useEffect(() => {
    Promise.all([
      dispatch(setAuth()),
      dispatch(setSettings()),
      dispatch(setGames()),
    ]).then(json => {
      i18n.changeLanguage(json[0].account.language.code)
      setLoading(false)
    })
  }, [dispatch])

  if (loading) return <Loader />

  return (
    <main className={style.main}>
      <Header />
      <div className={style.content}>
        <Suspense fallback={<Loader />}>
          <Routes>
            {router.map((route, index) => {
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
      <Tooltip id="tooltip" place={'bottom-start'} />
    </main>
  )
}

export default App
library.add(fab, fas, far)
