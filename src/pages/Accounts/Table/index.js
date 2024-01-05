import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {locked, service} from "constant/config";

import classNames from "classnames";

import {setAside} from "store/actions/asideAction";
import {getData} from "helpers/api";

import Loader from "components/Loader";
import Icon from "components/Icon";
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
	const dispatch = useDispatch()
	const [table, setTable] = useState(null)
	const [shops, setShops] = useState(null)
	
	const [activeAccounts, setActiveAccounts] = useState(false)
	const [activeShops, setActiveShops] = useState(false)
	
	const handleChangePassword = (e, value) => {
		dispatch(setAside({
			meta: {
				title: t('change_password'),
				cmd: 'account-change-password',
				buttonRef: e.target,
			},
			...value || data,
		}))
	}
	
	const handleTransferAgent = (e, value) => {
		dispatch(setAside({
			meta: {
				title: t('transfer_agent'),
				cmd: 'account-transfer-agent',
				buttonRef: e.target,
			},
			...value || data,
		}))
	}
	
	const handleNewAgent = (e, type) => {
		dispatch(setAside({
			meta: {
				title: `${t('new')} ${t(type)}`,
				cmd: 'account-new-agent',
				buttonRef: e.target,
			},
			type: type,
			...data,
		}))
	}
	
	const handleSubmitAccount = (el) => {
		if (table) {
			setActiveAccounts(!activeAccounts)
		}
		else {
			setLoading(true)
			getData(`accounts/?id=${el.id}&currency=${filter.currency}&locked=${filter.locked}`, null).then((json) => {
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
			getData(`shops/?id=${el.id}&currency=${filter.currency}&locked=${filter.locked}`, null).then((json) => {
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
					<Dropdown
						data={activeAccounts}
						action={() => handleSubmitAccount(data)}
					/>
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
				<div className={style.cell}>
					<Icon
						icon={'fa-add'}
						action={(e) => handleNewAgent(e, service.TYPE.AGENT)}
					/>
					<Icon icon={'fa-pencil'}/>
					<Icon
						icon={'fa-lock'}
						action={(e) => handleChangePassword(e)}
					/>
					<Icon
						icon={'fa-exchange-alt'}
						action={(e) => handleTransferAgent(e)}
					/>
				</div>
			</div>
			{
				activeAccounts &&
				<div className={style.wrapper}>
					<div className={style.overflow}>
						<div
							className={
								classNames(
									style.row,
									style.sm,
									activeShops && style.active
								)
							}
						>
							<div className={style.cell}>
								{
									data.shops !== '0' &&
									<Dropdown
										data={activeShops}
										action={() => handleSubmitShops(data)}
									/>
								}
							</div>
							{
								config_2.map((key, value) =>
									<div
										key={value}
										className={style.cell}
									>
										<FontAwesomeIcon
											icon="fa-solid fa-shop"
											className={style.icon}
										/>
										{t('shops')} ({data[key.key]})
									</div>
								)
							}
							<div className={style.cell}>
								<Icon
									icon={'fa-add'}
									action={(e) => handleNewAgent(e, service.TYPE.SHOP)}
								/>
							</div>
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
																	<ReadMore data={el[key.key]} />
															}
														</div>
													)
												}
												<div className={style.cell}>
													<Icon icon={'fa-pencil'}/>
													<Icon
														icon={'fa-lock'}
														action={(e) => handleChangePassword(e, el)}
													/>
													<Icon
														icon={'fa-exchange-alt'}
														action={(e) => handleTransferAgent(e, el)}
													/>
												</div>
											</div>
										)
									}
								</div>
							</div>
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
					<div className={style.cell} />
				</div>
				{
					data.length > 0
					?
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
					:
						<div className={style.empty}>{t('no_matching_records_found')}</div>
				}
			</div>
        </div>
    );
}

export default Table;
