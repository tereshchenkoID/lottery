import { Link } from 'react-router-dom'
import { useLoading } from 'hooks/useLoading'

import YouTube from 'react-youtube'

import { getDate } from 'helpers/getDate'

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Article = ({ data }) => {
  const [loading] = useLoading(true)

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <article className={style.block}>
      {
        loading &&
        <Skeleton
          styles={{
            position: 'absolute',
            zIndex: '1',
            width: '100%',
            height: '100%',
            borderRadius: 16,
          }}
        />
      }
      <Link
        to={`/news/${data.id}`}
        rel="noreferrer"
        className={style.media}
      >
      {
        data.photo &&
        <img 
          src={data.photo}
          loading={'lazy'}
          alt={'Preview'} 
        />
      }
      {
        data.video &&
        <YouTube videoId={data.video} opts={opts} />
      }
      </Link>
      <p className={style.date}>{getDate(data.date, 3)}</p>
      <h6 className={style.title}>
        <Link
          to={`/news/${data.id}`}
          rel="noreferrer"
          className={style.link}
        >
          {data.title}
        </Link>
      </h6>
      <p className={style.description}>{data.snippet}</p>
    </article>
  )
}

export default Article