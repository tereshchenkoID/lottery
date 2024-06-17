import i18n from 'i18next'

import style from './index.module.scss'

const Language = ({ handleChange, settings, auth }) => {
  return (
    <div className={style.block}>
      {
        settings?.languages.map(
          (el, idx) =>
            auth.account.language.code !== el.code && (
              <button
                key={idx}
                aria-label={el.text}
                className={style.link}
                onClick={() => {
                  handleChange('language', el)
                  i18n.changeLanguage(el.code)
                  localStorage.setItem('language', JSON.stringify(el))
                }}
              >
                {el.text}
              </button>
            ),
          )
      }
    </div>
  )
}

export default Language
