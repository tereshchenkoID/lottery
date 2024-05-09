import style from './index.module.scss'

const Qr = () => {
  return (
    <div className={style.block}>
      <div className={style.code} />
      <p className={style.text}>
        Scan the QR code and download the application
      </p>
    </div>
  )
}

export default Qr
