import React from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import style from './index.module.scss';

const Table = ({
	data,
	filter,
	config_1,
	config_2,
}) => {
	const {t} = useTranslation()
	
	return (
		<div className={style.block}>
			<div
				className={
					classNames(
						style.row,
						style.headline
					)
				}
			>
				<div className={style.cell}/>
				{
					config_1.map((el, idx) =>
						<div
							key={idx}
							className={style.cell}
						>
							{t(el.text)}
						</div>
					)
				}
			</div>
		</div>
	);
}

export default Table;
