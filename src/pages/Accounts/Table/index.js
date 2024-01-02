import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {locked} from "constant/config";

import classNames from "classnames";

import {postData} from "helpers/api";

import Loader from "components/Loader";
import Dropdown from "actions/Dropdown";
import ReadMore from "./ReadMore";

import style from './index.module.scss';

const Option = ({
	t,
	data,
	filter,
	config,
	config_2,
	loading,
	setLoading,
	handlePropsChange,
}) => {
	const [table, setTable] = useState(null)
	const [shops, setShops] = useState(null)
	
	const [activeAccounts, setActiveAccounts] = useState(false)
	const [activeShops, setActiveShops] = useState(false)
	
	const handleSubmitAccount = (el) => {
		if (table) {
			setActiveAccounts(!activeAccounts)
		}
		else {
			setLoading(true)
			
			const formData = new FormData();
			formData.append('id', el.id)
			formData.append('locked', filter.locked)
			formData.append('currency', filter.currency)
			
			postData(`accounts/?id=${el.id}`, formData).then((json) => {
				if (json.status === 'OK') {
					setTable(json.data)
					setActiveAccounts(!activeAccounts)
					setLoading(false)
				}
			})
		}
	}
	
	const handleSubmitShops = (el) => {
		if (shops) {
			setActiveShops(!activeShops)
		}
		else {
			setLoading(true)
			
			const formData = new FormData();
			formData.append('id', el.id)
			formData.append('locked', filter.locked)
			formData.append('currency', filter.currency)
			
			postData(`shops/?id=${el.id}`, formData).then((json) => {
				if (json.status === 'OK') {
					setShops(json.data)
					setActiveShops(!activeShops)
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
						activeAccounts && style.active
					)
				}
			>
				<div className={style.cell}>
					{
						(data.shops !== '0' || data.subclients !== '0') &&
						<Dropdown
							data={activeAccounts}
							action={() => handleSubmitAccount(data)}
						/>
					}
				</div>
				{
					config.map((key, value_idx) =>
						<div
							key={value_idx}
							className={style.cell}
						>
							{
								(key.key !== 'commission' && key.key !== 'credits')
									?
										key.key === 'locked'
											?
												locked.LOCKED[data[key.key]]
											:
												data[key.key]
									:
										<div>
											{
												data[key.key] &&
												<ReadMore data={data[key.key]} />
											}
										</div>
							}
						</div>
					)
				}
				<div className={style.cell}>1</div>
			</div>
			{
				activeAccounts &&
				<div className={style.wrapper}>
					<div className={style.overflow}>
						{
							data.shops !== '0' &&
							<>
								<div
									className={
										classNames(
											style.row,
											activeShops && style.active
										)
									}
								>
									<div className={style.cell}>
										<Dropdown
											data={activeShops}
											action={() => handleSubmitShops(data)}
										/>
									</div>
									{
										config_2.map((key, value) =>
											<div
												key={value}
												className={style.cell}
											>
												{t('shops')} ({data[key.key]})
											</div>
										)
									}
								</div>
								{
									activeShops &&
									<div className={style.wrapper}>
										<div className={style.overflow}>
											{
												shops.map((el, idx) =>
													<div
														key={idx}
														className={style.row}
													>
														<div className={style.cell} />
														{
															config.map((key, value_idx) =>
																<div
																	key={value_idx}
																	className={style.cell}
																>
																	{
																		(key.key !== 'commission' && key.key !== 'credits')
																			?
																				key.key === 'locked'
																					?
																						locked.LOCKED[el[key.key]]
																					:
																						el[key.key]
																			:
																				<div>
																					<ReadMore data={el[key.key]} />
																				</div>
																	}
																</div>
															)
														}
														<div className={style.cell}>1</div>
													</div>
												)
											}
										</div>
									</div>
								}
							</>
						}
						<Tree
							t={t}
							data={table}
							filter={filter}
							config={config}
							config_2={config_2}
							loading={loading}
							setLoading={setLoading}
							handlePropsChange={handlePropsChange}
						/>
					</div>
				</div>
			}
		</>
	)
}

const Tree = ({
	t,
	data,
	filter,
	config,
	config_2,
	loading,
	setLoading,
	handlePropsChange
}) => {
	
	return (
		data.length > 0
			?
				data.map((el, idx) =>
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
			:
				<div className={style.empty}>{t('no_matching_records_found')}</div>
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
			<div className={style.table}>
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
					<div className={style.cell}>1</div>
				</div>
				<Tree
					t={t}
					data={data}
					filter={filter}
					config={config}
					config_2={config_2}
					loading={loading}
					setLoading={setLoading}
					handlePropsChange={handlePropsChange}
				/>
			</div>
        </div>
    );
}

export default Table;
