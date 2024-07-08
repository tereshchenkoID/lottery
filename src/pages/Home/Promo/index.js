import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import Section from 'components/Section'
import Title from 'components/Title'
import Banner from 'modules/Banner'

import style from '../index.module.scss'

const Promo = ({ data }) => {
  const { t } = useTranslation()

  return (
    <Section>
      <Title text={t('stock')} isLoading={true} isNavigation={true} />
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={16}
        navigation={true}
        keyboard={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="swiper-multiply"
      >
        {
          data?.map((el, idx) => (
            <SwiperSlide key={idx}>
              <Banner data={el} classes={style.stock} link={`/game/${el.gameId}`} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </Section>
  )
}

export default Promo
