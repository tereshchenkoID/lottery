import { useState } from 'react'
import { useLoading } from 'hooks/useLoading'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Button from 'components/Button'
import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Question = ({id}) => {
  const { t } = useTranslation()
  const [loading] = useLoading(true)
  const [active, setActive] = useState(false)

  if (loading) {
   return <Skeleton
            styles={{
              width: '100%',
              height: 64,
              borderRadius: 12
            }}
          />
  }

  return (
    <div 
      className={
        classNames(
          style.block,
          active && style.active
        )
      }
    >
      <div className={style.top}>
        <h6 onClick={() => setActive(!active)}>{t(`faq.title_${id}`)}</h6>
        <Button
          classes={['primary', 'square', 'md', style.toggle]}
          icon={'fa-solid fa-angle-down'}
          onChange={() => setActive(!active)}
        />
      </div>
      <div className={style.bottom}>
        <p className={style.text}>{t(`faq.text_${id}`)}</p>
      </div>
    </div>
  )
}

export default Question
