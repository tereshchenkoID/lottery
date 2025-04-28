import Button from 'components/Button'

import style from './index.module.scss'

const Control = ({ 
  type = 'alt',
  data, 
  index, 
  onChange 
}) => {
  const handleInputChange = value => {
    const newValue = parseInt(value, 10)
    if (!isNaN(newValue)) {
      onChange(index, Math.min(Math.max(newValue, data.min), data.max))
    }
  }

  return (
    <div className={style.block}>
      <Button
        placeholder={'-'}
        classes={[type, 'md', style.button]}
        isDisabled={data.value === data.min}
        onChange={() => onChange(index, Math.max(data.min, data.value - 1))}
      />
      <input
        type="number"
        className={style.field}
        value={data.value}
        min={data.min}
        max={data.max}
        onChange={e => handleInputChange(e.currentTarget.value)}
      />
      <Button
        placeholder={'+'}
        classes={[type, 'md', style.button]}
        isDisabled={data.value === data.max}
        onChange={() => onChange(index, Math.min(data.max, data.value + 1))}
      />
    </div>
  )
}

export default Control
