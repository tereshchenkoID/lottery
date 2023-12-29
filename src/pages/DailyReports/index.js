import {useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {statuses, types} from "constant/config";

import Paper from "components/Paper";
import Field from "components/Field";
import Select from "components/Select";
import Button from "components/Button";
import Loader from "components/Loader";

import {getDate} from "helpers/getDate";
import {postData} from "helpers/api";
import {convertOptions} from "helpers/convertOptions";

import style from './index.module.scss';

const DailyReports = () => {
	const initialValue = {
		'id': '',
		'date-from': getDate(new Date().setHours(0, 0, 0, 0), 'datetime-local'),
		'date-to': getDate(new Date(), 'datetime-local'),
		'timeframe': ''
	}
	const { t } = useTranslation()
	
	const {settings} = useSelector((state) => state.settings)
	const [filter, setFilter] = useState(initialValue)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(null)
	
	const handleResetForm = () => {
		setFilter(initialValue)
	}
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handleSubmit = (event, page) => {
		event && event.preventDefault();
		setLoading(true)
		
		const formData = new FormData();
		
		Object.entries(filter).map(([key, value]) => {
			formData.append(key, value)
			return true
		})
		
		postData(`tickets/`, formData).then((json) => {
			if (json.status === 'OK') {
				setData(json)
				setLoading(false)
			}
		})
	}
	
	setTimeout(() => {
		setLoading(false)
	}, [])
	
	const config = [
		{
			key: 'username',
			text: 'username'
		},
	]
	
	let config_2 = [
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
        <div className={style.block}>
			{
				loading
					?
						<Loader />
					:
						<>
							<Paper
								headline={t('daily_overview_report')}
							>
								{/*<pre>{JSON.stringify(filter, null, 2)}</pre>*/}
								{/*<br />*/}
								<form onSubmit={handleSubmit}>
									<div className={style.grid}>
										<div>
											<Select
												placeholder={t('agent')}
												options={convertOptions(statuses.TICKET_STATUSES)}
												data={filter.timeframe}
											/>
										</div>
										<div>
											<Select
												placeholder={t('timeframe')}
												options={convertOptions(types.PLAYER_TYPE)}
												data={filter.type}
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
								<div className={style.table}>
									<div className={style.row}>
										<div className={style.cell} />
										{
											config.map((el, idx) =>
												<div
													key={idx}
													className={style.cell}
												>
													{t(el.text)}
												</div>
											)
										}
									</div>
								</div>
							</Paper>
						</>
			}
        </div>
    );
}

export default DailyReports;
