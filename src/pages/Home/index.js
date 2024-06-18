import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { getData } from 'helpers/api'

import style from './index.module.scss'

import Section from 'components/Section'
import Title from 'components/Title'
import Loader from 'components/Loader'
import Banner from 'modules/Banner'
import Game from 'modules/Game'
import Card from 'modules/Card'
import Qr from 'modules/Qr'

const Home = () => {
  const { t } = useTranslation()
  const { games } = useSelector(state => state.games)
  const [promo, setPromo] = useState([])
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className={style.block}>
      {
        loading 
        ?
          <Loader />
        :
          <>
            <Section>
              <div className={style.promo}>
                <div className={style.banners}>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    navigation={true}
                    keyboard={true}
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    modules={[
                      Autoplay,
                      Navigation,
                      Pagination,
                      Mousewheel,
                      Keyboard,
                    ]}
                    className="swiper-wide"
                  >
                    {banners?.map((el, idx) => (
                      <SwiperSlide key={idx}>
                        <Banner data={el} classes={style.banner} link={'/sdf'} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className={style.hidden}>
                  <Qr />
                </div>
              </div>
            </Section>

            <Section>
              <Title text={t('stock')} isLoading={true} />
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={16}
                navigation={true}
                keyboard={true}
                grabCursor={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="swiper-multiply"
              >
                {promo?.map((el, idx) => (
                  <SwiperSlide key={idx}>
                    <Banner data={el} classes={style.stock} link={`/game/${el.gameId}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Section>

            <Section>
              <Title text={t('drawing_games')} isLoading={true} />
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={16}
                navigation={true}
                keyboard={true}
                grabCursor={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="swiper-multiply"
              >
                {sortedGames[0]?.map((el, idx) => (
                  <SwiperSlide key={idx}>
                    <Card data={el} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Section>

            <Section>
              <Title text={t('quick_games_15')} isLoading={true} />
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={16}
                navigation={true}
                keyboard={true}
                grabCursor={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="swiper-multiply"
              >
                {sortedGames[1]?.map((el, idx) => (
                  <SwiperSlide key={idx}>
                    <Card data={el} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Section>

            <Section>
              <Title text={t('instant_games')} isLoading={true} />
              <div className={style.games}>
                {sortedGames[2]?.map((el, idx) => (
                  <Game key={idx} data={el} />
                ))}
              </div>
            </Section>
          </>
      }
    </div>
  )
}

export default Home
