import style from './index.module.scss'

const Title = ({ text }) => {
  return (
    <div className={style.block}>
      <h2 className={style.title}>{text}</h2>
    </div>
  )
}

export default Title
