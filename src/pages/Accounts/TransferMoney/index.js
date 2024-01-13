import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {setAside} from "store/actions/asideAction";
import {postData} from "helpers/api";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";

import style from './index.module.scss';


const TransferMoney = ({data}) => {
	const date = {
		exchange: {
			'EUR-USD': '1.1',
			'USD-UAH': '38',
			'EUR-UAH': '42',
		},
		'available_balance': {
			USD: '123123',
			EUR: '234',
			UAH: '2'
		},
		'target_balance': {
			USD: '123123',
			EUR: '234',
			UAH: '2'
		}
	}
	
	const initialValue = {
		'id': data.id,
		'username': data.username,
		'available_balance': '',
		'target_balance': '',
		'amount': '',
		'type': ''
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
	
	const handleSubmit = (type) => {
		handlePropsChange('type', type)
		
		// if (filter['new_password'] !== filter['confirm_password']) {
		// 	dispatch(
		// 		setToastify({
		// 			type: 'error',
		// 			text: t('password_mismatch')
		// 		})
		// 	)
		// }
		// else {
		// 	const formData = new FormData();
		// 	formData.append('id', filter.id)
		// 	formData.append('username', filter.username)
		// 	formData.append('old_password', filter.old_password)
		// 	formData.append('new_password', filter.new_password)
		//
		// 	postData(`password/`, formData).then((json) => {
		// 		if (json.code === '0') {
		// 			dispatch(
		// 				setToastify({
		// 					type: 'success',
		// 					text: json.message
		// 				})
		// 			).then(() => {
		// 				handleResetForm()
		// 				dispatch(setAside(null))
		// 			})
		// 		}
		// 		else {
		// 			dispatch(
		// 				setToastify({
		// 					type: 'error',
		// 					text: json.error_message
		// 				})
		// 			)
		// 		}
		// 	})
		// }
	}
	
	return (
		<form className={style.block}>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<Select
				placeholder={t('available_balance')}
				options={
					Object.entries(date.available_balance).map(([key, value]) => ({
						value: key,
						label: `${key} - ${value}`
					}))
				}
				data={filter.available_balance}
				onChange={(value) => handlePropsChange('available_balance', value)}
			/>
			<Select
				placeholder={`${data.username} ${t('balance')}`}
				options={
					Object.entries(date.target_balance).map(([key, value]) => ({
						value: key,
						label: `${key} - ${value}`
					}))
				}
				data={filter.target_balance}
				onChange={(value) => handlePropsChange('target_balance', value)}
			/>
			<Field
				type={'number'}
				placeholder={t('amount')}
				data={filter.amount}
				onChange={(value) => handlePropsChange('amount', value)}
			/>
			<div className={style.actions}>
				<Button
					type={'button'}
					classes={'primary'}
					placeholder={t("deposit")}
					onChange={() => handleSubmit(service.TRANSFER_TYPE.DEPOSIT)}
				/>
				<Button
					type={'button'}
					classes={'warning'}
					placeholder={t("payout")}
					onChange={() => handleSubmit(service.TRANSFER_TYPE.PAYOUT)}
				/>
				<Button
					type={'button'}
					placeholder={t("cancel")}
					onChange={handleResetForm}
				/>
			</div>
		</form>
);
}

export default TransferMoney;
