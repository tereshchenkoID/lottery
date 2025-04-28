import { useLoading } from 'hooks/useLoading'

import classNames from 'classnames'

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Paragraph = ({
  text,
  children,
  isLoading = false,
  height = false,
  classes = null,
}) => {
  const [loading] = useLoading(isLoading)

  if (loading)
    return <Skeleton
            styles={{
              width: 240,
              height: height || 43,
              borderRadius: 8,
            }}
          />

  return (
    <div
      className={
        classNames(
          style.block,
          classes && classes.map(el => style[el] || el),
        )
      }
    >
      {text || children}
    </div>
  )
}

export default Paragraph
