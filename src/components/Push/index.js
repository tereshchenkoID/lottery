import Button from 'components/Button'

import style from './index.module.scss'

const Push = ({ data, action }) => {

  return (
    <div className={style.block}>
      <div className={style.logo}>
        <img
          src={data.notification?.image}
          alt={data.notification?.title}
          className={style.img}
          loading={'lazy'}
        />
      </div>
      <div className={style.content}>
        <h6>{data.notification?.title}</h6>
        <p>{data.notification?.body}</p>
      </div>
      <Button
        classes={['primary', 'square', 'md', style.close]}
        icon={'fa-solid fa-times'}
        onChange={() => action(null)}
      />
    </div>
  )
}

export default Push
