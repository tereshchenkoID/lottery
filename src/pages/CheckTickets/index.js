import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useLoading } from 'hooks/useLoading'

import classNames from 'classnames'

import { NAVIGATION } from 'constant/config'

import { postData } from 'helpers/api'
import { setToastify } from 'store/actions/toastifyAction'

import Container from 'components/Container'
import Field from 'components/Field'
import Skeleton from 'components/Skeleton'
import Button from 'components/Button'
import Title from 'components/Title'
import TicketPreview from 'modules/TicketPreview'
import Breadcrumbs from 'modules/Breadcrumbs'

import style from './index.module.scss'

const LOADERS = [48, 48]

const CheckTickets = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { scan } = useSelector(state => state.scan)
  const [loading] = useLoading(true)
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
      setFilter(q)
      load(q, 1)
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
          <Breadcrumbs
            data={[
              NAVIGATION.home,
              scan && {
                text: 'back',
                link: sessionStorage.getItem('p_r') || -1
              }
            ].filter(item => item)}
          />
          <Title text={t(NAVIGATION.check_ticket.text)} />
          <form onSubmit={handleSubmit} className={style.form}>
            {
              loading
              ?
                LOADERS.map((el, idx) =>
                  <Skeleton
                    key={idx}
                    styles={{
                      maxWidth: 512,
                      width: '100%',
                      height: el,
                      borderRadius: 8,
                    }}
                  />
                )
              :
                <>
                  <Field
                    type={'text'}
                    placeholder={t('ticket')}
                    data={filter}
                    onChange={value => setFilter(value)}
                    isRequired={true}
                  />
                  <Button 
                    type={'submit'} 
                    placeholder={t('search')} 
                  />
                </>
            }
          </form>
        </div>
        <div className={style.right}>
          <TicketPreview 
            data={data} 
            setData={setData}
            active={active} 
            setActive={setActive} 
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
    </Container>
  )
}

export default CheckTickets
