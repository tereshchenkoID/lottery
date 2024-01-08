import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {modes, service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {setAside} from "store/actions/asideAction";
import {setCmd} from "store/actions/cmdAction";
import {postData} from "helpers/api";

import {convertOptions} from "helpers/convertOptions";

import Button from "components/Button";
import Select from "components/Select";
import Textarea from "components/Textarea";

import style from './index.module.scss';

const General = ({data}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	
	const initialValue = {
		'id': data.id,
		'username': data.username,
		'language': '',
		'tv_skin': '',
		'cashier_skin': '',
		'ticket_text': '',
		'cashier_text': '',
		'print_cancel_tickets': '',
		'printing_mode': '',
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

	return (
		<form
			className={style.block}
			onSubmit={handleSubmit}
		>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<br />
			<Select
				placeholder={t('language')}
				options={
					Object.entries(service.COUNTRIES).map(([key, value]) => {
						return { value: key, label: value }
					})
				}
				data={filter.language}
				onChange={(value) => handlePropsChange('language', value)}
			/>
			<Textarea
				placeholder={t('ticket_text')}
				data={filter.ticket_text}
				onChange={(value) => handlePropsChange('ticket_text', value)}
				classes={'lg'}
			/>
			<Textarea
				placeholder={t('cashier_text')}
				data={filter.cashier_text}
				onChange={(value) => handlePropsChange('cashier_text', value)}
				classes={'lg'}
			/>
			<Select
				placeholder={t('print_cancel_tickets')}
				options={convertOptions(service.ENABLE_DISABLE)}
				data={filter.print_cancel_tickets}
				onChange={(value) => handlePropsChange('print_cancel_tickets', value)}
			/>
			<Select
				placeholder={t('printing_mode')}
				options={convertOptions(modes.PRINTING_MODE)}
				data={filter.printing_mode}
				onChange={(value) => handlePropsChange('printing_mode', value)}
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

export default General;
