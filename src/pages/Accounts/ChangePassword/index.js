import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {setToastify} from "store/actions/toastifyAction";

import Field from "components/Field";
import Button from "components/Button";

import style from './index.module.scss';

const ChangePassword = ({data}) => {
	const initialValue = {
		'id': data.id,
		'username': data.username,
		'password': '',
		'confirm-password': ''
	}
	
	
	console.log(data)
	
	const dispatch = useDispatch()
	const { t } = useTranslation()
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
		
		if (filter['password'] !== filter['confirm-password']) {
			dispatch(
				setToastify({
					type: 'error',
					text: t('password_mismatch')
				})
			)
		}
	}
	
	return (
		<form
			className={style.block}
			onSubmit={handleSubmit}
		>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<br />
			<Field
				type={'text'}
				placeholder={t('username')}
				data={filter.username}
				onChange={(value) => handlePropsChange('username', value)}
				classes={'disabled'}
			/>
			<Field
				type={'password'}
				placeholder={t('password')}
				data={filter.password}
				onChange={(value) => handlePropsChange('password', value)}
			/>
			<Field
				type={'password'}
				placeholder={t('confirm_password')}
				data={filter['confirm-password']}
				onChange={(value) => handlePropsChange('confirm-password', value)}
			/>
			<div className={style.actions}>
				<Button
					type={'submit'}
					classes={'primary'}
					placeholder={t("change")}
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

export default ChangePassword;
