import style from './index.module.scss'

const Skeleton = ({styles}) => {
  return (
    <div 
      className={style.block} 
      style={styles}
    />
  )
}

export default Skeleton