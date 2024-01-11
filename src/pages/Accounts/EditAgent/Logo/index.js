import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import File from "components/File";
import Label from "components/Label";
import Button from "components/Button";
import Checkbox from "components/Checkbox";

import style from './index.module.scss';

const Logo = ({data, inherit, setInherit}) => {
	const { t } = useTranslation()
	const [filter, setFilter] = useState(data.logo)
	const isDisabled = inherit === '1'
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleResetForm = () => {
		setFilter(data.logo)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
	}
	
	return (
		<>
			<Checkbox
				data={inherit}
				onChange={(value) => {
					setInherit(value)
					setFilter(data.logo)
				}}
				placeholder={t('inherit')}
			/>
			<form
				className={style.block}
				onSubmit={handleSubmit}
			>
				<pre>
					{
						JSON.stringify({
							...filter,
							inherit
						}, null, 2)
					}
				</pre>
				<div>
					<Label placeholder={t('logo')}/>
					<File
						data={filter.main}
						onChange={(value) => handlePropsChange('main', value)}
						classes={[isDisabled && 'disabled']}
					/>
				</div>
				<div>
					<Label placeholder={t('print_logo')}/>
					<File
						data={filter.print}
						onChange={(value) => handlePropsChange('print', value)}
						classes={[isDisabled && 'disabled']}
					/>
				</div>
				{
					!isDisabled &&
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
				}
			</form>
		</>
	);
}

export default Logo;