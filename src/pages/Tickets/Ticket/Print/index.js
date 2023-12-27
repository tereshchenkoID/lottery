import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Print = ({action}) => {
	
	return (
		<button
			className={style.block}
			onClick={action}
			title={'Print'}
		>
			<FontAwesomeIcon
				icon="fa-solid fa-print"
				className={style.icon}
			/>
		</button>
	);
}

export default Print;
