import { useMemo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules'

import { NAVIGATION } from 'constant/config'

import Container from 'components/Container'
import Paragraph from 'components/Paragraph'
import Title from 'components/Title'
import Card from 'modules/Card'
import Media from './Media'

import style from './index.module.scss'

const Broadcast = () => {
  const { t } = useTranslation()
  const { gameId } = useParams()
  const { games } = useSelector(state => state.games)
  const [selectedGame, setSelectedGame] = useState(null)
  const data = useMemo(() => games.filter(el => el.video), [games])

  useEffect(() => {
    if (gameId && games.length > 0) {
      const game = games.find(el => el.id === parseInt(gameId))
      setSelectedGame(game)
    }
  }, [gameId, games])

  return (
    <Container>
      <div className={style.grid}>
        <div>
          <Title text={t(NAVIGATION.broadcast.text)} />
          <Title text={t('pages.broadcast.title_1')} isLoading={true} />
          <Paragraph text={t('pages.broadcast.description_1')} isLoading={true} />
        </div>
        <Media data={selectedGame} />
        <div>
          <Title text={t('pages.broadcast.title_2')} isLoading={true} isNavigation={true} />
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
                  <Card 
                    data={el}
                    link={'broadcast'}
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </Container>
  )
}

export default Broadcast