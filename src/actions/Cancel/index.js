import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Cancel = ({action}) => {
	
	return (
		<button
			className={style.block}
			onClick={action}
			title={'Cancel'}
		>
			<FontAwesomeIcon
				icon="fa-solid fa-times"
				className={style.icon}
			/>
		</button>
	);
}

export default Cancel;
