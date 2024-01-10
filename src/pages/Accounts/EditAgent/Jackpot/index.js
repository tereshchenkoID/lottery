import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {service, ticket} from "constant/config";

// import {setToastify} from "store/actions/toastifyAction";
// import {setAside} from "store/actions/asideAction";
// import {setCmd} from "store/actions/cmdAction";

import {convertOptions} from "helpers/convertOptions";
// import {postData} from "helpers/api";

import Button from "components/Button";
import Select from "components/Select";

import style from './index.module.scss';

const Jackpot = ({data}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	
	const initialValue = {
		'currency': '',
		'charge_share': '',
		'low_limit_amount': '',
		'high_limit_amount': '',
		'min_shown_amount': '',
		'min_stake_win': '',
		'from_hours': '0',
		'from_minutes': '0',
		'to_hours': '0',
		'to_minutes': '0',
		'jackpot_display_period': '',
		'games_allowed': [],
	}
	const [filter, setFilter] = useState(initialValue)
	// const [inherit, setInherit] = useState(null)
	
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
			{/*{*/}
			{/*	Object.entries(filter).map(([key, value]) =>*/}
			{/*		<Select*/}
			{/*			placeholder={t(key)}*/}
			{/*			options={convertOptions(key === 'ticket_payout' ? ticket.PAYOUT : service.ENABLE_DISABLE)}*/}
			{/*			data={value}*/}
			{/*			onChange={(value) => handlePropsChange(key, value)}*/}
			{/*		/>*/}
			{/*	)*/}
			{/*}*/}
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

export default Jackpot;
