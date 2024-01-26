import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {types, service} from "constant/config";

import Field from "components/Field";
import Button from "components/Button";
import Select from "components/Select";
import Textarea from "components/Textarea";
import Checkbox from "components/Checkbox";
import Debug from "modules/Debug";

import style from './index.module.scss';

const General = ({data, inherit, setInherit}) => {
	const { t } = useTranslation()
	const {settings} = useSelector((state) => state.settings)
	const [filter, setFilter] = useState(data.general)
	const isDisabled = inherit === '1'

	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}

	const handleResetForm = () => {
		setFilter(data.general)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('id', data.id)
		formData.append('username', data.username)
		formData.append('inherit', inherit)

		Object.entries(filter).map(([key, value]) => {
			formData.append(key, value)
			return true
		})
	}

	return (
		<>
      <Debug data={filter} />
			<form
				className={style.block}
				onSubmit={handleSubmit}
			>
        <Checkbox
          data={inherit}
          onChange={(value) => {
            setInherit(value)
            setFilter(data.general)
          }}
          placeholder={t('inherit')}
        />
				<Field
					type={'text'}
					placeholder={t('username')}
					data={data.username}
					onChange={(value) => handlePropsChange('username', value)}
					classes={['disabled']}
				/>
				<Field
					type={'text'}
					placeholder={t('full_name')}
					data={filter.full_name}
					onChange={(value) => handlePropsChange('full_name', value)}
					classes={[isDisabled && 'disabled']}
				/>
				<Field
					type={'email'}
					placeholder={t('email')}
					data={filter.email}
					onChange={(value) => handlePropsChange('email', value)}
					classes={[isDisabled && 'disabled']}
				/>
				<Textarea
					placeholder={t('description')}
					data={filter.description}
					onChange={(value) => handlePropsChange('description', value)}
					classes={[
						'lg',
						isDisabled && 'disabled'
					]}
				/>
				<Select
					placeholder={t('country')}
					options={
						Object.entries(service.COUNTRIES).map(([key, value]) => ({
							value: key,
							label: value
						}))
					}
					data={filter.country}
					onChange={(value) => handlePropsChange('country', value)}
					classes={[isDisabled && 'disabled']}
				/>
				<Select
					placeholder={t('currency')}
					options={
						settings.currencies.map(item => ({
							value: item,
							label: item
						}))
					}
					data={filter.currency}
					onChange={(value) => handlePropsChange('currency', value)}
					classes={[isDisabled && 'disabled']}
				/>
				{
					data.type === types.TYPE[0] &&
					<>
						<Select
							placeholder={t('children_creation_allowed')}
							options={
								Object.entries(service.YES_NO).map(([key, value]) => ({
									value: key,
									label: value
								}))
							}
							data={filter.children_creation_allowed}
							onChange={(value) => handlePropsChange('children_creation_allowed', value)}
							classes={[isDisabled && 'disabled']}
						/>
						<Select
							placeholder={t('web_players_allowed')}
							options={
								Object.entries(service.YES_NO).map(([key, value]) => ({
									value: key,
									label: value
								}))
							}
							data={filter.web_players_allowed}
							onChange={(value) => handlePropsChange('web_players_allowed', value)}
							classes={[isDisabled && 'disabled']}
						/>
						<Field
							type={'text'}
							placeholder={t('web_player_url')}
							data={filter.web_player_url}
							onChange={(value) => handlePropsChange('web_player_url', value)}
							classes={[isDisabled && 'disabled']}
						/>
					</>
				}
				{
					!isDisabled &&
					<div className={style.actions}>
						<Button
							type={'submit'}
							classes={'primary'}
							placeholder={t("save")}
						/>
						<Button
							type={'reset'}
							placeholder={t("cancel")}
							onChange={handleResetForm}
						/>
					</div>
				}
			</form>
		</>
	);
}

export default General;
