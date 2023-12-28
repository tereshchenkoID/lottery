import {useEffect, useRef, useState} from 'react';

import { Select2 } from "select2-react-component";

import style from './index.module.scss';

const Select = ({
	placeholder,
	options,
	data,
	onChange,
}) => {
	const [search, setSearch]= useState([...options])
	const selectRef = useRef()
	
	const handleSelectChange = (newValue) => {
		onChange(newValue)
	}
	
	const handleSearch = (text) => {
		setSearch(options.filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) !== -1))
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
				placeholder='Select values'
				data={search}
				value={data}
				update={handleSelectChange}
				search={handleSearch}
				customSearchEnabled={true}
				keepSearchText={true}
			/>
			{
				placeholder &&
				<label className={style.label}>
					{placeholder}
				</label>
			}
        </div>
    );
}

export default Select;
