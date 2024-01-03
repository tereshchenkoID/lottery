import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import Field from "components/Field";
import Paper from "components/Paper";
import Button from "components/Button";

import {setToastify} from "store/actions/toastifyAction";

import {postData} from "helpers/api";

import style from './index.module.scss';

const Settings = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const {auth} = useSelector((state) => state.auth)
	
	const initialValue = {
		'id': auth.id,
		'username': auth.username,
		'old-password': '',
		'new-password': '',
		'confirm-password': ''
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
		
		const formData = new FormData();
		formData.append('id', filter.id)
		formData.append('username', filter.username)
		formData.append('old-password', filter['old-password'])
		formData.append('new-password', filter['new-password'])
		
		if (filter['new-password'] !== filter['confirm-password']) {
			dispatch(
				setToastify({
					type: 'error',
					text: t('passwords_do_not_match')
				})
			)
		}
		else if(filter['new-password'].length < 3 || filter['confirm-password'].length < 3) {
			dispatch(
				setToastify({
					type: 'error',
					text: t('password_must_length')
				})
			)
		}
		else {
			postData(`password/`, formData).then((json) => {
				if (json.code === '0') {
					dispatch(
						setToastify({
							type: 'success',
							text: json.message
						})
					).then(() => {
						handleResetForm()
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
		<div className={style.block}>
			<Paper headline={t('user_profile')}>
				<pre>{JSON.stringify(filter, null, 2)}</pre>
				<br />
				<form
					onSubmit={handleSubmit}
					className={style.form}
				>
					<Field
						type={'text'}
						placeholder={t('username')}
						data={filter.username}
						classes={'disabled'}
					/>
					<Field
						type={'password'}
						placeholder={t('old_password')}
						data={filter['old-password']}
						onChange={(value) => handlePropsChange('old-password', value)}
					/>
					<Field
						type={'password'}
						placeholder={t('new_password')}
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
							placeholder={t("save")}
						/>
						<Button
							type={'reset'}
							placeholder={t("cancel")}
							onChange={handleResetForm}
						/>
					</div>
				</form>
			</Paper>
		</div>
    );
}

export default Settings;
