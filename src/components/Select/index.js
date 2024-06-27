import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Select from 'react-select'

import style from './index.module.scss'

const CustomSelect = ({ 
  placeholder, 
  options, 
  data, 
  onChange, 
  isRequired 
}) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState([...options])
  const selectRef = useRef()
  const selectedOption = options.find(option => option.value === data)

  const handleSelectChange = selectedOption => {
    onChange(selectedOption?.value)
  }

  const handleSearch = inputValue => {
    setSearch(
      options.filter(
        option => option.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    )
  }

  const onFocus = () => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
  }

  useEffect(() => {
    if (data === '') {
      selectRef.current.clearValue()
    }
  }, [data])

  return (
    <div className={style.block}>
      <Select
        ref={selectRef}
        placeholder={t('select_values')}
        options={search}
        value={selectedOption}
        onChange={handleSelectChange}
        onInputChange={handleSearch}
        className="react-select-container"
        classNamePrefix="react-select"
        isClearable
      />
      <label className={style.label} onClick={onFocus}>
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
    </div>
  )
}

export default CustomSelect