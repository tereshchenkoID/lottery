import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import classNames from 'classnames'

import Paragraph from 'components/Paragraph'
import Title from 'components/Title'
import Banner from './Banner'

import style from './index.module.scss'

const Bonuses = () => {
  const { t } = useTranslation()
  const { games } = useSelector(state => state.games)
  const { auth } = useSelector(state => state.auth)
  const [data, setData] = useState({
    top: [],
    bottom: []
  })

  useEffect(() => {
    const sorted = games.reduce((acc, item) => {
      if (item.bonus) {
        if (parseFloat(item.betCost) <= parseFloat(auth.account.bonus)) {
          acc.top.push(item)
        } else {
          acc.bottom.push(item)
        }
      }
      return acc
    }, { top: [], bottom: [] })

    setData(sorted)
  }, [])

  return (
    <div className={style.block}>
      <div className={style.section}>
        <Title text={t('pages.bonuses.title_1')} classes={[style.title]}/>
        <Paragraph text={t('pages.bonuses.description_1')} />
      </div>
      {
        data?.top.length > 0 &&
        <div className={style.section}>
          <div 
            className={
              classNames(
                style.description, 
                style.alt
              )
            }
          >
            <Title text={t('pages.bonuses.title_2')} classes={[style.title]}/>
            <Paragraph text={t('pages.bonuses.description_2')}/>
          </div>
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
              data?.top.map((el, idx) => (
                <SwiperSlide key={idx}>
                  <Banner
                    data={el}
                    link={`/game/${el.id}`}
                    size={'lg'}
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      }
      {
        data?.bottom.length > 0 &&
        <div className={style.section}>
          <div className={style.description}>
            <Title text={t('pages.bonuses.title_3')} classes={[style.title]}/>
            <Paragraph text={t('pages.bonuses.description_3')} />
          </div>
          <div className={style.banners}>
            {
              data?.bottom.map((el, idx) => (
                <Banner
                  key={idx}
                  data={el}
                  link={`/game/${el.id}`}
                  size={'sm'}
                />
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Bonuses
