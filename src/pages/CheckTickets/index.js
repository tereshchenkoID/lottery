import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { NAVIGATION } from 'constant/config'

import { postData } from 'helpers/api'
import { setToastify } from 'store/actions/toastifyAction'

import Container from 'components/Container'
import Field from 'components/Field'
import Button from 'components/Button'
import Title from 'components/Title'
import TicketPreview from 'modules/TicketPreview'

import style from './index.module.scss'

const CheckTickets = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')
  const [data, setData] = useState(null)
  const [active, setActive] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('q', filter)

    postData('tickets/check/', formData).then(json => {
      if (json.code === '0') {
        setData(json)
        setActive(true)
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

  return (
    <Container classes={style.block}>
      <div
        className={classNames(style.shadow, active && style.active)}
        onClick={() => {
          setActive(null)
        }}
      />
      <div className={style.grid}>
        <div className={style.left}>
          <Title text={t(NAVIGATION.check_ticket.text)} />
          <form onSubmit={handleSubmit} className={style.form}>
            <Field
              type={'number'}
              placeholder={t('ticket')}
              data={filter}
              onChange={value => setFilter(value)}
              isRequired={true}
            />
            <Button 
              type={'submit'} 
              placeholder={t('search')} 
            />
          </form>
        </div>
        <div className={style.right}>
          <TicketPreview 
            data={data} 
            setData={setData}
            active={active} 
            setActive={setActive} 
            filter={filter}
          />
        </div>
      </div>
    </Container>
  )
}

export default CheckTickets
