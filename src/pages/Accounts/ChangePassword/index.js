import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {setToastify} from "store/actions/toastifyAction";
import {postData} from "helpers/api";

import Field from "components/Field";
import Button from "components/Button";

import style from './index.module.scss';
import {setAside} from "../../../store/actions/asideAction";


const ChangePassword = ({data}) => {
	const initialValue = {
		'id': data.id,
		'username': data.username,
		'new-password': '',
		'confirm-password': '',
		'old-password': ''
	}
	
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
		
		if (filter['new-password'] !== filter['confirm-password']) {
			dispatch(
				setToastify({
					type: 'error',
					text: t('password_mismatch')
				})
			)
		}
		else {
			const formData = new FormData();
			formData.append('id', filter.id)
			formData.append('username', filter.username)
			formData.append('old-password', filter['old-password'])
			formData.append('new-password', filter['new-password'])
			
			postData(`password/`, formData).then((json) => {
				if (json.code === '0') {
					dispatch(
						setToastify({
							type: 'success',
							text: json.message
						})
					).then(() => {
						handleResetForm()
						dispatch(setAside(null))
					})
				}
				else {
					dispatch(
						setToastify({
							type: 'error',
							text: json.error_message
						})
					)
				}
			})
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
				data={filter['new-password']}
				onChange={(value) => handlePropsChange('new-password', value)}
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
