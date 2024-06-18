import { Link } from 'react-router-dom'

import { useImageLoader } from 'hooks/useImageLoader';

import classNames from 'classnames'

import Skeleton from 'components/Skeleton';

import style from './index.module.scss'

const Banner = ({ data, link, classes = null }) => {
  const loading = useImageLoader(data.image)

  return (
    <Link
      to={link}
      rel="noreferrer"
      className={classNames(style.block, classes)}
    >
      {
        loading
          ?
            <Skeleton />
          :
            <img src={data.image} alt={data.alt} loading={'lazy'} />
      }
    </Link>
  )
}

export default Banner