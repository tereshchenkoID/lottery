import { useLoading } from 'hooks/useLoading';

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Title = ({ text, isLoading }) => {
  const [loading] = useLoading(isLoading);

  return (
    <div className={style.block}>
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
