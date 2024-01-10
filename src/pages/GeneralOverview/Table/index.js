import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {postData} from "helpers/api";
import {getDate} from "helpers/getDate";
import {convertFixed} from "helpers/convertFixed";

import Loader from "components/Loader";
import Dropdown from "actions/Dropdown";

import style from './index.module.scss';

const Option = ({
	t,
	data,
	filter,
	handlePropsChange,
	config,
	config_2,
	loading,
	setLoading,
}) => {
	const isValidate = data.days && data.days.length > 0
	const [table, setTable] = useState(isValidate ? data : null)
	const [active, setActive] = useState(isValidate)
	
	const handleSubmit = (el) => {
		if (table) {
			setActive(!active)
		}
		else {
			setLoading(true)
			
			const formData = new FormData();
			formData.append('id', el.id)
			formData.append('date-from', filter['date-from'])
			formData.append('date-to', filter['date-to'])
			
			postData(`financialOverview/`, formData).then((json) => {
				if (json.status === 'OK') {
					setTable(json.data)
					setActive(!active)
					setLoading(false)
				}
			})
		}
	}
	
	return (
		<>
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
						data={active}
						action={() => handleSubmit(data)}
					/>
				</div>
				<div className={style.cell}>{data.username || filter.agent.username}</div>
			</div>
			{
				active &&
				<div className={style.wrapper}>
					<div className={style.overflow}>
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
										style.headline,
										style.wide
									)
								}
							>
								{
									config_2.map((el, idx) =>
										<div
											key={idx}
											className={style.cell}
										>
											{t(el.text)}
										</div>
									)
								}
							</div>
							{
								table.days?.map((day, days_idx) =>
									<div
										key={days_idx}
										className={style.day}
									>
										{
											day.report.length > 0
												?
													day.report.map((report, report_idx) =>
														<div
															key={report_idx}
															className={style.row}
														>
															{
																config_2.map((key, value_idx) =>
																	<div
																		key={value_idx}
																		className={style.cell}
																	>
																		{
																			key.key === 'date-from'
																				?
																					report_idx === 0
																						?
																							<>
																								<div>{getDate(filter['date-from'])}</div>
																								<div>{getDate(filter['date-to'])}</div>
																							</>
																						:
																							''
																				:
																					(key.key !== 'date-from' && key.key !== 'currency')
																						?
																							convertFixed(report[key.key])
																						:
																							report[key.key]
																		}
																	</div>
																)
															}
														</div>
													)
												:
													<div
														className={
															classNames(
																style.row,
																style.empty
															)
														}
													>
														<div className={style.cell}>
															<div>
																<div>{getDate(filter['date-from'])}</div>
																<div>{getDate(filter['date-to'])}</div>
															</div>
														</div>
														<div className={style.cell}>{t('no_matching_records_found')}</div>
													</div>
										}
									</div>
								)
							}
						</div>
					</div>
					{
						data.clients &&
						<Tree
							t={t}
							state={data.clients}
							filter={filter}
							handlePropsChange={handlePropsChange}
							config={config}
							config_2={config_2}
							loading={loading}
							setLoading={setLoading}
						/>
					}
				</div>
			}
		</>
	)
}

const Tree = ({
	t,
	state,
	filter,
	handlePropsChange,
	config,
	config_2,
	loading,
	setLoading,
}) => {
	
	return (
		<div
			className={
				classNames(
					style.table,
					style.sm
				)
			}
		>
			{
				state &&
				state.length > 0 &&
				<div
					className={
						classNames(
							style.row,
							style.headline
						)
					}
				>
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
			}
			{
				state.map((el, idx) =>
					<Option
						key={idx}
						t={t}
						data={el}
						config={config}
						config_2={config_2}
						filter={filter}
						handlePropsChange={handlePropsChange}
						loading={loading}
						setLoading={setLoading}
					/>
				)
			}
		</div>
	)
}

const Table = ({
	data,
	filter,
	config,
	config_2,
	handlePropsChange,
}) => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	
	return (
        <div className={style.block}>
			{
				loading && <Loader />
			}
			
			<Tree
				t={t}
				state={data}
				config={config}
				config_2={config_2}
				filter={filter}
				handlePropsChange={handlePropsChange}
				loading={loading}
				setLoading={setLoading}
			/>
        </div>
    );
}

export default Table;
