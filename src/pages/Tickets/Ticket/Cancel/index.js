import {useTranslation} from "react-i18next";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import classNames from "classnames";

import Button from "components/Button";

import style from './index.module.scss';

const Cancel = ({data, action, setCancel}) => {
	const { t } = useTranslation()
	
	return (
		<>
			<button
				className={style.block}
				onClick={setCancel}
				title={t('cancel')}
			>
				<FontAwesomeIcon
					icon="fa-solid fa-times"
					className={style.icon}
				/>
			</button>
			
			<div
				className={
					classNames(
						style.modal,
						data && style.active
					)
				}
			>
				<div className={style.wrapper}>
					<div className={style.body}>
						<p>{t('confirm_cancel_stake')}</p>
					</div>
					<div className={style.actions}>
						<Button
							type={'button'}
							classes={'primary'}
							placeholder={t('yes')}
							onChange={action}
						/>
						<Button
							type={'button'}
							placeholder={t('no')}
							onChange={setCancel}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cancel;
