import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import Field from "components/Field";
import Button from "components/Button";
import Paper from "components/Paper";

import style from './index.module.scss';

const Login = () => {
	const { t } = useTranslation()
	const [filter, setFilter] = useState({
		username: '',
		password: ''
	})
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleResetForm = () => {
		setFilter({
			username: '',
			password: ''
		})
	}
	
    return (
        <div className={style.block}>
			<Paper headline={t('login')}>
				<form className={style.form}>
					<Field
						type={'text'}
						placeholder={t('username')}
						data={filter.username}
						onChange={(value) => handlePropsChange('username', value)}
					/>
					<Field
						type={'password'}
						placeholder={t('password')}
						data={filter.password}
						onChange={(value) => handlePropsChange('password', value)}
					/>
					<div className={style.actions}>
						<Button
							type={'submit'}
							classes={'primary'}
							placeholder={t("login")}
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

export default Login;
