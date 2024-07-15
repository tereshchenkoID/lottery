import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from 'context/AuthContext'

import { getData } from 'helpers/api'

import Promo from './Promo'
import Recent from './Recent'
import Main from './Main'
import Quick from './Quick'
import Draw from './Draw'

import style from './index.module.scss'

const Home = () => {
  const { auth } = useSelector(state => state.auth)
  const { games } = useSelector(state => state.games)
  const { isCashbox } = useAuth()
  const [promo, setPromo] = useState([])
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const isLogin = auth.id

  useEffect(() => {
    Promise.all([
      getData('promo/').then(json => {
        setPromo(json)
      }),
      getData('banners/').then(json => {
        setBanners(json)
      }),
    ]).then(() => {
      setLoading(false)
    })
  }, [])

  const sortedGames = useMemo(() => {
    return games.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = []
      }
      acc[item.type].push(item)
      return acc
    }, {})
  }, [games])

  if (loading)
    return false

  return (
    <div className={style.block}>
      {(!isCashbox && banners.length > 0) && <Main data={banners} />}
      {isLogin && <Recent />}
      {(!isCashbox && promo.length > 0) && <Promo data={promo} />}
      {sortedGames[0]?.length > 0 && <Draw data={sortedGames[0]} title={'drawing_games'} />}
      {sortedGames[1]?.length > 0 && <Draw data={sortedGames[1]} title={'quick_games_15'} />}
      {sortedGames[2]?.length > 0 && <Quick data={sortedGames[2]} />}
    </div>
  )
}

export default Home
