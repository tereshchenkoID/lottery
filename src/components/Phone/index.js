import PhoneInput from 'react-phone-input-2'

const Phone = ({ 
  data,
  onChange,
  isRequired
}) => {

  return (
    <PhoneInput
      inputProps={{
        name: 'phone',
        required: isRequired,
      }}
      country={'us'}
      value={data}
      onChange={value => onChange(value)}
    />
  )
}

export default Phone
