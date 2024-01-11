import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {modes, service} from "constant/config";

import {convertOptions} from "helpers/convertOptions";
import {postData} from "helpers/api";

import Button from "components/Button";
import Select from "components/Select";
import Textarea from "components/Textarea";
import Checkbox from "components/Checkbox";

import style from './index.module.scss';

const Shop = ({data, inherit, setInherit}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [filter, setFilter] = useState(data.shop)
	const isDisabled = inherit === '1'
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleResetForm = () => {
		setFilter(data.shop)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		const formData = new FormData();
		formData.append('id', data.id)
		formData.append('username', data.username)
		formData.append('inherit', inherit)
	}

	return (
		<>
			<Checkbox
				data={inherit}
				onChange={(value) => {
					setInherit(value)
					setFilter(data.shop)
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
				<Select
					placeholder={t('language')}
					options={
						Object.entries(service.LANGUAGES).map(([key, value]) => ({
							value: key,
							label: value
						}))
					}
					data={filter.language}
					onChange={(value) => handlePropsChange('language', value)}
					classes={[isDisabled && 'disabled']}
				/>
				<Textarea
					placeholder={t('ticket_text')}
					data={filter.ticket_text}
					onChange={(value) => handlePropsChange('ticket_text', value)}
					classes={[
						'lg',
						isDisabled && 'disabled'
					]}
				/>
				<Textarea
					placeholder={t('cashier_text')}
					data={filter.cashier_text}
					onChange={(value) => handlePropsChange('cashier_text', value)}
					classes={[
						'lg',
						isDisabled && 'disabled'
					]}
				/>
				<Select
					placeholder={t('print_cancel_tickets')}
					options={convertOptions(service.ENABLE_DISABLE)}
					data={Number(filter.print_cancel_tickets)}
					onChange={(value) => handlePropsChange('print_cancel_tickets', value)}
					classes={[isDisabled && 'disabled']}
				/>
				<Select
					placeholder={t('printing_mode')}
					options={convertOptions(modes.PRINTING_MODE)}
					data={Number(filter.printing_mode)}
					onChange={(value) => handlePropsChange('printing_mode', value)}
					classes={[isDisabled && 'disabled']}
				/>
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

export default Shop;
