import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

import { Select2 } from 'select2-react-component'

import style from './index.module.scss'

const Select = ({ 
  placeholder, 
  options, 
  data, 
  onChange, 
  isRequired 
}) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState([...options])
  const selectRef = useRef()

  const handleSelectChange = newValue => {
    onChange(newValue)
  }

  const handleSearch = text => {
    setSearch(
      options.filter(
        option => option.label.toLowerCase().indexOf(text.toLowerCase()) !== -1,
      ),
    )
  }

  const onFocus = () => {
    selectRef.current.focus()
  }

  useEffect(() => {
    if (data === '') {
      selectRef.current.option = null
    }
  }, [data])

  return (
    <div className={style.block}>
      <Select2
        ref={selectRef}
        placeholder={t('select_values')}
        data={search}
        value={data}
        update={handleSelectChange}
        search={handleSearch}
        customSearchEnabled={true}
        keepSearchText={true}
      />
      <label className={style.label} onClick={onFocus}>
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
    </div>
  )
}

export default Select
