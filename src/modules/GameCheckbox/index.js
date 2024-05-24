import classNames from 'classnames'

import style from './index.module.scss'

const GameCheckbox = ({ data, placeholder, onChange }) => {
  return (
    <label className={classNames(style.block)}>
      <input
        type={'checkbox'}
        className={style.input}
        checked={data === 1}
        onChange={() => {
          onChange(data === 1 ? 0 : 1)
        }}
      />
      <span className={style.item} />
      <span>{placeholder}</span>
    </label>
  )
}

export default GameCheckbox
