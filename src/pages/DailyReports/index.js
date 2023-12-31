import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {timeframe} from "constant/config";

import Agents from "modules/Agents";
import Paper from "components/Paper";
import Field from "components/Field";
import Select from "components/Select";
import Button from "components/Button";
import Loader from "components/Loader";
import Report from "./Report";

import {postData} from "helpers/api";
import {convertOptions} from "helpers/convertOptions";
import {getTimeframeFrom, getTimeframeTo} from "helpers/getTimeframe";
import {getDate} from "helpers/getDate";

import style from './index.module.scss';

const DailyReports = () => {
	const { t } = useTranslation()
	const {agents} = useSelector((state) => state.agents)
	
	const initialValue = {
		'agent': {
			id: agents[0].id,
			username: agents[0].username
		},
		'date-from': getDate(new Date().setHours(0, 0, 0, 0), 'datetime-local'),
		'date-to': getDate(new Date(), 'datetime-local'),
		// 'date-from': '2023-10-15T00:00:00',
		// 'date-to': '2023-10-18T23:59:59',
		'timeframe': ''
	}
	
	const [filter, setFilter] = useState(initialValue)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(agents)
	
	const handleResetForm = () => {
		setFilter(initialValue)
		setData(agents)
	}
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleSubmit = (event) => {
		event && event.preventDefault();
		setLoading(true)
		
		const formData = new FormData();
		formData.append('id', filter.agent.id)
		formData.append('date-from', filter['date-from'])
		formData.append('date-to', filter['date-to'])
		
		postData(`dailySums/`, formData).then((json) => {
			if (json.status === 'OK') {
				setData([json.data])
				setLoading(false)
			}
		})
	}
	
	const config = [
		{
			key: 'username',
			text: 'username'
		},
	]
	
	const config_2 = [
		{
			key: 'date-from',
			text: 'date_from'
		},
		{
			key: 'currency',
			text: 'currency'
		},
		{
			key: 'tickets',
			text: 'tickets'
		},
		{
			key: 'total_in',
			text: 'total_in'
		},
		{
			key: 'total_out',
			text: 'total_out'
		},
		{
			key: 'open_payouts',
			text: 'open_payouts'
		},
		{
			key: 'Jackpot_1_payout',
			text: 'jackpot_1_payout'
		},
		{
			key: 'Jackpot_2_payout',
			text: 'jackpot_2_payout'
		},
		{
			key: 'Jackpot_3_payout',
			text: 'jackpot_3_payout'
		},
		{
			key: 'Jackpot_1_contribution',
			text: 'jackpot_1_contribution',
		},
		{
			key: 'Jackpot_2_contribution',
			text: 'jackpot_2_contribution',
		},
		{
			key: 'Jackpot_3_contribution',
			text: 'jackpot_3_contribution',
		},
		{
			key: 'reversal',
			text: 'reversal'
		},
		{
			key: 'commission',
			text: 'commission'
		},
		{
			key: 'taxes',
			text: 'taxes'
		},
		{
			key: 'profit',
			text: 'profit'
		}
	]

    return (
        <>
			{
				loading
					?
						<Loader />
					:
						<>
							<Paper headline={t('daily_overview_report')}>
								{/*<pre>{JSON.stringify(filter, null, 2)}</pre>*/}
								{/*<br />*/}
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
												placeholder={t('timeframe')}
												options={convertOptions(timeframe.TIMEFRAME)}
												data={filter.timeframe}
												onChange={(value) => {
													handlePropsChange('timeframe', value)
													handlePropsChange('date-from', getTimeframeFrom(value, 'datetime-local'))
													handlePropsChange('date-to', getTimeframeTo(value, 'datetime-local'))
												}}
											/>
										</div>
										<div>
											<Field
												type={'datetime-local'}
												placeholder={t('date_from')}
												data={filter["date-from"]}
												onChange={(value) => handlePropsChange('date-from', value)}
											/>
										</div>
										<div>
											<Field
												type={'datetime-local'}
												placeholder={t('date_to')}
												data={filter["date-to"]}
												onChange={(value) => handlePropsChange('date-to', value)}
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
								<Report
									config={config}
									config_2={config_2}
									data={data}
									filter={filter}
									handlePropsChange={handlePropsChange}
								/>
							</Paper>
						</>
			}
        </>
    );
}

export default DailyReports;
