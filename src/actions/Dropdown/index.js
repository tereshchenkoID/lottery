import {useTranslation} from "react-i18next";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import classNames from "classnames";

import style from './index.module.scss';

const Dropdown = ({calculate, data, action}) => {
	const { t } = useTranslation()
	
	return (
		<button
			className={
				classNames(
					style.block,
					data && style.active,
					calculate && style.disabled,
				)
			}
			type={'button'}
			onClick={action}
			title={t('dropdown')}
		>
			<FontAwesomeIcon
				icon="fa-solid fa-plus"
				className={style.icon}
			/>
		</button>
	);
}

export default Dropdown;
