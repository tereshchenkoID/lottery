import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {types, service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {setAside} from "store/actions/asideAction";
import {setCmd} from "store/actions/cmdAction";
import {postData} from "helpers/api";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";
import Textarea from "components/Textarea";
import GeneratePassword from "modules/GeneratePassword";

import style from './index.module.scss';

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
	const [inherit, setInherit] = useState(null)
	
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
			Object.entries(filter).map(([key, value]) => {
				formData.append(key, value)
				return true
			})
			
			postData(`new/${data.type.toLowerCase()}/`, formData).then((json) => {
				if (json.status === 'OK') {
					dispatch(
						setToastify({
							type: 'success',
							text: json.message
						})
					).then(() => {
						handleResetForm()
						dispatch(setAside(null))
						dispatch(setCmd({
							message: service.MESSAGE.ACCOUNTS.ADD,
							data: json.data
						}))
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
	
	const handleInherit = () => {
		const formData = new FormData();
		formData.append('id', data.id)
		formData.append('type', data.type.toLowerCase())
		
		postData(`inherit/`, formData).then((json) => {
			if (json.status === 'OK') {
				setInherit(json.data)
				
				initialValue.country = json.data.country
				initialValue.currency = json.data.currency
				initialValue.web_players_allowed = json.data.web_players_allowed
				initialValue.children_creation_allowed = json.data.children_creation_allowed
				
				setFilter(() => initialValue)
			}
		})
	}
	
	useEffect(() => {
		handleInherit()
	}, [])
	
	if (!inherit)
		return
	
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
				required={true}
			/>
			<Field
				type={'password'}
				placeholder={t('password')}
				data={filter['new-password']}
				onChange={(value) => handlePropsChange('new-password', value)}
				required={true}
			/>
			<Field
				type={'password'}
				placeholder={t('confirm_password')}
				data={filter['confirm-password']}
				onChange={(value) => handlePropsChange('confirm-password', value)}
				required={true}
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
				classes={['lg']}
			/>
			<Select
				placeholder={t('country')}
				options={
					Object.entries(service.COUNTRIES).map(([key, value]) => {
						if (inherit.country === key) {
							return { value: key, label: `${t('inherit')} (${value})` }
						}
						return { value: key, label: value }
					})
				}
				data={filter.country}
				onChange={(value) => handlePropsChange('country', value)}
			/>
			<Select
				placeholder={t('currency')}
				options={
					settings.currencies.map(currency => {
						if(currency === inherit.currency) {
							return { value: currency, label: `${t('inherit')} (${currency})` }
						}
						return { value: currency, label: currency }
					})
				}
				data={filter.currency}
				onChange={(value) => handlePropsChange('currency', value)}
			/>
			{
				data.type === types.TYPE[0] &&
				<>
					<Select
						placeholder={t('children_creation_allowed')}
						options={
							Object.entries(service.YES_NO).map(([key, value]) => {
								if (inherit['children_creation_allowed'] === key) {
									return { value: key, label: `${t('inherit')} (${value})` }
								}
								return { value: key, label: value }
							})
						}
						data={filter.children_creation_allowed}
						onChange={(value) => handlePropsChange('children_creation_allowed', value)}
					/>
					<Select
						placeholder={t('web_players_allowed')}
						options={
							Object.entries(service.YES_NO).map(([key, value]) => {
								if (inherit['web_players_allowed'] === key) {
									return { value: key, label: `${t('inherit')} (${value})` }
								}
								return { value: key, label: value }
							})
						}
						data={filter.web_players_allowed}
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
