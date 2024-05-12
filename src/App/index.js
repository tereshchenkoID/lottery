import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import i18n from 'i18next'

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

import style from './index.module.scss'
import { router } from '../router'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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
            {router.map(item => (
              <Route
                key={new Date().getTime()}
                path={item.path}
                element={item.element}
              />
            ))}
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <Toastify />
    </main>
  )
}

export default App
library.add(fab, fas, far)
