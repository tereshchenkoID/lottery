import { useSelector } from 'react-redux'
import { useLoading } from 'hooks/useLoading'

import YouTube from 'react-youtube'

import Skeleton from 'components/Skeleton'

import { VIDEO_TYPE } from 'constant/config'

import style from './index.module.scss'

const Media = ({ data }) => {
  const { settings } = useSelector(state => state.settings)
  const [loading] = useLoading(true)

  const onPlayerReady = (event) => {
    event.target.mute()
    event.target.playVideo()
  }

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  }

  if (loading)
    return <Skeleton
            styles={{
              aspectRatio: '16/9',
              borderRadius: 24,
            }}
          />

  return (
    <div className={style.block}>
      {
        (!data || !data?.video) &&
        <img 
          src={settings.pages.broadcast.picture.url}
          loading={'lazy'}
          alt={'Preview'} 
        />
      }
      {
        data?.video?.type === VIDEO_TYPE.youtube &&
        <YouTube videoId={data?.video?.url} opts={opts} onReady={onPlayerReady} />
      }
      {
        data?.video?.type === VIDEO_TYPE.iframe &&
        <iframe
          className={style.iframe}
          src={data?.video?.url}
          title={'Preview'}
        />
      }
      {
        data?.video?.type === VIDEO_TYPE.flow &&
        <video
          src={data?.video?.url}
          preload={'auto'}
          muted={true}
          autoPlay={true}
          controls={true}
        />
      }
    </div>
  )
}

export default Media