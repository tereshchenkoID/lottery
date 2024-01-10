import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {service, ticket} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {setAside} from "store/actions/asideAction";

import {convertOptions} from "helpers/convertOptions";
import {postData} from "helpers/api";

import Button from "components/Button";
import Select from "components/Select";

import style from './index.module.scss';

const Business = ({data}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	
	const initialValue = {
		'ticket_payout': '',
		'payout_tickets': '',
		'cancel_tickets': '',
		'validate_tickets': '',
		'reprint_tickets': '',
		'web_viewer': '',
		'settlement': '',
		'password_change': '',
		'financial_reports': '',
		'hide_ticket_number': '',
		'tax_model': '',
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
		formData.append('id', data.id)
		formData.append('username', data.username)
		
		Object.entries(filter).map(([key, value]) => {
			formData.append(key, value)
			return true
		})
		
		postData('', formData).then((json) => {
			if (json.status === 'OK') {
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
	
	return (
		<form
			className={style.block}
			onSubmit={handleSubmit}
		>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<br />
			{
				Object.entries(filter).map(([key, value]) =>
					<Select
						placeholder={t(key)}
						options={convertOptions(key === 'ticket_payout' ? ticket.PAYOUT : service.ENABLE_DISABLE)}
						data={value}
						onChange={(value) => handlePropsChange(key, value)}
					/>
				)
			}
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

export default Business;
