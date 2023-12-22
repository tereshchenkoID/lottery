import {useState} from "react";

import Dropdown from "actions/Dropdown";
import Action from "./Action";

import {getData} from "helpers/api";
import {convertFixed} from "helpers/convertFixed";

import classNames from "classnames";

import style from './index.module.scss';

const Ticket = ({
	data,
	config,
	config_2,
	config_3
}) => {
	const [table, setTable] = useState({})
	const [active, setActive] = useState(false)
	
	const handleDetails = () => {
		if (active) {
			setActive(false)
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
						active={active}
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
					<Action data={'cancel'} />
					<Action data={'print'} />
					<Action data={'calculate'} />
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
