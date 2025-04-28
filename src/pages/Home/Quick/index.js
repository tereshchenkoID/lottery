import { useTranslation } from 'react-i18next'

import Section from 'components/Section'
import Title from 'components/Title'
import Game from 'modules/Game'

import style from '../index.module.scss'

const Quick = ({ data }) => {
  const { t } = useTranslation()

  return (
    <Section>
      <Title text={t('instant_games')} isLoading={true} isNavigation={true} />
      <div className={style.games}>
        {
          data?.map((el, idx) => (
            <Game key={idx} data={el} />
          ))
        }
      </div>
    </Section>
  )
}

export default Quick
