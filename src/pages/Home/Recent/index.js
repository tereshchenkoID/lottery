import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import { getData } from 'helpers/api'

import Section from 'components/Section'
import Title from 'components/Title'
import GameSmall from 'modules/GameSmall'

const Recent = ({ data }) => {
  const { t } = useTranslation()
  const { games } = useSelector(state => state.games)
  const [topgames, setTopgames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData('topgames/').then(json => {
      setTopgames(json)
      setLoading(false)
    })
  }, [])

  const filterGames = useMemo(() => {
    return topgames?.map(el => {
      return games.find(game => game.id === el)
    });
  }, [topgames, games])

  if (loading)
    return false

  return (
    <Section>
      <Title text={t('recent_purchases')} isLoading={true} />
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={16}
        keyboard={true}
        grabCursor={true}
        modules={[Pagination, Mousewheel, Keyboard]}
        className="swiper-multiply"
      >
        {
          filterGames.map((el, idx) => (
            <SwiperSlide key={idx}>
              <GameSmall data={el} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </Section>
  )
}

export default Recent
