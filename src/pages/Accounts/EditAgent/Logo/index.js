import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import File from "components/File";
import Label from "components/Label";
import Button from "components/Button";

import style from './index.module.scss';

const Logo = ({data}) => {
	const { t } = useTranslation()
	const initialValue = {
		'logo': null,
		'print_logo': null
	}
	
	const [filter, setFilter] = useState(initialValue)
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
	}
	
	const handleResetForm = () => {
		setFilter(initialValue)
	}
	
	return (
		<form
			className={style.block}
			onSubmit={handleSubmit}
		>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<br />
			<div>
				<Label placeholder={t('logo')} />
				<File
					data={filter.logo}
					onChange={(value) => handlePropsChange('logo', value)}
				/>
			</div>
			<div>
				<Label placeholder={t('print_logo')} />
				<File
					data={filter.print_logo}
					onChange={(value) => handlePropsChange('print_logo', value)}
				/>
			</div>
			<div className={style.actions}>
				<Button
					type={'submit'}
					classes={'primary'}
					placeholder={t("save")}
				/>
				<Button
					type={'reset'}
					placeholder={t("cancel")}
					onChange={handleResetForm}
				/>
			</div>
		</form>
    );
}

export default Logo;
