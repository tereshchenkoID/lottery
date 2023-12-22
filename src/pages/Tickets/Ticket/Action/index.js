import {useState, useEffect} from "react";

import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const getOptions = (data) => {
	switch (data) {
		case 'dropdown':
			return {
				icon: 'fa-solid fa-plus',
				alt: 'Dropdown'
			}
		case 'cancel':
			return {
				icon: 'fa-solid fa-times',
				alt: 'Cancel'
			}
		case 'print':
			return {
				icon: 'fa-solid fa-print',
				alt: 'Print'
			}
		case 'calculate':
			return {
				icon: 'fa-solid fa-calculator',
				alt: 'Print'
			}
		default:
			return {
				icon: 'fa-solid fa-plus',
				alt: 'Dropdown'
			}
	}
}

const Action = ({data}) => {
	const option = getOptions(data)
	
	return (
		<button
			className={
				classNames(
					style.block,
					style[data]
				)
			}
			title={option.alt}
		>
			<FontAwesomeIcon
				icon={option.icon}
				className={style.icon}
			/>
		</button>
	);
}

export default Action;
