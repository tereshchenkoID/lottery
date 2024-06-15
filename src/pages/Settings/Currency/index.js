import style from './index.module.scss'

const Currency = ({ handleChange, settings, auth }) => {
  return (
    <div className={style.block}>
      {
        settings?.currencies.map(
          (el, idx) =>
            auth.account.language.code !== el.code && (
              <button
                key={idx}
                aria-label={el.text}
                className={style.link}
                onClick={() => 
                  handleChange('currency', el)
                }
              >
                {el.code} - {el.symbol}
              </button>
            ),
        )
      }
    </div>
  )
}

export default Currency
