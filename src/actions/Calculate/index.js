import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Calculate = ({active, data, action}) => {
	
	return (
		<button
			className={
				classNames(
					style.block,
					!active && style.disabled
				)
			}
			onClick={action}
			title={'Calculate'}
		>
			{
				data
					?
						<FontAwesomeIcon
							icon="fa-solid fa-floppy-disk"
							className={style.icon}
						/>
					:
						<FontAwesomeIcon
							icon="fa-solid fa-calculator"
							className={style.icon}
						/>
			}
		</button>
	);
}

export default Calculate;
