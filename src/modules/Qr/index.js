import { useLoading } from 'hooks/useLoading';

import Skeleton from 'components/Skeleton'

import style from './index.module.scss'

const Qr = ({isLoading}) => {
  const [loading] = useLoading(isLoading)

  return (
    <div className={style.block}>
      {
        loading
        ?
          <Skeleton />
        :
          <div className={style.content}>
            <div className={style.code} />
            <p className={style.text}>
              Scan the QR code and download the application
            </p>
          </div>
      }
    </div>
  )
}

export default Qr
