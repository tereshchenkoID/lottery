import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {locked} from "constant/config";

import {convertOptions} from "helpers/convertOptions";
import {postData} from "helpers/api";

import Paper from "components/Paper";
import Agents from "modules/Agents";
import Select from "components/Select";
import Button from "components/Button";
import Loader from "components/Loader";
import Table from "./Table";

import style from './index.module.scss';

const config = [
	{
		key: 'username',
		text: 'username'
	},
	{
		key: 'full_name',
		text: 'full_name'
	},
	{
		key: 'credits',
		text: 'credits',
	},
	{
		key: 'commission',
		text: 'commission',
	},
	{
		key: 'currency',
		text: 'currency'
	},
	{
		key: 'locked',
		text: 'locked'
	}
]

const config_2 = [
	{
		key: 'shops',
		text: 'shops'
	}
]

const Accounts = () => {
	const { t } = useTranslation()
	const {agents} = useSelector((state) => state.agents)
	const {settings} = useSelector((state) => state.settings)
	
	const initialValue = {
		'agent': {
			id: agents[0].id,
			username: agents[0].username
		},
		'locked': '',
		'currency': ''
	}
	const [filter, setFilter] = useState(initialValue)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(agents)
	
	const handleSubmit = (event, newData) => {
		const data = newData ? newData : filter
		
		event && event.preventDefault();
		setLoading(true)
		
		const formData = new FormData();
		formData.append('id', data.agent.id)
		formData.append('locked', data.locked)
		formData.append('currency', data.currency)
		
		postData(`accounts/?id=${filter.agent.id}`, formData).then((json) => {
			if (json.status === 'OK') {
				setData(json.data)
				setLoading(false)
			}
		})
	}
	
	useEffect(() => {
		handleSubmit()
	}, [])
	
	const handleResetForm = () => {
		setFilter(initialValue)
		handleSubmit(null, initialValue)
	}
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
    return (
		<>
			{
				loading
					?
						<Loader />
					:
						<>
							<Paper headline={t('account_search')}>
								<pre>{JSON.stringify(filter, null, 2)}</pre>
								<br />
								<form onSubmit={handleSubmit}>
									<div className={style.grid}>
										<div>
											<Agents
												data={filter.agent}
												options={agents}
												onChange={(value) => handlePropsChange('agent', value)}
											/>
										</div>
										<div>
											<Select
												placeholder={t('locked')}
												options={convertOptions(locked.LOCKED)}
												data={filter.locked}
												onChange={(value) => handlePropsChange('locked', value)}
											/>
										</div>
										<div>
											<Select
												placeholder={t('currency')}
												options={
													settings.currencies.map(currency => ({
														value: currency,
														label: currency
													}))
												}
												data={filter.currency}
												onChange={(value) => handlePropsChange('currency', value)}
											/>
										</div>
									</div>
									<div className={style.actions}>
										<Button
											type={'submit'}
											classes={'primary'}
											placeholder={t("search")}
										/>
										<Button
											type={'reset'}
											placeholder={t("cancel")}
											onChange={handleResetForm}
										/>
									</div>
								</form>
							</Paper>
							<Paper>
								<Table
									data={data}
									filter={filter}
									config={config}
									config_2={config_2}
									handlePropsChange={handlePropsChange}
								/>
							</Paper>
						</>
			}
        </>
    );
}

export default Accounts;
