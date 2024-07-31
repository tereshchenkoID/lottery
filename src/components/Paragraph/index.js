import { useLoading } from 'hooks/useLoading';

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Paragraph = ({ text, children, isLoading }) => {
  const [loading] = useLoading(isLoading)

  return (
    <div className={style.block}>
      {
        loading
          ?
            <Skeleton 
              styles={{
                height: 43,
                borderRadius: 8,
              }}
            />
          :
            <p className={style.text}>{text || children}</p>
      }
    </div>
  )
}

export default Paragraph
