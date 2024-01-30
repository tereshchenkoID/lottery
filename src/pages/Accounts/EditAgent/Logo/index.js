import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import File from "components/File";
import Label from "components/Label";
import Button from "components/Button";
import Debug from "modules/Debug";

import style from './index.module.scss';

const Logo = ({data, inherit, setUpdate}) => {
	const { t } = useTranslation()
	const [filter, setFilter] = useState(data.logo)
	const isDisabled = inherit === '1'

	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}

	const handleResetForm = () => {
		setFilter(data.logo)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<>
      <Debug data={filter} />
      <form
				className={style.block}
				onSubmit={handleSubmit}
			>
				<div>
					<Label placeholder={t('logo')}/>
					<File
						data={filter.main}
						onChange={(value) => handlePropsChange('main', value)}
						classes={[isDisabled && 'disabled']}
					/>
				</div>
				<div>
					<Label placeholder={t('print_logo')}/>
					<File
						data={filter.print}
						onChange={(value) => handlePropsChange('print', value)}
						classes={[isDisabled && 'disabled']}
					/>
				</div>
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
			</form>
		</>
	);
}

export default Logo;
