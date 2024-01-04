import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";
import Textarea from "components/Textarea";

import style from './index.module.scss';

const NewAgent = ({data}) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const {settings} = useSelector((state) => state.settings)
	
	const initialValue = {
		'username': '',
		'new-password': '',
		'confirm-password': '',
		'full-name': '',
		'email': '',
		'description': '',
		'country': '',
		'currency': '',
	}
	const [filter, setFilter] = useState(initialValue)
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleResetForm = () => {
		setFilter(initialValue)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
	}
	
	return (
		<form
			className={style.block}
			onSubmit={handleSubmit}
		>
			{/*<pre>{JSON.stringify(filter, null, 2)}</pre>*/}
			{/*<br />*/}
			<Field
				type={'text'}
				placeholder={t('username')}
				data={filter.username}
				onChange={(value) => handlePropsChange('username', value)}
			/>
			<Field
				type={'password'}
				placeholder={t('password')}
				data={filter['new-password']}
				onChange={(value) => handlePropsChange('new-password', value)}
			/>
			<Field
				type={'password'}
				placeholder={t('confirm_password')}
				data={filter['confirm-password']}
				onChange={(value) => handlePropsChange('confirm-password', value)}
			/>
			<Field
				type={'text'}
				placeholder={t('full_name')}
				data={filter['full-name']}
				onChange={(value) => handlePropsChange('full-name', value)}
			/>
			<Field
				type={'email'}
				placeholder={t('email')}
				data={filter.email}
				onChange={(value) => handlePropsChange('email', value)}
			/>
			<Textarea
				placeholder={t('description')}
				data={filter.description}
				onChange={(value) => handlePropsChange('description', value)}
				classes={'lg'}
			/>
			<Select
				placeholder={t('country')}
				options={
					service.COUNTRIES.map(country => ({
						value: country,
						label: country
					}))
				}
				data={filter.country}
				onChange={(value) => handlePropsChange('country', value)}
			/>
			<Select
				placeholder={t('currency')}
				options={
					settings.currencies.map(currency => ({
						value: currency,
						label: currency
					}))
				}
				data={filter.currency}
				onChange={(value) => handlePropsChange('currency', value)}
			/>
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

export default NewAgent;
