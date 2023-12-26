import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

import Pagination from "modules/Pagination";

import Paper from "components/Paper";
import Field from "components/Field";
import Select from "components/Select";
import Button from "components/Button";
import Loader from "components/Loader";

import Ticket from "./Ticket";

import {getDate} from "helpers/getDate";
import {postData} from "helpers/api";

import style from './index.module.scss';

const Tickets = () => {
	const initialValue = {
		'ticket': '',
		'username': '',
		'state': '',
		'type': '',
		'date-from': getDate(new Date().setHours(0, 0, 0, 0), 'datetime-local'),
		'date-to': getDate(new Date(), 'datetime-local'),
		'amount-from': '',
		'amount-to': '',
		'currency': '',
		'payout-from': '',
		'payout-to': '',
	}
	
	const {settings} = useSelector((state) => state.settings)
	const [filter, setFilter] = useState(initialValue)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState({})
	const [pagination, setPagination] = useState({
		page: 0,
		quantity: 50,
		results: 0,
		pages: 0
	})
	
	const handleResetForm = () => {
		setFilter(initialValue)
	}
	
	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}
	
	const handlePagination = (fieldName, fieldValue) => {
		setPagination((prevPagination) => ({
			...prevPagination,
			[fieldName]: fieldValue
		}))
	}
	
	const handleSubmit = (event, page) => {
		event && event.preventDefault();
		setLoading(true)
		
		const formData = new FormData();
		formData.append('page', page)
		formData.append('quantity', pagination.quantity)
		
		Object.entries(filter).map(([key, value]) => {
			formData.append(key, value)
			return true
		})
		
		postData(`tickets/`, formData).then((json) => {
			if (json.status === 'OK') {
				setData(json)
				setLoading(false)
				
				setPagination(prev => ({
					...prev,
					results: json.results,
					pages: Math.floor(json.results / pagination.quantity)
				}))
			}
		})
	}
	
	const nextHandleSubmit = () => {
		const next = pagination.page < pagination.pages ? pagination.page + 1 : pagination.pages
		handlePagination('page', next)
		handleSubmit(null, next)
	}
	
	const prevHandleSubmit = () => {
		const prev = pagination.page > 0 ? pagination.page - 1 : 0
		handlePagination('page', prev)
		handleSubmit(null, prev)
	}
	
	const startHandlerSubmit = () => {
		handlePagination('page', 0)
		handleSubmit(null, 0)
	}
	
	const endHandlerSubmit = () => {
		handlePagination('page', pagination.pages)
		handleSubmit(null, pagination.pages)
	}
	
	useEffect(() => {
		handleSubmit(null, pagination.page)
	}, []);
	
	const config = [
		{
			key: 'ticketId',
			text: 'Ticket ID'
		},
		{
			key: 'username',
			text: 'Shop'
		},
		{
			key: 'game',
			text: 'Game Details'
		},
		{
			key: 'status',
			text: 'Status'
		},
		{
			key: 'currency',
			text: 'Currency'
		},
		{
			key: 'payout',
			text: 'Payout'
		},
		{
			key: 'stake',
			text: 'Sum of Stakes'
		},
		{
			key: 'bookTime',
			text: 'Finalized'
		}
	]
	
	const config_2 = [
		{
			key: 'group',
			text: 'GR'
		},
		{
			key: 'combi',
			text: 'Combi'
		},
		{
			key: 'amount',
			text: 'Stake'
		},
		{
			key: 'minwin',
			text: 'Pot. Min win',
		},
		{
			key: 'maxwin',
			text: 'Pot. MAX win',
		},
		{
			key: 'bonus',
			text: 'Bonus'
		}
	]
	
	const config_3 = [
		{
			key: 'details.game',
			text: 'Game'
		},
		{
			key: 'details.eventId',
			text: 'Event'
		},
		{
			key: 'market',
			text: 'Type'
		},
		{
			key: 'selection',
			text: 'Pick'
		},
		{
			key: 'odds',
			text: 'Odds'
		},
		{
			key: 'details.results',
			text: 'Results'
		},
		{
			key: 'status',
			text: 'State'
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
								headline={'Tickets search'}
								quantity={pagination.quantity}
								setQuantity={setPagination}
							>
								{/*<pre>{pagination.quantity}</pre>*/}
								{/*<pre>{JSON.stringify(filter, null, 2)}</pre>*/}
								{/*<br />*/}
								<form onSubmit={handleSubmit}>
									<div className={style.grid}>
										<div>
											<Field
												type={'text'}
												placeholder={'Ticket'}
												data={filter.ticket}
												onChange={(value) => handlePropsChange('ticket', value)}
											/>
										</div>
										<div>
											<Field
												type={'text'}
												placeholder={'Username'}
												data={filter.username}
												onChange={(value) => handlePropsChange('username', value)}
											/>
										</div>
										<div>
											<Select
												placeholder={'State'}
												options={[
													{ value: '0', label: 'Any' },
													{ value: '1', label: 'Confirmed' },
													{ value: '2', label: 'Finalized' },
													{ value: '3', label: 'Cancelled' },
													{ value: '4', label: 'Unconfirmed' },
												]}
												data={filter.state}
												onChange={(value) => handlePropsChange('state', value)}
											/>
										</div>
										<div>
											<Select
												placeholder={'Player Type'}
												options={[
													{ value: '0', label: 'Any' },
													{ value: '1', label: 'Shop' },
													{ value: '2', label: 'Web' },
												]}
												data={filter.type}
												onChange={(value) => handlePropsChange('type', value)}
											/>
										</div>
										<div>
											<Field
												type={'datetime-local'}
												placeholder={'Date from'}
												data={filter["date-from"]}
												onChange={(value) => handlePropsChange('date-from', value)}
											/>
										</div>
										<div>
											<Field
												type={'datetime-local'}
												placeholder={'Date to'}
												data={filter["date-to"]}
												onChange={(value) => handlePropsChange('date-to', value)}
											/>
										</div>
										<div>
											<Field
												type={'number'}
												placeholder={'Amount from'}
												data={filter["amount-from"]}
												onChange={(value) => handlePropsChange('amount-from', value)}
											/>
										</div>
										<div>
											<Field
												type={'number'}
												placeholder={'Amount to'}
												data={filter["amount-to"]}
												onChange={(value) => handlePropsChange('amount-to', value)}
											/>
										</div>
										<div>
											<Select
												placeholder={'Currency'}
												options={
													settings.currencies.map(currency => ({
														value: currency,
														label: currency
													}))
												}
												data={filter["currency"]}
												onChange={(value) => handlePropsChange('currency', value)}
											/>
										</div>
										<div>
											<Field
												type={'number'}
												placeholder={'Payout from'}
												data={filter['payout-from']}
												onChange={(value) => handlePropsChange('payout-from', value)}
											/>
										</div>
										<div>
											<Field
												type={'number'}
												placeholder={'Payout to'}
												data={filter['payout-to']}
												onChange={(value) => handlePropsChange('payout-to', value)}
											/>
										</div>
									</div>
									<div className={style.actions}>
										<Button
											type={'submit'}
											classes={'primary'}
											placeholder={"Search"}
										/>
										<Button
											type={'reset'}
											placeholder={"Cancel"}
											onChange={handleResetForm}
										/>
									</div>
								</form>
							</Paper>
							<Paper>
								<Pagination
									position={'top'}
									pagination={pagination}
									nextHandler={nextHandleSubmit}
									prevHandler={prevHandleSubmit}
									startHandlerSubmit={startHandlerSubmit}
									endHandlerSubmit={endHandlerSubmit}
								/>
								<div className={style.table}>
									<div className={style.row}>
										<div className={style.cell} />
										{
											config.map((el, idx) =>
												<div
													key={idx}
													className={style.cell}
												>
													{el.text}
												</div>
											)
										}
										<div className={style.cell} />
									</div>
									{
										data.data &&
										data.data.length > 0
											?
												data.data.map((el, idx) =>
													<div
														className={style.ticket}
														key={idx}
													>
														<Ticket
															data={el}
															config={config}
															config_2={config_2}
															config_3={config_3}
														/>
													</div>
												)
											:
												<div className={style.ticket}>
													<div className={style.empty}>Sorry, no matching records found</div>
												</div>
									}
								</div>
								<Pagination
									position={'bottom'}
									pagination={pagination}
									nextHandler={nextHandleSubmit}
									prevHandler={prevHandleSubmit}
									startHandlerSubmit={startHandlerSubmit}
									endHandlerSubmit={endHandlerSubmit}
								/>
							</Paper>
						</>
			}
        </div>
    );
}

export default Tickets;
