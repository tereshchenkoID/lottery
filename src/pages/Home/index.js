import { useEffect, useState } from 'react'
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
import Card from 'modules/Card'
import Qr from 'modules/Qr'
import Games from '../../modules/Games'

const Home = () => {
  const [promo, setPromo] = useState([])
  const [banners, setBanners] = useState([])
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getData('promo/').then(json => {
        setPromo(json)
      }),
      getData('banners/').then(json => {
        setBanners(json)
      }),
      getData('cards/').then(json => {
        setCards(json)
      }),
    ]).then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className={style.block}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Games />

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
                      <Banner data={el} classes={style.banner} />
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
            <Title text={'Stock'} />
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
                  <Banner data={el} classes={style.stock} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Section>

          <Section>
            <Title text={'Winnings every 15 minutes'} />
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={16}
              navigation={true}
              keyboard={true}
              grabCursor={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="swiper-multiply"
            >
              {cards?.map((el, idx) => (
                <SwiperSlide key={idx}>
                  <Card data={el} classes={style.card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Section>
        </>
      )}
    </div>
  )
}

export default Home
