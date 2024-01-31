import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

import { Select2 } from 'select2-react-component'

import classNames from 'classnames'

import style from './index.module.scss'

const Select = ({ placeholder, options, data, onChange, classes }) => {
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

  useEffect(() => {
    if (data === '') {
      selectRef.current.option = null
    }
  }, [data])

  return (
    <div
      className={classNames(
        style.block,
        classes && classes.map(el => style[el]),
      )}
    >
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
      {placeholder && <label className={style.label}>{placeholder}</label>}
    </div>
  )
}

export default Select
