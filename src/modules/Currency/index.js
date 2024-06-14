import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { setToastify } from 'store/actions/toastifyAction'
import { setAuth } from 'store/actions/authAction'
import { postData } from 'helpers/api'

import classNames from 'classnames'

import style from './index.module.scss'

const Currency = () => {
  const { settings } = useSelector(state => state.settings)
  const { auth } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => {
      setActive(false)
    },
    {
      buttonRef: buttonRef,
    },
  )

  const handleChange = data => {
    let a = auth
    a.account.currency = data

    if (a.id) {
      const formData = new FormData()
      formData.append('auth', JSON.stringify(a))

      postData('account/', formData).then(json => {
        if (json.code === 0) {
          dispatch(setAuth(a))
          dispatch(
            setToastify({
              type: 'success',
              text: json.message,
            }),
          )
          navigate(window.location.pathname, { replace: true })
        } else {
          dispatch(
            setToastify({
              type: 'error',
              text: json.error_message,
            }),
          )
        }
      })
    }
  }

  return (
    <div
      ref={blockRef}
      className={classNames(style.block, active && style.active)}
      onClick={() => {
        setActive(!active)
      }}
    >
      <div ref={buttonRef} className={style.selected}>
        <span>{auth.account.balance}</span>
        <span>{auth.account.currency.symbol}</span>
        {settings?.currencies?.length > 1 && (
          <FontAwesomeIcon
            icon="fa-solid fa-angle-down"
            className={style.arrow}
          />
        )}
      </div>
      <div className={style.dropdown}>
        {settings?.currencies.map(
          (el, idx) =>
            auth.account.language.code !== el.code && (
              <button
                key={idx}
                aria-label={el.text}
                className={style.link}
                onClick={() => {
                  handleChange(el)
                }}
              >
                {el.code} - {el.symbol}
              </button>
            ),
        )}
      </div>
    </div>
  )
}

export default Currency
