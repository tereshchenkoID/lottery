import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import Field from "components/Field";
import Paper from "components/Paper";
import Button from "components/Button";

import style from './index.module.scss';

const Settings = () => {
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
	
    return (
		<div className={style.block}>
			<Paper headline={t('login')}>
				<pre>{JSON.stringify(filter, null, 2)}</pre>
				<br />
				<form className={style.form}>
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
