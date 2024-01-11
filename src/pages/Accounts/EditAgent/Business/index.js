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
import Checkbox from "../../../../components/Checkbox";

const Business = ({data, inherit, setInherit}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [filter, setFilter] = useState( data.business)
	const isDisabled = inherit === '1'
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleResetForm = () => {
		setFilter(data.business)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		const formData = new FormData();
		formData.append('id', data.id)
		formData.append('username', data.username)
		formData.append('inherit', inherit)
		
		Object.entries(filter).map(([key, value]) => {
			formData.append(key, value)
			return true
		})
	}
	
	return (
		<>
			<Checkbox
				data={inherit}
				onChange={(value) => {
					setInherit(value)
					setFilter(data.business)
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
				{
					Object.entries(filter).map(([key, value]) =>
						<Select
							placeholder={t(key)}
							options={convertOptions(key === 'ticket_payout' ? ticket.PAYOUT : service.ENABLE_DISABLE)}
							data={Number(value)}
							onChange={(value) => handlePropsChange(key, value)}
							classes={[isDisabled && 'disabled']}
						/>
					)
				}
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

export default Business;
