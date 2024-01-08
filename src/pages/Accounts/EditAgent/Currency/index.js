import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {modes, service} from "constant/config";

import {setToastify} from "store/actions/toastifyAction";
import {setAside} from "store/actions/asideAction";
import {setCmd} from "store/actions/cmdAction";

import {convertOptions} from "helpers/convertOptions";
import {postData} from "helpers/api";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";
import Label from "components/Label";

import style from './index.module.scss';

const Currency = ({data}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const {settings} = useSelector((state) => state.settings)
	
	const initialValue = {
		stakes_settings: {
			payout_limit: '',
			total_stake: {
				min: '',
				max: ''
			},
			stake_mode: '',
		},
		single_group: {
			stake_per_bet: {
				min: '',
				max: ''
			},
			stake_per_group: {
				min: '',
				max: ''
			},
			default_stake: '',
		},
		system_group: {
			stake_per_combination: {
				min: '',
				max: '',
			},
			stake_per_group: {
				min: '',
				max: ''
			}
		},
		combi_group: {
			stake_per_group: {
				min: '',
				max: ''
			}
		},
		quick_stakes: {
			quick_stake_1: '',
			quick_stake_2: '',
			quick_stake_3: '',
			quick_stake_4: '',
		}
	}
	
	const [filter, setFilter] = useState(initialValue)
	const [active, setActive] = useState(settings.currencies[0])
	
	const handlePropsChange = (group, parent, fieldName, fieldValue) => {
		const newData= filter
		if (parent) {
			newData[group][parent][fieldName] = fieldValue
		}
		else {
			newData[group][fieldName] = fieldValue
		}
		
		setFilter((prevData) => ({
			...prevData,
			[group]: newData[group]
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
			<div className={style.currencies}>
			{
				settings.currencies.map((el, idx) =>
					<button
						key={idx}
						type={'button'}
						className={
							classNames(
								style.currency,
								active === el && style.active,
							)
						}
						onClick={() => {
							setActive(el)
						}}
					>
						{el}
					</button>
				)
			}
			</div>
			{/*<pre>{JSON.stringify(filter, null, 2)}</pre>*/}
			{/*<br />*/}
			{
				Object.entries(filter).map(([key, value]) =>
					<div
						key={key}
						className={style.group}
					>
						<h6>{t(key)}</h6>
						{
							Object.entries(filter[key]).map(([key_g, value_g]) =>
								<div key={key_g}>
									{
										typeof value_g === 'object'
											?
												<>
													<Label placeholder={t(key_g)}/>
													<div className={style.grid}>
														{
															Object.entries(value_g).map(([key_i, value_i]) =>
																<Field
																	key={key_i}
																	type={'number'}
																	placeholder={t(key_i)}
																	data={value_i}
																	onChange={(value) => handlePropsChange(key, key_g, key_i, value)}
																/>
															)
														}
													</div>
												</>
											:
												key_g === 'stake_mode'
													?
														<Select
															placeholder={t(key_g)}
															options={convertOptions(modes.STAKE_MODE)}
															data={value_g.value}
															onChange={(value) => handlePropsChange(key, null, key_g, value)}
														/>
													:
														<Field
															type={'number'}
															placeholder={t(key_g)}
															data={value_g}
															onChange={(value) => handlePropsChange(key, null, key_g, value)}
														/>
									}
								</div>
							)
						}
					</div>
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

export default Currency;
