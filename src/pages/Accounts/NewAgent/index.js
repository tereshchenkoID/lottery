import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {convertOptions} from "helpers/convertOptions";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";
import Textarea from "components/Textarea";
import GeneratePassword from "modules/GeneratePassword";

import style from './index.module.scss';
import {config} from "@fortawesome/fontawesome-svg-core";


const NewAgent = ({data}) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const {settings} = useSelector((state) => state.settings)
	
	const initialValue = {
		'parent_id': data.id,
		'parent_username': data.username,
		'username': '',
		'new-password': '',
		'confirm-password': '',
		'full-name': '',
		'email': '',
		'description': '',
		'country': '',
		'currency': '',
		// 'children_creation_allowed': '',
		// 'web_players_allowed': '',
		// 'web_player_url': ''
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
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<br />
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
			<div className={style.actions}>
				<GeneratePassword
					data={filter}
					action={setFilter}
					list={['new-password', 'confirm-password']}
				/>
			</div>
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
					Object.entries(service.COUNTRIES).map(([key, value]) => {
						return { value: key, label: value }
					})
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
			{
				data.type === service.TYPE.AGENT &&
				<>
					<Select
						placeholder={t('children_creation_allowed')}
						options={convertOptions(service.TRUE_FALSE)}
						data={filter['children_creation_allowed']}
						onChange={(value) => handlePropsChange('children_creation_allowed', value)}
					/>
					<Select
						placeholder={t('web_players_allowed')}
						options={convertOptions(service.TRUE_FALSE)}
						data={filter['web_players_allowed']}
						onChange={(value) => handlePropsChange('web_players_allowed', value)}
					/>
					<Field
						type={'text'}
						placeholder={t('web_player_url')}
						data={filter['web_player_url']}
						onChange={(value) => handlePropsChange('web_player_url', value)}
					/>
				</>
			}
			<div className={style.actions}>
				<Button
					type={'submit'}
					classes={'primary'}
					placeholder={t("create")}
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
