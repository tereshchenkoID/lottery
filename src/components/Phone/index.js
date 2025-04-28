import PhoneInput from 'react-phone-input-2'

import classNames from 'classnames'

import style from './index.module.scss'

const Phone = ({
  data,
  onChange,
  isRequired,
  isDisabled = false,
}) => {

  return (
    <div
      className={
        classNames(
          style.block,
          isDisabled && style.disabled
        )
      }
    >
      <PhoneInput
        inputProps={{
          name: 'phone',
          required: isRequired,
        }}
        country={'us'}
        value={data}
        onChange={value => onChange(value)}
      />
    </div>
  )
}

export default Phone
