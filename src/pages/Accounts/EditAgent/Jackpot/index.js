import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {service, ticket} from "constant/config";

// import {setToastify} from "store/actions/toastifyAction";
// import {setAside} from "store/actions/asideAction";
// import {setCmd} from "store/actions/cmdAction";

import {convertOptions} from "helpers/convertOptions";
// import {postData} from "helpers/api";

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Label from "components/Label";
import Select from "components/Select";
import Field from "components/Field";

import style from './index.module.scss';

const generateOptions = (count) => {
	const options = {};
	for (let i = 0; i < count; i++) {
		options[i] = i < 10 ? `0${i}` : `${i}`
	}
	
	return options;
};

const Jackpot = ({data}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const {settings} = useSelector((state) => state.settings)
	
	const initialValue = {
		'currency': '',
		'charge_share': '',
		'low_limit_amount': '',
		'high_limit_amount': '',
		'min_shown_amount': '',
		'min_stake_win': '',
		'from_hours': '',
		'from_minutes': '',
		'to_hours': '',
		'to_minutes': '',
		'jackpot_display_period': '',
		'games_allowed': {},
	}
	const [filter, setFilter] = useState(initialValue)
	// const [inherit, setInherit] = useState(null)
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleCheckboxChange = (fieldName, checked, fieldValue) => {
		const newDate = filter.games_allowed
		
		if (checked === '1') {
			newDate[fieldName] = fieldValue
		}
		else {
			delete newDate[fieldName]
		}
		
		setFilter((prevData) => ({
			...prevData,
			'games_allowed': newDate,
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
			
			<Select
				placeholder={t('currency')}
				options={
					settings.currencies.map(currency => ({
						value: currency,
						label: currency
					}))
				}
				data={filter["currency"]}
				onChange={(value) => handlePropsChange('currency', value)}
			/>
			<Field
				type={'number'}
				placeholder={t('charge_share')}
				data={filter.charge_share}
				onChange={(value) => handlePropsChange('charge_share', value)}
			/>
			<Field
				type={'number'}
				placeholder={t('low_limit_amount')}
				data={filter.low_limit_amount}
				onChange={(value) => handlePropsChange('low_limit_amount', value)}
			/>
			<Field
				type={'number'}
				placeholder={t('high_limit_amount')}
				data={filter.high_limit_amount}
				onChange={(value) => handlePropsChange('high_limit_amount', value)}
			/>
			<Field
				type={'number'}
				placeholder={t('min_shown_amount')}
				data={filter.min_shown_amount}
				onChange={(value) => handlePropsChange('min_shown_amount', value)}
			/>
			<Field
				type={'number'}
				placeholder={t('min_stake_win')}
				data={filter.min_stake_win}
				onChange={(value) => handlePropsChange('min_stake_win', value)}
			/>
			<div>
				<Label placeholder={t('draw_interval')} />
				<div className={style.list}>
					<Select
						placeholder={t('hours')}
						options={convertOptions(generateOptions(24))}
						data={filter.from_hours}
						onChange={(value) => handlePropsChange('from_hours', value)}
					/>
					<Select
						placeholder={t('minutes')}
						options={convertOptions(generateOptions(60))}
						data={filter.from_minutes}
						onChange={(value) => handlePropsChange('from_minutes', value)}
					/>
					<Select
						placeholder={t('hours')}
						options={convertOptions(generateOptions(24))}
						data={filter.to_hours}
						onChange={(value) => handlePropsChange('to_hours', value)}
					/>
					<Select
						placeholder={t('minutes')}
						options={convertOptions(generateOptions(60))}
						data={filter.to_minutes}
						onChange={(value) => handlePropsChange('to_minutes', value)}
					/>
				</div>
			</div>
			<Field
				type={'number'}
				placeholder={t('jackpot_display_period')}
				data={filter.jackpot_display_period}
				onChange={(value) => handlePropsChange('jackpot_display_period', value)}
			/>
			<div>
				<Label placeholder={t('games_allowed')} />
				<div className={style.list}>
				{
					Object.entries(service.GAMES).map(([key, values]) =>
						<Checkbox
							data={filter.games_allowed[key] ? '1' : '0'}
							placeholder={values}
							onChange={(value) => handleCheckboxChange(key, value, values)}
						/>
					)
				}
				</div>
			</div>
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