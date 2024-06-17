import style from './index.module.scss'

const Timezone = ({ handleChange, settings, auth }) => {
  return (
    <div className={style.block}>
      {
        settings?.timezone.map(
          (el, idx) =>
            auth.account.timezone.code !== el.code && (
              <button
                key={idx}
                aria-label={el.text}
                className={style.link}
                onClick={() => 
                  handleChange('timezone', el)
                }
              >
                {el.text}
              </button>
            ),
        )
      }
    </div>
  )
}

export default Timezone
