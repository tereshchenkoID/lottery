import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {setAside} from "store/actions/asideAction";
import {setCmd} from "store/actions/cmdAction";
import {getData, postData} from "helpers/api";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";

import style from './index.module.scss';


const TransferMoney = ({data}) => {
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
	const {auth} = useSelector((state) => state.auth)
	const [filter, setFilter] = useState(initialValue)
	const [table, setTable] = useState(null)
	const [exchange, setExchange] = useState(null)
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleResetForm = () => {
		setFilter(initialValue)
		setExchange(null)
	}
	
	const handleInit = () => {
		getData(`deposit/getBalances/?id=${data.id}`).then((json) => {
			if (json.status === 'OK') {
				setTable(json.data)
			}
		})
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		const results = exchange * filter.amount
		const available = filter.type === '0' ? table.available_balance[filter.available_balance] : table.target_balance[filter.target_balance]
		
		if (results > exchange * available) {
			dispatch(
				setToastify({
					type: 'error',
					text: t('insufficient_funds')
				})
			)
		}
		else {
			const formData = new FormData();
			formData.append('id', auth.agent_id)
			formData.append('target_id', filter.id)
			formData.append('currency', filter.available_balance)
			formData.append('target_currency', filter.target_balance)
			formData.append('amount', filter.amount)
			formData.append('exchange', exchange)
			formData.append('type', filter.type)
			
			postData(`deposit/setBalance/`, formData).then((json) => {
				if (json.code === '0') {
					dispatch(
						setToastify({
							type: 'success',
							text: json.message
						})
					).then(() => {
						handleResetForm()
						dispatch(setAside(null))
						dispatch(setCmd({
							message: service.MESSAGE.ACCOUNTS.BALANCE,
							data: {
								id: data.id,
								username: data.username,
							}
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
	
	useEffect(() => {
		handleInit()
	}, []);
	
	useEffect(() => {
		if (filter.target_balance !== '' && filter.available_balance !== '') {
			setExchange(filter.type === "0" ? table.exchange[`${filter.target_balance}-${filter.available_balance}`] : table.exchange[`${filter.available_balance}-${filter.target_balance}`])
		}
		else {
			setExchange(null)
		}
	}, [filter.type, filter.target_balance, filter.available_balance]);
	
	if (!table)
		return
	
	return (
		<form
			className={style.block}
			onSubmit={handleSubmit}
		>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<Select
				placeholder={t('available_balance')}
				options={
					Object.entries(service.TRANSFER_TYPE).map(([key, value]) => ({
						value: key,
						label: value
					}))
				}
				data={filter.type}
				onChange={(value) => handlePropsChange('type', value)}
			/>
			<Select
				placeholder={t('available_balance')}
				options={
					Object.entries(table.available_balance).map(([key, value]) => ({
						value: key,
						label: `${key}: ${value}`
					}))
				}
				data={filter.available_balance}
				onChange={(value) => handlePropsChange('available_balance', value)}
			/>
			<Select
				placeholder={`${data.username} ${t('balance')}`}
				options={
					Object.entries(table.target_balance).map(([key, value]) => ({
						value: key,
						label: `${key}: ${value}`
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
			{
				exchange &&
				<div>
					<div className={style.title}>
						<span><strong>1</strong> {filter.type === "0" ? filter.target_balance : filter.available_balance}</span>
						<span>=</span>
						<span><strong>{exchange}</strong> {filter.type === "0" ? filter.available_balance : filter.target_balance}</span>
					</div>
					<div className={style.title}>
						<span>Total:</span>
						<h5>{exchange * filter.amount}</h5>
						<span>{filter.type === "0" ? filter.available_balance : filter.target_balance}</span>
					</div>
				</div>
			}
			<div className={style.actions}>
				<Button
					type={'submit'}
					classes={'primary'}
					placeholder={t("transfer")}
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
