import { useLoading } from 'hooks/useLoading';

import classNames from 'classnames';

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Title = ({ text, isLoading, isNavigation = false }) => {
  const [loading] = useLoading(isLoading);

  return (
    <div className={classNames(style.block, isNavigation && style.alt)}>
      {
        loading
          ?
            <Skeleton 
              styles={{
                width: 240,
                height: 43,
                borderRadius: 8,
              }}
            />
          :
            <h2 className={style.title}>{text}</h2>
      }
    </div>
  )
}

export default Title
