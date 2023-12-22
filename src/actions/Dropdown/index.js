import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Action = ({action, active}) => {
	
	return (
		<button
			className={
				classNames(
					style.block,
					active && style.active
				)
			}
			onClick={action}
			title={'Dropdown'}
		>
			<FontAwesomeIcon
				icon="fa-solid fa-plus"
				className={style.icon}
			/>
		</button>
	);
}

export default Action;
