import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Action = ({calculate, data, action}) => {
	
	return (
		<button
			className={
				classNames(
					style.block,
					data && style.active,
					calculate && style.disabled,
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
