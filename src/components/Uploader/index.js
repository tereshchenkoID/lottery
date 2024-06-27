import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'components/Button'

import style from './index.module.scss'

const Uploader = ({ 
  id = 'upload', 
  onChange 
}) => {
  const { t } = useTranslation()
  const [previews, setPreviews] = useState([])
  const [blobs, setBlobs] = useState([])

  const handlePhotoChange = (e) => {
    const files = e.target.files
    if (files) {
      const newPreviews = []
      const newBlobs = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type })
          newPreviews.push(URL.createObjectURL(blob))
          newBlobs.push(blob)
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews)
            setBlobs(newBlobs)
            onChange(newBlobs)
          }
        }
        reader.readAsArrayBuffer(file)
      }
    }
  }

  const handleRemove = (index) => {
    const newPreviews = previews.filter((_, idx) => idx !== index)
    const newBlobs = blobs.filter((_, idx) => idx !== index)
    setPreviews(newPreviews)
    setBlobs(newBlobs)
    onChange(newBlobs)
  }

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
      {previews.length > 0 && (
        <div className={style.previews}>
          {previews.map((item, idx) => (
            <div 
              key={idx}
              className={style.preview}
            >
              <div className={style.media}>
                <img 
                  src={item} 
                  alt={`Preview ${idx}`} 
                />
              </div>
              <Button
                classes={['primary', style.close]}
                icon={'fa-solid fa-times'}
                onChange={() => handleRemove(idx)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Uploader