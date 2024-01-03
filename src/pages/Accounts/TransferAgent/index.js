import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {setToastify} from "store/actions/toastifyAction";

import Field from "components/Field";
import Button from "components/Button";
import Agents from "modules/Agents";

import style from './index.module.scss';

const TransferAgent = ({data}) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const {agents} = useSelector((state) => state.agents)
	
	
	const initialValue = {
		'id': data.id,
		'username': data.username,
		'agent': {
			id: agents[0].id,
			username: agents[0].username
		},
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
				classes={'disabled'}
			/>
			<Agents
				data={filter.agent}
				options={agents}
				placeholder={t('new_agent')}
				onChange={(value) => handlePropsChange('agent', value)}
			/>
			<div className={style.actions}>
				<Button
					type={'submit'}
					classes={'primary'}
					placeholder={t("change")}
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

export default TransferAgent;
