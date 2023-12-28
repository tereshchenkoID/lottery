import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Calculate = ({active, data, action, setCalculate}) => {
	
	return (
		<button
			className={
				classNames(
					style.block,
					!active && style.disabled
				)
			}
			onClick={data ? action : setCalculate}
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
