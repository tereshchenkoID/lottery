import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'components/Button'

import style from './index.module.scss'

const Uploader = ({ 
  id = 'upload',
  data,
  onChange 
}) => {
  const { t } = useTranslation()
  const [blobs, setBlobs] = useState([])

  const handlePhotoChange = (e) => {
    const files = e.target.files
    if (files) {
      const newBlobs = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onloadend = () => {
          newBlobs.push(new Blob([reader.result], { type: file.type }))
          if (newBlobs.length === files.length) {
            setBlobs(newBlobs)
            onChange(newBlobs)
          }
        }
        reader.readAsArrayBuffer(file)
      }
    }
  }

  const handleRemove = (index) => {
    const newBlobs = blobs.filter((_, idx) => idx !== index)
    setBlobs(newBlobs)
    onChange(newBlobs)
  }

  useEffect(() => {
    setBlobs(data)
  }, [data])

  return (
    <div className={style.block}>
      <div className={style.upload}>
        <label htmlFor={id} className={style.label}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
          <span>{t('upload_file')}</span>
        </label>
        <input
          id={id}
          type={'file'}
          accept={'image/*'}
          onChange={handlePhotoChange}
          className={style.input}
          multiple
        />
      </div>
      {
        blobs.length > 0 && (
          <div className={style.previews}>
            {
              blobs.map((item, idx) => (
                <div 
                  key={idx}
                  className={style.preview}
                >
                  <div className={style.media}>
                    <img 
                      src={URL.createObjectURL(item)}
                      alt={`Preview ${idx}`} 
                    />
                  </div>
                  <Button
                    classes={['primary', style.close]}
                    icon={'fa-solid fa-times'}
                    onChange={() => handleRemove(idx)}
                  />
                </div>
              )
            )
          }
          </div>
      )}
    </div>
  )
}

export default Uploader