import {useState} from "react";
import {useDispatch} from "react-redux";

import classNames from "classnames";

import {setAside} from "store/actions/asideAction";

import {convertFixed} from "helpers/convertFixed";
import {getData} from "helpers/api";

import Calculate from "actions/Calculate";
import Dropdown from "actions/Dropdown";
import Print from "actions/Print";
import Cancel from "actions/Cancel";

import style from './index.module.scss';

const Ticket = ({
	data,
	config,
	config_2,
	config_3
}) => {
	const dispatch = useDispatch()
	
	const [table, setTable] = useState(null)
	const [active, setActive] = useState(false)
	const [cancel, setCancel] = useState(false)
	const [calculate, setCalculate] = useState(false)
	
	const handleDetails = () => {
		if (active) {
			setActive(false)
		}
		else {
			if (table) {
				setActive(true)
			}
			else {
				getData(`tickets/details/?id=${data.ticketId}`).then((json) => {
					if (json.status === 'OK') {
						setTable(json)
						setActive(true)
					}
				})
			}
		}
	}
	
	const handlePrint = (e) => {
		if (table) {
			dispatch(setAside({
				meta: {
					title: 'Ticket print',
					cmd: 'ticket-print',
					buttonRef: e.target,
				},
				shop: data.username,
				...table.data[0]
			}))
		}
		else {
			getData(`tickets/details/?id=${data.ticketId}`).then((json) => {
				if (json.status === 'OK') {
					setTable(json)

					dispatch(setAside({
						meta: {
							title: 'Ticket print',
							cmd: 'ticket-print',
							buttonRef: e.target,
						},
						shop: data.username,
						...json.data[0]
					}))
				}
			})
		}
	}
	
	return (
		<div className={style.block}>
			<div
				className={
					classNames(
						style.row,
						active && style.active
					)
				}
			>
				<div className={style.cell}>
					<Dropdown
						calculate={calculate}
						data={active}
						action={() => {
							handleDetails()
						}}
					/>
				</div>
				{
					config.map((el, idx) =>
						<div
							key={idx}
							className={style.cell}
						>
							{data[el.key]}
						</div>
					)
				}
				<div className={style.cell}>
					<Cancel
						action={() => {
							setCancel(!cancel)
						}}
					/>
					<Print
						action={(e) => {
							handlePrint(e)
						}}
					/>
					<Calculate
						active={active}
						data={calculate}
						action={() => {
							setCalculate(!calculate)
						}}
					/>
				</div>
			</div>
			{
				active &&
				<div className={style.dropdown}>
					{
						table.data[0].group.length > 0 &&
						<div
							className={
								classNames(
									style.table,
									style.sm
								)
							}
						>
							<div
								className={
									classNames(
										style.row,
										style.headline
									)
								}
							>
								{
									config_2.map((el, idx) =>
										<div
											key={idx}
											className={style.cell}
										>
											{el.text}
										</div>
									)
								}
							</div>
							{
								table.data[0].group.map((el, idx) =>
									<div
										key={idx}
										className={style.row}
									>
										<div className={style.cell}>{el.group}</div>
										<div className={style.cell}>{el.combi}</div>
										<div className={style.cell}>{convertFixed(el.amount)}</div>
										<div className={style.cell}>{convertFixed(el.minwin)}</div>
										<div className={style.cell}>{convertFixed(el.maxwin)}</div>
										<div className={style.cell}>{el.bonus}</div>
									</div>
								)
							}
					</div>
					}
					<div
						className={
							classNames(
								style.table,
								style.lg
							)
						}
					>
						<div
							className={
								classNames(
									style.row,
									style.headline
								)
							}
						>
							{
								config_3.map((el, idx) =>
									<div
										key={idx}
										className={style.cell}
									>
										{el.text}
									</div>
								)
							}
						</div>
						{
							table.data[0].bets.map((el, idx) =>
								<div
									key={idx}
									className={style.row}
								>
									<div className={style.cell}>{el.details.game}</div>
									<div className={style.cell}>{el.details.eventId}</div>
									<div className={style.cell}>{el.market}</div>
									<div className={style.cell}>{el.selection}</div>
									<div className={style.cell}>{el.odds}</div>
									<div className={style.cell}>
										{
											el.details.results.join(' - ')
										}
									</div>
									<div className={style.cell}>{el.status}</div>
								</div>
							)
						}
					</div>
				</div>
			}
		</div>
	);
}

export default Ticket;
