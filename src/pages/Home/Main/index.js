import { useWindowWidth } from 'context/WindowWidthContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import { BREAKPOINTS } from 'constant/config'

import Section from 'components/Section'
import Banner from 'modules/Banner'
import Qr from 'modules/Qr'

import style from '../index.module.scss'

const Main = ({ data }) => {
  const { windowWidth } = useWindowWidth()
  const isMobile = windowWidth < BREAKPOINTS.lg

  return (
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
            {
              data?.map((el, idx) => (
                <SwiperSlide key={idx}>
                  <Banner data={el} classes={style.banner} link={el.link} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        {
          !isMobile &&
          <Qr isLoading={true} />
        }
      </div>
    </Section>
  )
}

export default Main