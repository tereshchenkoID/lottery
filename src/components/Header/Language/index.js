import {useState} from "react";
import i18n from 'i18next'

import classNames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.module.scss';

const Language = () => {
	const [active, setActive] = useState(false)
	const language = [
		{
			code: 'en',
			text: 'en',
		},
		{
			code: 'ukr',
			text: 'ua'
		}
	]
	
	const handleSearch = (data) => {
		return language.find((lang) => lang.code === data);
	};
	
    return (
        <div
			className={
				classNames(
					style.block,
					active && style.active
				)
			}
			onClick={() => {
				setActive(!active)
			}}
		>
			<div className={style.selected}>
				<span>{handleSearch(i18n.language).text}</span>
				<FontAwesomeIcon
					icon="fa-solid fa-angle-down"
					className={style.arrow}
				/>
			</div>
			<div className={style.dropdown}>
				{
					language.map((el, idx) =>
						i18n.language !== el.code &&
						<button
							key={idx}
							aria-label={el.text}
							className={style.link}
							onClick={() => {
								i18n.changeLanguage(el.code)
							}}
						>
							{el.text}
						</button>
					)
				}
			</div>
        </div>
    );
}

export default Language;
