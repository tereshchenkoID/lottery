import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Print = ({action}) => {
	const { t } = useTranslation()
	
	return (
		<button
			className={style.block}
			onClick={action}
			title={t('print')}
		>
			<FontAwesomeIcon
				icon="fa-solid fa-print"
				className={style.icon}
			/>
		</button>
	);
}

export default Print;
