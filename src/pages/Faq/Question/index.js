import { useState } from 'react'
import { useLoading } from 'hooks/useLoading'

import classNames from 'classnames'

import Button from 'components/Button'
import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Question = ({ data }) => {
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
        <h6 onClick={() => setActive(!active)}>{data.title}</h6>
        <Button
          classes={['primary', 'square', 'md', style.toggle]}
          icon={'fa-solid fa-angle-down'}
          onChange={() => setActive(!active)}
        />
      </div>
      <div className={style.bottom}>
        <p className={style.text}>{data.text}</p>
      </div>
    </div>
  )
}

export default Question
