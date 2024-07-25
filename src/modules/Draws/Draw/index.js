import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { removeDraw } from 'store/actions/drawAction'
import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Button from 'components/Button'
import Reference from 'components/Reference'
import Checkbox from 'components/Checkbox'

import style from './index.module.scss'
import { NAVIGATION } from 'constant/config'

const Draw = ({ data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(removeDraw(data.id))
  }

  const handleNotification = () => {
    const formData = new FormData()
    formData.append('gameId', data.id)
    formData.append('hide', 1)

    postData('stream/settings/', formData).then(json => {
      if (json.code === '0') {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        )
        dispatch(removeDraw(data.id))
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
    <div className={style.block}>
      <div className={style.top}>
        <div className={style.logo}>
          <img
            src={data.image}
            alt={t(`games.${data.id}.alt`)}
            className={style.img}
            loading={'lazy'}
          />
        </div>
        <p>{t(`games.${data.id}.title`)}</p>
        <Button
          classes={['primary', 'square', 'md', style.close]}
          icon={'fa-solid fa-times'}
          onChange={handleClose}
        />
      </div>
      <div className={style.center}>
        <Reference
          link={`${NAVIGATION.broadcast.link}/${data.id}`}
          classes={['primary', 'wide', 'md']}
          placeholder={t('see')}
          onChange={handleClose}
        />
      </div>
      <div className={style.bottom}>
        <Checkbox
          data={data.video.hide}
          placeholder={t('not_show_notification')}
          classes={['sm', 'transparent', 'white']}
          onChange={handleNotification}
        />
      </div>
    </div>
  )
}

export default Draw