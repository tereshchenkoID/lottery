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
import Card from 'modules/Card'

const Draw = ({ data, title }) => {
  const { t } = useTranslation()

  return (
    <Section>
      <Title text={t(title)} isLoading={true} isNavigation={true} />
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
              <Card data={el} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </Section>
  )
}

export default Draw
