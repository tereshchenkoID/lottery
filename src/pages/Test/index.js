import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {service} from "constant/config";

import {setCmd} from "store/actions/cmdAction";
import {setAgents} from "store/actions/agentsAction";
import {convertOptions} from "helpers/convertOptions";
import {getData} from "helpers/api";

import Agents from "modules/Agents";
import Paper from "components/Paper";
import Select from "components/Select";
import Button from "components/Button";
import Loader from "components/Loader";
import Table from "./Table";

import style from './index.module.scss';

const config_1 = [
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
	const {cmd} = useSelector((state) => state.cmd)
	const dispatch = useDispatch()
	
	const initialValue = {
		'agent': {
			'id': agents[0].id,
			'username': agents[0].username
		},
		'locked': '',
		'currency': ''
	}
	const [filter, setFilter] = useState(initialValue)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState()
	const [search, setSearch] = useState()
	
	const handleInit = () => {
		setLoading(true)
		getData('accounts_full/', null).then((json) => {
			if (json.length > 0) {
				setData(json)
				setSearch(json)
				setLoading(false)
			}
		})
	}
	
	const handleSubmit = (event) => {
		event && event.preventDefault()
		setSearch(searchByUsername(data[0], filter.agent.id))
	}
	
	const searchByUsername = (node, term) => {
		
		if (node.id && node.id === term) {
			console.log(node.id, '-', term)
			return [node];
		}
		
		if (node.clients) {
			let results = [];
			for (const client of node.clients) {
				results = results.concat(searchByUsername(client, term));
			}
			return results;
		}
		
		return [];
	};
	
	useEffect(() => {
		handleInit()
	}, [])
	
	useEffect(() => {
		if (cmd) {
			if (cmd.message === service.MESSAGE.ACCOUNTS.TRANSFER) {
				handlePropsChange('agent', {
					id: cmd.data.agent.id,
					username: cmd.data.agent.username
				})
				
				dispatch(setAgents()).then(() => {
					handleSubmit(null)
					dispatch(setCmd(null))
				})
			}
			else if (cmd.message === service.MESSAGE.ACCOUNTS.ADD) {
				handlePropsChange('agent', {
					id: cmd.data.parent_id,
					username: cmd.data.parent_username
				})
				
				dispatch(setAgents()).then(() => {
					handleSubmit(null)
					dispatch(setCmd(null))
				})
			}
			else if (cmd.message === service.MESSAGE.ACCOUNTS.BALANCE) {
				handlePropsChange('agent', {
					id: cmd.data.id,
					username: cmd.data.username
				})
				
				handleSubmit(null)
				dispatch(setCmd(null))
			}
		}
	}, [cmd])
	
	const handleResetForm = () => {
		setFilter(initialValue)
		setSearch(data)
	}
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
    return (
		loading
			?
				<Loader />
			:
				<>
					<Paper headline={t('account_search')}>
						<pre>{JSON.stringify(filter, null, 2)}</pre>
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
										options={convertOptions(service.YES_NO)}
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
							data={search}
							filter={filter}
							config_1={config_1}
							config_2={config_2}
							handlePropsChange={handlePropsChange}
						/>
					</Paper>
				</>
    );
}

export default Accounts;
