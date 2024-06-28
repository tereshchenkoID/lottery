import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

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
  const { scan } = useSelector(state => state.scan)
  const [filter, setFilter] = useState('')
  const [data, setData] = useState(null)
  const [active, setActive] = useState(null)

  const load = (q, type) => {
    const formData = new FormData()
    formData.append('q', q || filter)
    formData.append('scan', type || 0)

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

  const handleSubmit = e => {
    e.preventDefault()
    load()
  }

  useEffect(() => {
    if(scan) {
      const q = scan?.scans?.[0]?.value
      load(q, 1)
      setFilter('')
    }
  }, [scan])

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
